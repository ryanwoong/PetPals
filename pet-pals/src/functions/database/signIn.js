import axios from "axios";

export async function signIn({ email, password }) {
    return axios.post("http://localhost:8800/login", {
        email: email,
        password: password,
    })
}