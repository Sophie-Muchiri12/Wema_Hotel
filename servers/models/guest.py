from database import db

class Guest(db.Model):
    __tablename__ = 'guests'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    # Relationships
    favorites = db.relationship('Favorite', back_populates='guest', cascade='all, delete-orphan')
    bookings = db.relationship('Booking', back_populates='guest', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Guest {self.name}>'
