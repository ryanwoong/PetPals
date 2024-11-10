import axios from "axios";

// Function to register a new user with email, password, and user type
export async function signUp({ email, password, user_type }) {
    // Send a POST request to the server for registration
    return axios.post("http://localhost:5100/register", {
        email: email,
        password: password,
        user_type: user_type, // Include user type to specify user role
    });
}
