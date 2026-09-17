import axios from "axios"; 

const isProduction = import.meta.env.PROD;

const BASE_URL = "http://localhost:8000/api"; 

export const BASE_IMAGE_URL = isProduction 
    ? import.meta.env.VITE_API_PRODUCTION_URL 
    : "http://localhost:8000";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// postgresql://admin:7BiifMMoCzEO0hSXUM5Cduxw5EOoDN8A@dpg-dam3i2ncgkoc73877ltg-a/portfolio_eeyu