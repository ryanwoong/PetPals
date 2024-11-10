import axios from 'axios';

export const fetchPublicPosts = async () => {
    try {
        const response = await axios.get('http://localhost:5100/posts/public');
        return response.data.posts;
    } catch (error) {
        console.error('Error fetching public posts:', error);
        throw error;
    }
};