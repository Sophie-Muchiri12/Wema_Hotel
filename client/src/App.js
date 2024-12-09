import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Make sure you're using the correct import
import NavBar from './components/Navbar';
import Home from './components/Home'; // Ensure Home is imported correctly
import LandingPage from './components/LandingPage';
import Listings from './components/Listings';
import SignUp from './components/SignUp';
import { Snackbar } from '@mui/material';
import AdminPanel from './components/AdminPanel';

function App() {
  const [notification, setNotification] = useState({ open: false, message: '' });


  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };


  const showNotification = (message) => {
    setNotification({ open: true, message });
  };


  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home showNotification={showNotification} />} /> {/* Correct route for Home */}
        <Route path="/listings" element={<Listings showNotification={showNotification} />} />
        <Route path="/signup" element={<SignUp showNotification={showNotification} />} />
        <Route path="/adminpanel" element={<AdminPanel showNotification={showNotification} />} />

      </Routes>
      <Snackbar
        open={notification.open}
        onClose={handleClose}
        message={notification.message}
        autoHideDuration={3000}
      />
    </Router>
  );
}


export default App;

