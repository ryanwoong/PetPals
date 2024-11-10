import axios from 'axios';

const BASE_URL = 'http://localhost:5100';  // Adjust this to match your backend URL

export const fetchShopItems = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/shop/items`);
        return response.data.items;
    } catch (error) {
        console.error('Error fetching shop items:', error);
        throw error;
    }
};