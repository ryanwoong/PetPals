import axios from 'axios';

export const addComment = async ({ postId, userId, authorId, commentBody }) => {
    try {
        // First check if comment is safe
        const checkCommentResponse = await axios.post('http://localhost:5100/checkComment', {
            commentBody: commentBody
        });
        
        // If the comment check was successful, proceed with posting
        if (checkCommentResponse.status === 200) {
            const response = await axios.post('http://localhost:5100/comments', {
                postId,
                userId,
                authorId,
                commentBody
            });
            return response.data;
        } else {
            console.log(`Comment is not safe or contains restricted words.`);
            return null;
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log(`Comment is not safe or contains restricted words.`);
            return null;
        }
        console.error('Error processing comment:', error);
        throw error;
    }
};