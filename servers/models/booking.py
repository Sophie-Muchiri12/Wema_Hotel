from database import db
from datetime import datetime

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    guest_id = db.Column(db.Integer, db.ForeignKey('guests.id'), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False, default='confirmed')

    # Relationships
    guest = db.relationship('Guest', back_populates='bookings')
    listing = db.relationship('Listing', back_populates='bookings')

    def __repr__(self):
        return f'<Booking {self.id} Guest: {self.guest_id} Listing: {self.listing_id}>'
