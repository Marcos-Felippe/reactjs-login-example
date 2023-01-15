import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:3001",
});

export const createSession = async (email: string, password: string) => {
    return api.post("/login", { email, password });
}

export const getUsers = async () =>{
    return api.get("/getAll", {});
}