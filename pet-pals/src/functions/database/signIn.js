import axios from "axios";

// Function to handle user sign-in
export async function signIn({ email, password }) {
    // Send a POST request to the server with email and password for authentication
    return axios.post("http://localhost:8800/login", {
        email: email,
        password: password,
    });
}
