import axios from "axios";

// Function to add a new journal entry to the database
export const addEntry = async ({ text, title, isPublic, authorId }) => {
    try {
        // First, create the entry
        const response = await axios.post("http://localhost:5100/addEntry", {
            authorId: authorId, // User ID of the entry author
            title: title,       // Entry title
            text: text,         // Entry content
            isPublic: isPublic  // Visibility setting
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
        // Log any errors and rethrow to handle them higher up if needed
        console.error('Error creating entry:', error);
        throw error;
    }
};
