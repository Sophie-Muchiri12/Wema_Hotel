// src/services/bookingService.js

const API_BASE_URL = 'http://127.0.0.1:5000'; // Flask API base URL

export const createBooking = async (data) => {
    const { listing_id, start_date, end_date, email } = data;
    try {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ listing_id, start_date, end_date, email }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create booking');
        }

        const bookingData = await response.json();
        console.log('Booking created:', bookingData);
        return bookingData; // Return the booking data
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error; // Rethrow the error for handling in the component
    }
};