import axios from 'axios';

export const addComment = async ({ postId, userId, authorId, commentBody }) => {
    try {
        const response = await axios.post('http://localhost:5100/comments', {
            postId,
            userId,
            authorId,
            commentBody
        });
        return response.data;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};