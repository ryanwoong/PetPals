import axios from 'axios';

// Function to fetch comments for a specific post by a specific user
export const fetchComments = async (userId, postId) => {
    try {
        // Send a GET request to fetch comments associated with the specified post and user
        const response = await axios.get(`http://localhost:5100/posts/${userId}/${postId}/comments`);
        
        // Return the array of comments from the response
        return response.data.comments;
    } catch (error) {
        // Log any errors and rethrow to handle them higher up if needed
        console.error('Error fetching comments:', error);
        throw error;
    }
};
