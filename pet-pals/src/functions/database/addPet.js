import axios from "axios";

export const addPet = async ({ userId, petId, petName }) => {
  try {
    const response = await axios.post(`http://localhost:5100/users/${userId}/pets`, {
      petId,
      petName
    });

    return response.data;
  } catch (error) {
    console.error('Error adding pet:', error);
    throw error;
  }
};