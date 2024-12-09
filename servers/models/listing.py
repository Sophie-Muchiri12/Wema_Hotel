from database import db

class Listing(db.Model):
    __tablename__ = 'listings'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    price_per_night = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    amenities = db.Column(db.String(255))
    rating = db.Column(db.Float)
    image_url = db.Column(db.String(255))

    # Relationships
    favorites = db.relationship('Favorite', back_populates='listing', cascade='all, delete-orphan')
    bookings = db.relationship('Booking', back_populates='listing', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Listing {self.title}>'
