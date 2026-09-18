import axios from "axios";

const isProduction = import.meta.env.PROD;

export const BASE_WS_URL = isProduction
    ? "wss://://onrender.com"
    : "ws://localhost:8000";

export const BASE_IMAGE_URL = isProduction 
    ? "https://portofolio-backend-ggxw.onrender.com" 
    : "http://localhost:8000";

const BASE_URL = `${BASE_IMAGE_URL}/api`;

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

