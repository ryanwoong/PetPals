import axios from 'axios';

// Function to fetch posts created by a specific user
export const fetchUserPosts = async (userId) => {
    try {
        // Send a GET request to retrieve posts by the specified user
        const response = await axios.get(`http://localhost:5100/posts/user/${userId}`);
        
        // Return the array of posts from the response
        return response.data.posts;
    } catch (error) {
        // Log any errors encountered and rethrow to allow for error handling by the caller
        console.error('Error fetching user posts:', error);
        throw error;
    }
};
