import axios from 'axios';

export const fetchUserPosts = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:5100/posts/user/${userId}`);
        return response.data.posts;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error;
    }
};