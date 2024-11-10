// src/services/inventoryService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5100';

export const getUserInventory = async (userId) => {
    try {
        console.log('Fetching inventory for user:', userId);
        const response = await axios.get(`${BASE_URL}/inventory/${userId}`);
        console.log('Inventory response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory:', error);
        throw error;
    }
};
export const purchaseItem = async ({ userId, itemId, quantity = 1 }) => {
    try {
        const response = await axios.post(`${BASE_URL}/inventory/purchase`, {
            userId,
            itemId,
            quantity
        });
        return response.data;
    } catch (error) {
        console.error('Error purchasing item:', error);
        throw error;
    }
};

export const useItem = async ({ userId, itemId }) => {
    try {
        const response = await axios.post(`${BASE_URL}/inventory/use`, {
            userId,
            itemId
        });
        return response.data;
    } catch (error) {
        console.error('Error using item:', error);
        throw error;
    }
};