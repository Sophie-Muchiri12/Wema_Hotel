from database import db

class Favorite(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    guest_id = db.Column(db.Integer, db.ForeignKey('guests.id'), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)

    # Relationships
    guest = db.relationship('Guest', back_populates='favorites')
    listing = db.relationship('Listing', back_populates='favorites')

    def __repr__(self):
        return f'<Favorite {self.id}>'
