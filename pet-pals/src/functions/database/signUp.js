import axios from "axios";

export async function signUp({ email, password, user_type }) {
    return axios.post("http://localhost:5100/register", {
        email: email,
        password: password,
    })
}