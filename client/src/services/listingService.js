const API_BASE_URL = 'http://127.0.0.1:5000'; 

export const getListings = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/listings`);
        if (!response.ok) {
            throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        return data; // Ensure this returns an array of listings
    } catch (error) {
        console.error('Error fetching listings:', error);
        throw error; // Rethrow error for handling in the component
    }
};