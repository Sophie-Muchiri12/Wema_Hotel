from app import create_app
from database import db 
from models.listing import Listing

app = create_app()

# Sample listings data
sample_listings = [
    {"title": "Cozy Tiny Home", "description": "A cozy tiny home in the city.", "category": "tiny homes", "price_per_night": 85.0, "location": "City Center", "bedrooms": 1, "bathrooms": 1, "amenities": "WiFi, Kitchen", "rating": 4.5, "image_url": "https://th.bing.com/th/id/OIP.xg1wDwahtIjbAPx-j03LIwHaEK?rs=1&pid=ImgDetMain"},

    {"title": "Beachfront Bungalow", "description": "A beautiful bungalow by the beach.", "category": "beach", "price_per_night": 150.0, "location": "Beachside", "bedrooms": 2, "bathrooms": 1, "amenities": "Pool, Beach Access", "rating": 4.8, "image_url": "https://img.freepik.com/premium-photo/modern-bedroom-interior-design-apartment-house-with-furniture-luxury-bedroom-scandinavian_326694-11434.jpg"},
    {"title": "Luxurious Pool House", "description": "Relax in this luxurious pool house.", "category": "pool house", "price_per_night": 200.0, "location": "Los Angeles", "bedrooms": 3, "bathrooms": 2, "amenities": "Private Pool, BBQ", "rating": 4.9, "image_url": "https://i.pinimg.com/originals/a0/14/8f/a0148f0333a3714fba3dadaf033eeb2e.jpg"},
    {"title": "Charming Bed & Breakfast", "description": "Enjoy a charming stay at this bed & breakfast.", "category": "bed and breakfast", "price_per_night": 120.0, "location": "Countryside", "bedrooms": 5, "bathrooms": 5, "amenities": "Free Breakfast, WiFi", "rating": 4.7, "image_url": "https://cms.interiorcompany.com/wp-content/uploads/2024/05/elegant-brown-and-cream-colour-combination-for-bedroom.jpg"},
    # More listings for tiny homes
    {"title": "Modern Tiny House", "description": "A modern tiny house with a beautiful view.", "category": "tiny homes", "price_per_night": 90.0, "location": "Hillside", "bedrooms": 1, "bathrooms": 1, "amenities": "WiFi, Scenic View", "rating": 4.6, "image_url": "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/6ab98496115783.5ea7334adaf78.jpg"},
    {"title": "Rustic Tiny Cabin", "description": "A rustic tiny cabin in the woods.", "category": "tiny homes", "price_per_night": 75.0, "location": "Forest", "bedrooms": 1, "bathrooms": 1, "amenities": "Quiet, Nature", "rating": 4.5, "image_url": "https://th.bing.com/th/id/OIP.uMsrsMdoUNFq8FAITuzuKAHaEc?rs=1&pid=ImgDetMain"},
    {"title": "Chic Tiny Studio", "description": "A chic tiny studio with modern amenities.", "category": "tiny homes", "price_per_night": 100.0, "location": "Urban Area", "bedrooms": 1, "bathrooms": 1, "amenities": "Smart TV, Kitchen", "rating": 4.8, "image_url": "https://i.pinimg.com/originals/e0/35/97/e0359701ed172c36e61b0cd3618d9a16.jpg"},
    {"title": "Quaint Tiny House", "description": "A quaint tiny house perfect for a weekend getaway.", "category": "tiny homes", "price_per_night": 80.0, "location": "Countryside", "bedrooms": 1, "bathrooms": 1, "amenities": "Outdoor Firepit", "rating": 4.4, "image_url": "https://th.bing.com/th/id/OIP.RzEHbxoXWIXURaiTUI388gHaFj?w=960&h=720&rs=1&pid=ImgDetMain"},
    {"title": "Eco-Friendly Tiny Home", "description": "An eco-friendly tiny home with solar panels.", "category": "tiny homes", "price_per_night": 95.0, "location": "Suburb", "bedrooms": 1, "bathrooms": 1, "amenities": "Eco-Friendly, Garden", "rating": 4.7, "image_url": "https://th.bing.com/th/id/R.8faeec6301776542af5743a5f13d2ca7?rik=%2bkL3TnKDOArDYw&riu=http%3a%2f%2f3.bp.blogspot.com%2f-A7jHusrRbJ0%2fUsbShSlDM9I%2fAAAAAAAADkQ%2fs3QNKZP3Rgc%2fs1600%2fsimple-master-bedroom-designs-in-brown-color-bedroom-rugs.jpg&ehk=ckIDrg%2bhJRw1RN%2f3VxO19zS0ZUM8BR%2bcvGdzzbEP8Fg%3d&risl=&pid=ImgRaw&r=0"},
    {"title": "Tiny House on Wheels", "description": "A tiny house on wheels for travel lovers.", "category": "tiny homes", "price_per_night": 85.0, "location": "Mobile", "bedrooms": 1, "bathrooms": 1, "amenities": "Flexible Location", "rating": 4.6, "image_url": "https://th.bing.com/th/id/R.e40205432954d42cc8ee7a86ae06e150?rik=%2b%2bPg20%2fGEicPoQ&riu=http%3a%2f%2fvintageindustrialstyle.com%2fwp-content%2fuploads%2f2014%2f03%2f10_great_vintage_modern_bedroom_ideas2.jpg&ehk=XjC7K%2bUWtW%2fLh2ACzIj13h9%2bBG2Q%2f6TKeetWMvS89rs%3d&risl=&pid=ImgRaw&r=0"},
    # More listings for beach properties
    {"title": "Ocean View Beach House", "description": "A stunning ocean view beach house.", "category": "beach", "price_per_night": 250.0, "location": "Malibu", "bedrooms": 3, "bathrooms": 2, "amenities": "Ocean View, Private Deck", "rating": 4.9, "image_url": "https://th.bing.com/th/id/R.e40205432954d42cc8ee7a86ae06e150?rik=%2b%2bPg20%2fGEicPoQ&riu=http%3a%2f%2fvintageindustrialstyle.com%2fwp-content%2fuploads%2f2014%2f03%2f10_great_vintage_modern_bedroom_ideas2.jpg&ehk=XjC7K%2bUWtW%2fLh2ACzI"},
    {"title": "Coastal Retreat", "description": "A coastal retreat with beautiful surroundings.", "category": "beach", "price_per_night": 200.0, "location": "Florida", "bedrooms": 2, "bathrooms": 2, "amenities": "Free Parking", "rating": 4.8, "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjlJwkndhcnyPaigD1cLdogmrBtQky4FBnEg&s"},

    {"title": "Luxury Beachfront Villa", "description": "A luxurious beachfront villa with top amenities.", "category": "beach", "price_per_night": 500.0, "location": "Miami", "bedrooms": 4, "bathrooms": 3, "amenities": "Infinity Pool, Spa", "rating": 5.0, "image_url": "https://th.bing.com/th/id/R.7cdde128deaf89263db9b5e1d356a956?rik=LxXYzEwa%2bLe6EA&riu=http%3a%2f%2fkatieseagle.weebly.com%2fuploads%2f9%2f0%2f3%2f2%2f90326101%2f123323865.jpg%3f1120&ehk=HDqgmrcFeO4GzGjLMgi4dmJvkyBAG305R8BUI1ucVpA%3d&risl=&pid=ImgRaw&r=0"},
    {"title": "Charming Beach Cottage", "description": "A charming cottage close to the beach.", "category": "beach", "price_per_night": 180.0, "location": "Oregon Coast", "bedrooms": 2, "bathrooms": 1, "amenities": "BBQ Grill", "rating": 4.6, "image_url": "https://th.bing.com/th/id/OIP.yFRPTFzREcxc4F5Pm0sHEQAAAA?w=470&h=244&rs=1&pid=ImgDetMain"},
    {"title": "Seaside Apartment", "description": "A modern apartment near the seaside.", "category": "beach", "price_per_night": 160.0, "location": "Cape Cod", "bedrooms": 2, "bathrooms": 1, "amenities": "Beach Access", "rating": 4.7, "image_url": "https://th.bing.com/th/id/R.a838237111928016204d11f4908e0bb8?rik=LBr4DZxaPUvxJA&riu=http%3a%2f%2fwww.the-creative-home.com%2fwp-content%2fuploads%2f2015%2f02%2fred-in-decoration1.jpg&ehk=T3y%2fZN8SswOwE6wmbtFCY9bpRPoOlVHWNz6SFLVXq9M%3d&risl=&pid=ImgRaw&r=0"},
    {"title": "Rustic Beach Hut", "description": "A rustic beach hut with a laid-back vibe.", "category": "beach", "price_per_night": 90.0, "location": "Hawaii", "bedrooms": 1, "bathrooms": 1, "amenities": "Outdoor Shower", "rating": 4.5, "image_url": "https://th.bing.com/th/id/OIP.ZY0uDOWZT97fUqoPWERjOgHaFJ?w=1200&h=834&rs=1&pid=ImgDetMain"},
    {"title": "Elegant Beach Resort", "description": "An elegant beach resort with luxury amenities.", "category": "beach", "price_per_night": 400.0, "location": "Cancun", "bedrooms": 5, "bathrooms": 4, "amenities": "All-Inclusive", "rating": 4.9, "image_url": "https://th.bing.com/th/id/R.a838237111928016204d11f4908e0bb8?rik=LBr4DZxaPUvxJA&riu=http%3a%2f%2fwww.the-creative-home.com%2fwp-content%2fuploads%2f2015%2f02%2fred-in-decoration1.jpg&ehk=T3y%2fZN8SswOwE6wmbtFCY9bpRPoOlVHWNz6SFLVXq9M%3d&risl=&pid=ImgRaw&r=0"},
    {"title": "Sunny Beach House", "description": "A sunny beach house perfect for families.", "category": "beach", "price_per_night": 300.0, "location": "Santa Monica", "bedrooms": 3, "bathrooms": 2, "amenities": "Family Friendly", "rating": 4.8, "image_url": "https://www.furnituredepot.com/cachedimages/9/925761b3b36c89cb30928cbc80f1d8cd.image.400x252.jpg"},
    {"title": "Tranquil Beach Retreat", "description": "A tranquil retreat just steps from the beach.", "category": "beach", "price_per_night": 220.0, "location": "Myrtle Beach", "bedrooms": 3, "bathrooms": 2, "amenities": "Hot Tub", "rating": 4.9, "image_url": "https://th.bing.com/th/id/OIP._dOOYokQf1LFFnaaXZBFUwHaEq?w=900&h=567&rs=1&pid=ImgDetMain"},
    {"title": "Modern Beach House", "description": "A modern beach house with open concept living.", "category": "beach", "price_per_night": 350.0, "location": "Newport", "bedrooms": 4, "bathrooms": 3, "amenities": "Oceanfront", "rating": 4.9, "image_url": "https://th.bing.com/th/id/OIP.OVDZaNX1deKWmZuW9bNO-wHaEK?w=1000&h=563&rs=1&pid=ImgDetMain"},
]
def seed_database():
    with app.app_context():
        db.create_all()
        for listing in sample_listings:
            new_listing = Listing(**listing)
            db.session.add(new_listing)
        db.session.commit()
        print("Database seeded!")

if __name__ == '__main__':
   seed_database()
