const API_BASE_URL = 'http://127.0.0.1:5000';

export const signUp = async (name, email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        
        // Check if response is ok (status code is 2xx)
        if (!response.ok) {
            // Try to parse the response body as JSON to extract the error message
            const errorData = await response.json();
            // Use the error message from the server, or fall back to a generic message
            throw new Error(errorData.error || 'Signup failed. Please try again.');
        }

        // If successful, parse and return the user data from the response
        const data = await response.json();
        console.log('Signup successful:', data);
        return data; // Return the user data
    } catch (error) {
        console.error('Error signing up:', error);
        // Rethrow the error for handling in the component
        throw error;
    }
};
