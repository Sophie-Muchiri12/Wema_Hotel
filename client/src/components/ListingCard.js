import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  IconButton,
  Modal,
  Box,
  TextField,
  Snackbar,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ListingCard = ({ listing, onFavorite, onBook }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [openModal, setOpenModal] = useState(false);  
  const [isBooking, setIsBooking] = useState(false);  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [email, setEmail] = useState('');  // Email state shared across actions
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isFavoriteClicked, setIsFavoriteClicked] = useState(false); // Debounce state

  const openBookingModal = () => {
    setIsBooking(true);
    setOpenModal(true);
  };

  const openFavoriteModal = () => {
    if (isFavoriteClicked) return; // Prevent double clicks
    setIsFavoriteClicked(true); // Set clicked state to true
    setIsBooking(false);
    setOpenModal(true);
    setTimeout(() => setIsFavoriteClicked(false), 500); // Reset after 500ms
  };

  const handleFavorite = async () => {
    if (!email) {
      setSnackbarMessage('Please enter your email to favorite this listing.');
      setOpenSnackbar(true);
      openFavoriteModal();  // Open modal to enter email for favoriting
      return;
    }

    setLoading(true);
    try {
      await onFavorite(listing.id, email);  // Send listing ID and email for favoriting
      setIsFavorite(true);
      setSnackbarMessage('Added to favorites!');
    } catch (error) {
      console.error('Failed to add favorite:', error);
      setSnackbarMessage('Failed to add to favorites. Try again.');
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
      setOpenModal(false);  // Close modal after submission
    }
  };

  const handleBooking = async () => {
    if (!startDate || !endDate || !email) {
      setSnackbarMessage('Please fill in all fields.');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    try {
      await onBook(listing.id, startDate, endDate, email);
      setSnackbarMessage('Booking confirmed!');
      setOpenModal(false);
    } catch (error) {
      console.error('Failed to create booking:', error);
      setSnackbarMessage(error.message || 'Error in booking. Please try again.');
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = () => {
    if (isBooking) {
      handleBooking();
    } else {
      handleFavorite();
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: '20px',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        background: '#b44a4a',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={listing.image_url}
        alt={listing.title}
        sx={{ objectFit: 'cover', transition: 'transform 0.5s', '&:hover': { transform: 'scale(1.1)' } }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" fontWeight="bold" color="#fff">
          {listing.title}
        </Typography>
        <Typography variant="body2" color="rgba(255, 255, 255, 0.8)" paragraph>
          {listing.description}
        </Typography>
        <Typography variant="body1" fontWeight="bold" color="#030708">
          Price per night: <span style={{ color: '#1a00e3' }}>${listing.price_per_night}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={openBookingModal}
          sx={{
            bgcolor: '#2196F3',
            color: '#fff',
            borderRadius: '20px',
            '&:hover': {
              bgcolor: '#2196F3',
              boxShadow: '0 0 10px #2196F3, 0 0 20px #2196F3',
            },
          }}
        >
          Book Now
        </Button>
        <IconButton
          aria-label="add to favorites"
          onClick={openFavoriteModal}
          disabled={isFavorite}
        >
          <FavoriteIcon color={isFavorite ? 'error' : 'disabled'} />
        </IconButton>
      </CardActions>

      {/* Modal for Booking/Favorite Form */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
            margin: 'auto',
            mt: '20%',
            borderRadius: 2,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            {isBooking ? 'Booking Form' : 'Favorite this Listing'}
          </Typography>
          <TextField
            label="Email"
            type="email"
            value={email}  // Preserves the email across both actions
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            variant="outlined"
            color="primary"
          />
          {isBooking && (
            <>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            color="primary"
            fullWidth
          >
            {loading ? 'Processing...' : isBooking ? 'Confirm Booking' : 'Add to Favorites'}
          </Button>
        </Box>
      </Modal>

      {/* Snackbar for Feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Card>
  );
};

export default ListingCard;  // Ensure the export statement is included at the end
