import axios from 'axios';

// Function to add a comment to a specific post
export const addComment = async ({ postId, userId, authorId, commentBody }) => {
    try {
        // Send a POST request to the comments endpoint with comment details
        const response = await axios.post('http://localhost:5100/comments', {
            postId, // ID of the post where the comment is added
            userId, // ID of the user who owns the post
            authorId, // ID of the user making the comment
            commentBody // Text content of the comment
        });
        
        // Return the response data if the request is successful
        return response.data;
    } catch (error) {
        // Log and rethrow any errors encountered during the request
        console.error('Error adding comment:', error);
        throw error;
    }
};
