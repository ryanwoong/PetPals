import axios from 'axios';

// Function to fetch all public posts
export const fetchPublicPosts = async () => {
    try {
        // Send a GET request to retrieve all public posts
        const response = await axios.get('http://localhost:5100/posts/public');
        
        // Return the array of posts from the response
        return response.data.posts;
    } catch (error) {
        // Log any errors encountered and rethrow to allow for error handling by the caller
        console.error('Error fetching public posts:', error);
        throw error;
    }
};
