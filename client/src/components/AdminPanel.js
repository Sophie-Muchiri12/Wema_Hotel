import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

// Admin Panel Component
const AdminPanel = () => {
  const [guests, setGuests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [listings, setListings] = useState([]);
  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    price_per_night: '',
    location: '',
    image_url: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data from API
  useEffect(() => {
    fetchData('guests', setGuests);
    fetchData('bookings', setBookings);
    fetchData('listings', setListings);
  }, []);

  const fetchData = async (type, setState) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/admin/${type}`);
      const data = await response.json();
      setState(data);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateListing = async () => {
    if (!newListing.title || !newListing.price_per_night) {
      alert('Title and Price are required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/admin/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newListing),
      });
      console.log(newListing)
      const createdListing = await response.json();
      setListings((prev) => [...prev, createdListing]);
      setNewListing({ title: '', description: '', price_per_night: '', location: '', image_url: '' });
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/listings/${listingId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.message) {
        setListings(listings.filter((listing) => listing.id !== listingId));
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Admin Panel</Typography>

      {/* Guests Table */}
      <Typography variant="h5" gutterBottom>Guests</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell>{guest.name}</TableCell>
                <TableCell>{guest.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bookings Table */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>Bookings</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Guest Name</TableCell>
              <TableCell>Listing Title</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.guest_name}</TableCell>
                <TableCell>{booking.listing_title}</TableCell>
                <TableCell>{booking.start_date}</TableCell>
                <TableCell>{booking.end_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Listings Table */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>Listings</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price per Night</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>{listing.title}</TableCell>
                <TableCell>{listing.price_per_night}</TableCell>
                <TableCell>{listing.location}</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => handleDeleteListing(listing.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Listing Form */}
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>Add New Listing</Typography>
      <TextField
        label="Title"
        fullWidth
        value={newListing.title}
        onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Description"
        fullWidth
        value={newListing.description}
        onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Price per Night"
        fullWidth
        value={newListing.price_per_night}
        onChange={(e) => setNewListing({ ...newListing, price_per_night: e.target.value })}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Location"
        fullWidth
        value={newListing.location}
        onChange={(e) => setNewListing({ ...newListing, location: e.target.value })}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Image URL"
        fullWidth
        value={newListing.image_url}
        onChange={(e) => setNewListing({ ...newListing, image_url: e.target.value })}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleCreateListing}>Add Listing</Button>
    </Container>
  );
};

export default AdminPanel;
