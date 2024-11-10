import axios from "axios";

export const addEntry = async ({ text, title, isPublic, authorId }) => {
    try {
        const response = await axios.post("http://localhost:5100/addEntry", {
            authorId: authorId,
            title: title,
            text: text,
            isPublic: isPublic
        });
        
        return response.data;
    } catch (error) {
        console.error('Error creating entry:', error);
        throw error;
    }
}