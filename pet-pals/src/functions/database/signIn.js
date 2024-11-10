import axios from "axios";

export async function signIn({ email, password }) {
    return axios.post("http://localhost:5100/login", {
        email: email,
        password: password,
    })
}