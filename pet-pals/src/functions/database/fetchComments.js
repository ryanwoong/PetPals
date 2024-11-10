import axios from 'axios';

export const fetchComments = async (userId, postId) => {
    try {
        const response = await axios.get(`http://localhost:5100/posts/${userId}/${postId}/comments`);
        return response.data.comments;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};