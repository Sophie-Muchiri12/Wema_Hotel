import React, { useEffect, useState } from 'react'; 
import { Container, Typography, Grid, Box, CircularProgress, Modal, TextField, Button } from '@mui/material';
import { getListings } from '../services/listingService';
import ListingCard from './ListingCard';
import { createBooking } from '../services/bookingService';
import { addFavorite } from '../services/favoriteService';
import '../App.css'; 

function Home({ showNotification }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteModalOpen, setFavoriteModalOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState(null); // Store selected listing ID
  const [email, setEmail] = useState(''); // Store the guest's email

  useEffect(() => {
    async function fetchListings() {
      try {
        const data = await getListings();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  const handleBooking = async (listingId, startDate, endDate) => {
    const email = sessionStorage.getItem('guest_email');
    if (!email) {
      showNotification('Error: Email not found. Please sign up first.');
      return;
    }

    const bookingData = {
      email,
      listing_id: listingId,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      await createBooking(bookingData);
      showNotification('Booking successful!'); // Use notification for booking success
    } catch (error) {
      console.error('Booking failed:', error);
      showNotification(`Booking failed: ${error.message || 'Try again.'}`); // Use notification for booking failure
    }
  };

  const handleFavorite = (listingId) => {
    setSelectedListingId(listingId); // Capture the listing ID when favorite is clicked
    setFavoriteModalOpen(true); // Open the modal to enter email
  };

  const submitFavorite = async () => {
    if (!email) {
      showNotification('Please enter your email'); // Use notification for missing email
      return;
    }

    try {
      await addFavorite({ email, listing_id: selectedListingId });
      showNotification('Added to favorites!'); // Use notification for success
      setFavoriteModalOpen(false); // Close the modal after successful submission
      setEmail(''); // Reset email field only on successful submission
    } catch (error) {
      console.error('Failed to add to favorites:', error);
      showNotification('Failed to add to favorites. Try again.'); // Use notification for failure
    }
  };

  return (
    
    <Container maxWidth="lg">
      {/* Modal for entering email */}
      <Modal
        open={favoriteModalOpen}
        onClose={() => setFavoriteModalOpen(false)}
        aria-labelledby="favorite-modal-title"
        aria-describedby="favorite-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          // bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px'
        }}>
          <Typography id="favorite-modal-title" variant="h6" component="h2">
            Add to Favorites
          </Typography>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            type="email"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={submitFavorite}
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      <Box sx={{ textAlign: 'center', marginBottom: 4 ,}}>
        <Typography variant="h3">Welcome to Wema Hotel!</Typography>
        <Typography variant="h5">Discover Your Perfect Getaway</Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {listings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing.id}>
              <ListingCard 
                listing={listing} 
                onBook={handleBooking} 
                onFavorite={handleFavorite} 
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Home;
