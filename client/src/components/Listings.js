import React, { useEffect, useState } from 'react';
import { getFavorites, getBookings } from '../services/guestlisting';
import { Modal, Typography, Box } from '@mui/material';

function Listings() {
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [email, setEmail] = useState('');
  const [openModal, setOpenModal] = useState(true); // Start with the modal open

  // Fetch data when email is provided
  useEffect(() => {
    if (email) {
      // Fetch favorites and bookings
      Promise.all([
        getFavorites(email).then(data => setFavorites(data)),
        getBookings(email).then(data => setBookings(data))
      ]).catch((err) => console.error('Error fetching data:', err));
    }
  }, [email]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setOpenModal(false); // Close modal when email is submitted
    }
  };

  return (
    <div className="p-8 bg-white">
      <h2 className="text-2xl font-bold mb-8">Your Listings</h2>

      {/* Modal for Email Input */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="bg-white p-6 rounded-lg shadow-lg mx-auto mt-16 max-w-sm">
          <Typography variant="h6" gutterBottom>
            Enter your email to view your Booking and Favorite Rooms
          </Typography>
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>

      <section className="mb-16">
        <h3 className="text-xl font-bold mb-4">Favorites</h3>
        {favorites.length ? (
          <div className="space-y-4">
            {favorites.map(favorite => (
              <div key={favorite.id} className="flex gap-4 items-start">
                {favorite.image_url && (
                  <img src={favorite.image_url} alt={favorite.listing_title || 'No title available'} className="w-24 h-24 object-cover rounded-lg" />
                )}
                <div>
                  <strong>{favorite.listing_title || 'Untitled Favorite'}</strong>
                  <p>{favorite.listing_description || 'No description available'}</p>
                  <p>Price per night: ${favorite.price_per_night}</p>
                  <p>Location: {favorite.location}</p>
                  <p>Category: {favorite.category || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No favorites found.</p>
        )}
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">Bookings</h3>
        {bookings.length ? (
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking.id} className="flex gap-4 items-start">
                {booking.image_url && (
                  <img src={booking.image_url} alt={booking.listing_title || 'No title available'} className="w-24 h-24 object-cover rounded-lg" />
                )}
                <div>
                  <strong>{booking.listing_title || 'Untitled Booking'}</strong>
                  <p>From: {new Date(booking.start_date).toLocaleDateString()}</p>
                  <p>To: {new Date(booking.end_date).toLocaleDateString()}</p>
                  <p>Category: {booking.category || 'N/A'}</p>
                  <p>Total Price: ${booking.total_price}</p>
                  <p>Status: {booking.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No bookings found.</p>
        )}
      </section>
    </div>
  );
}

export default Listings;
