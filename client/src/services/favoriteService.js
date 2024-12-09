// src/services/favoriteService.js

const API_BASE_URL = 'http://127.0.0.1:5000'; // Flask API base URL



export const addFavorite = async (data) => {
    const { listing_id, email } = data;
    try {
        const response = await fetch(`${API_BASE_URL}/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ listing_id, email }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to add favorite');
        }

        const favoriteData = await response.json();
        console.log('Favorite added:', favoriteData);
        return favoriteData; // Return the favorite data
    } catch (error) {
        console.error('Error adding favorite:', error);
        throw error; // Rethrow the error for handling in the component
    }
};
