import axios from "axios";

// Function to add a new journal entry to the database
export const addEntry = async ({ text, title, isPublic, authorId }) => {
    try {
        // Send a POST request to the addEntry endpoint with entry details
        const response = await axios.post("http://localhost:5100/addEntry", {
            authorId: authorId, // User ID of the entry author
            title: title,       // Entry title
            text: text,         // Entry content
            isPublic: isPublic  // Visibility setting
        });
        
        // Return response data if the request is successful
        return response.data;
    } catch (error) {
        // Log any errors and rethrow to handle them higher up if needed
        console.error('Error creating entry:', error);
        throw error;
    }
}
