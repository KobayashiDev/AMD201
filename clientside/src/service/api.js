import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:8386"
});

export const login = (data) => api.post("/login", data);
export const register = (data) => api.post("/register", data);
export const getUserLinks = (userId) => api.get(`/shortedMapLinks/${userId}`);
export const createShortedLink = (data) => api.post("/createShortedLink", data);
export const redirectLink = (shortedLink) => api.get(`/redirectLink/${shortedLink}`);

export default api;
