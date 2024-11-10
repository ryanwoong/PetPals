import axios from "axios";

export const addEntry = async ({ text, title, isPublic, authorId }) => {
    try {
        // First, create the entry
        const response = await axios.post("http://localhost:5100/addEntry", {
            authorId: authorId,
            title: title,
            text: text,
            isPublic: isPublic
        });
        
        // If entry was created successfully, update user's coins
        if (response.status === 201) {
            try {
                await axios.post('http://localhost:5100/users/addCoins', {
                    userId: authorId,
                    amount: 5
                });
            } catch (coinError) {
                console.error('Error updating coins after entry creation:', coinError);
                // We don't throw here because the entry was still successfully created
            }
        }
       
        return response.data;
    } catch (error) {
        console.error('Error creating entry:', error);
        throw error;
    }
};