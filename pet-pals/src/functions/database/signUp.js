import axios from "axios";

export async function signUp({ email, password, user_type }) {
    return axios.post("http://localhost:8800/register", {
        email: email,
        password: password,
    })
}