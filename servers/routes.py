from flask import jsonify, request, make_response
from werkzeug.security import generate_password_hash
from models.listing import Listing
from models.guest import Guest
from models.favorite import Favorite
from models.booking import Booking
from database import db
from datetime import datetime

# Utility function to return CORS headers for OPTIONS requests
def _build_cors_prelight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response

# Error response function
def error_response(message, status_code):
    return jsonify({"error": message}), status_code

def create_routes(app, db):

    @app.route('/signup', methods=['POST', 'OPTIONS'])
    def signup():
        if request.method == 'OPTIONS':
            return _build_cors_prelight_response()  # Handle CORS preflight

        data = request.json
        if not data or 'name' not in data or 'email' not in data or 'password' not in data:
            return error_response("Name, email, and password are required", 400)
        
        existing_guest = Guest.query.filter_by(email=data['email']).first()
        if existing_guest:
            return error_response("Email already registered", 400)
        
        guest = Guest(
            name=data['name'],
            email=data['email'],
            password=generate_password_hash(data['password'])
        )
        
        db.session.add(guest)
        db.session.commit()
        
        return jsonify({"id": guest.id, "name": guest.name, "email": guest.email}), 201

    def get_guest_by_email(email):
        if not email:
            return None, error_response("Email is required", 400)
        guest = Guest.query.filter_by(email=email).first()
        if guest:
            return guest, None
        else:
            return None, error_response("Guest not found", 404)

    @app.route('/listings', methods=['GET', 'OPTIONS'])
    def get_listings():
        if request.method == 'OPTIONS':
            return _build_cors_prelight_response()  # Handle CORS preflight

        listings = Listing.query.all()
        return jsonify([{
            "id": listing.id,
            "title": listing.title,
            "description": listing.description,
            "category": listing.category,
            "price_per_night": listing.price_per_night,
            "location": listing.location,
            "bedrooms": listing.bedrooms,
            "bathrooms": listing.bathrooms,
            "amenities": listing.amenities,
            "rating": listing.rating,
            "image_url": listing.image_url
        } for listing in listings]), 200

    @app.route('/favorites', methods=['POST', 'GET', 'OPTIONS'])
    def favorites():
        if request.method == 'OPTIONS':
            return _build_cors_prelight_response()  # Handle CORS preflight

        # Add Favorite (POST)
        if request.method == 'POST':
            data = request.json
            if not data or 'listing_id' not in data or 'email' not in data:
                return error_response("Listing ID and email are required", 400)

            guest, error_resp = get_guest_by_email(email=data['email'])
            if error_resp:
                return error_resp

            new_favorite = Favorite(guest_id=guest.id, listing_id=data['listing_id'])
            db.session.add(new_favorite)

            try:
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                return error_response(str(e), 500)

            return jsonify({"id": new_favorite.id, "guest_id": guest.id}), 201

        # Retrieve Favorites (GET)
        if request.method == 'GET':
            email = request.args.get('email')
            if not email:
                return error_response("Email is required", 400)
            
            guest, error_resp = get_guest_by_email(email=email)
            if error_resp:
                return error_resp
            
            favorites = Favorite.query.filter_by(guest_id=guest.id).all()
            favorite_listings = []
            
            for favorite in favorites:
                listing = Listing.query.get(favorite.listing_id)
                if listing:
                    favorite_listings.append({
                        "id": favorite.id,
                        "listing_title": listing.title,
                        "listing_description": listing.description,
                        "price_per_night": listing.price_per_night,
                        "location": listing.location,
                        "image_url": listing.image_url,
                        "category": listing.category
                    })
            
            return jsonify(favorite_listings), 200

    @app.route('/bookings', methods=['POST', 'GET', 'OPTIONS'])
    def bookings():
        if request.method == 'OPTIONS':
            return _build_cors_prelight_response()  # Handle CORS preflight

        # Create Booking (POST)
        if request.method == 'POST':
            data = request.json
            if not data or 'listing_id' not in data or 'start_date' not in data or 'end_date' not in data or 'email' not in data:
                return error_response("listing_id, start_date, end_date, and email are required", 400)

            guest, error_resp = get_guest_by_email(email=data['email'])
            if error_resp:
                return error_resp

            try:
                start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
                end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
            except ValueError:
                return error_response("Invalid date format. Use YYYY-MM-DD.", 400)

            if end_date <= start_date:
                return error_response("End date must be after start date", 400)

            listing = Listing.query.get(data['listing_id'])
            if not listing:
                return error_response("Listing not found", 404)

            nights = (end_date - start_date).days
            total_price = listing.price_per_night * nights

            new_booking = Booking(
                guest_id=guest.id,
                listing_id=data['listing_id'],
                start_date=start_date,
                end_date=end_date,
                total_price=total_price,
                status='confirmed'
            )

            db.session.add(new_booking)
            try:
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                return error_response(str(e), 500)

            return jsonify({
                "id": new_booking.id,
                "guest_id": guest.id,
                "listing_id": new_booking.listing_id,
                "start_date": new_booking.start_date.isoformat(),
                "end_date": new_booking.end_date.isoformat(),
                "total_price": new_booking.total_price,
                "status": new_booking.status
            }), 201

        # Retrieve Bookings (GET)
        if request.method == 'GET':
            email = request.args.get('email')
            if not email:
                return error_response("Email is required", 400)

            guest, error_resp = get_guest_by_email(email=email)
            if error_resp:
                return error_resp
            
            bookings = Booking.query.filter_by(guest_id=guest.id).all()
            booking_listings = []
            
            for booking in bookings:
                listing = Listing.query.get(booking.listing_id)
                if listing:
                    booking_listings.append({
                        "id": booking.id,
                        "listing_title": listing.title,
                        "listing_description": listing.description,
                        "image_url": listing.image_url,
                        "category": listing.category,
                        "start_date": booking.start_date.isoformat(),
                        "end_date": booking.end_date.isoformat(),
                        "total_price": booking.total_price,
                        "status": booking.status
                    })
            
            return jsonify(booking_listings), 200


    @app.route('/admin/guests', methods=['GET', 'OPTIONS'])
    def admin_get_guests():
        if request.method == 'OPTIONS':
            return _build_cors_prelight_response()

        # Fetch all guests
        guests = Guest.query.all()
        guest_list = [{
            "id": guest.id,
            "name": guest.name,
            "email": guest.email
        } for guest in guests]

        return jsonify(guest_list), 200
    
    @app.route('/admin/bookings', methods=['GET', 'OPTIONS'])
    def admin_get_bookings():
        if request.method == 'OPTIONS':
            return _build_cors_prelight_response()

        # Fetch all bookings
        bookings = Booking.query.all()
        booking_list = []
        for booking in bookings:
            listing = Listing.query.get(booking.listing_id)
            guest = Guest.query.get(booking.guest_id)
            booking_list.append({
                "id": booking.id,
                "guest_name": guest.name,
                "listing_title": listing.title,
                "start_date": booking.start_date.isoformat(),
                "end_date": booking.end_date.isoformat(),
                "total_price": booking.total_price,
                "status": booking.status
            })

        return jsonify(booking_list), 200

    @app.route('/admin/listings', methods=['GET', 'POST', 'OPTIONS'])
    def admin_manage_listings():
        if request.method == 'OPTIONS':
            return _build_cors_prelight_response()

        # Create Listing (POST)
        if request.method == 'POST':
            data = request.json
            if not data or 'title' not in data or 'description' not in data or 'price_per_night' not in data:
                return error_response("Title, description, and price are required", 400)

            new_listing = Listing(
                title=data['title'],
                description=data['description'],
                category=data['category'],
                price_per_night=data['price_per_night'],
                location=data.get('location', ''),
                bedrooms=data.get('bedrooms', 1),
                bathrooms=data.get('bathrooms', 1),
                amenities=data.get('amenities', ''),
                rating=data.get('rating', 5),
                image_url=data.get('image_url', '')
            )

            db.session.add(new_listing)
            try:
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                return error_response(str(e), 500)

            return jsonify({
                "id": new_listing.id,
                "title": new_listing.title,
                "price_per_night": new_listing.price_per_night
            }), 201

        # List All Listings (GET)
        if request.method == 'GET':
            listings = Listing.query.all()
            listings_list = [{
                "id": listing.id,
                "title": listing.title,
                "price_per_night": listing.price_per_night,
                "location": listing.location,
                "image_url": listing.image_url
            } for listing in listings]

            return jsonify(listings_list), 200

        @app.route('/admin/listings/<int:listing_id>', methods=['PUT', 'DELETE', 'OPTIONS'])
        def admin_single_listing(listing_id):
            if request.method == 'OPTIONS':
                return _build_cors_prelight_response()

            listing = Listing.query.get(listing_id)
            if not listing:
                return error_response("Listing not found", 404)
                

            # Update Listing (PUT)
            if request.method == 'PUT':
                data = request.json
                if 'title' in data:
                    listing.title = data['title']
                if 'description' in data:
                    listing.description = data['description']
                if 'price_per_night' in data:
                    listing.price_per_night = data['price_per_night']
                if 'location' in data:
                    listing.location = data['location']
                if 'bedrooms' in data:
                    listing.bedrooms = data['bedrooms']
                if 'bathrooms' in data:
                    listing.bathrooms = data['bathrooms']
                if 'amenities' in data:
                    listing.amenities = data['amenities']
                if 'rating' in data:
                    listing.rating = data['rating']
                if 'image_url' in data:
                    listing.image_url = data['image_url']

                try:
                    db.session.commit()
                except Exception as e:
                    db.session.rollback()
                    return error_response(str(e), 500)

                return jsonify({"id": listing.id, "title": listing.title, "price_per_night": listing.price_per_night}), 200

            # Delete Listing (DELETE)
            if request.method == 'DELETE':
                db.session.delete(listing)
                try:
                    db.session.commit()
                except Exception as e:
                    db.session.rollback()
                    return error_response(str(e), 500)

                return jsonify({"message": "Listing deleted successfully"}), 200
                