import axios from "axios";

// Function to handle user sign-in
export async function signIn({ email, password }) {
    return axios.post("http://localhost:5100/login", {
        email: email,
        password: password,
    });
}
