// import axios from "axios"; 

// const isProduction = import.meta.env.PROD;

// const BASE_URL = "http://localhost:8000/api"; 

// export const BASE_IMAGE_URL = isProduction 
//     ? import.meta.env.VITE_API_PRODUCTION_URL 
//     : "http://localhost:8000";

// export const api = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
//     withCredentials: true,
// });


import axios from "axios";

const isProduction = import.meta.env.PROD;


export const BASE_IMAGE_URL = isProduction 
    ? "https://onrender.com" 
    : "http://localhost:8000";

const BASE_URL = `${BASE_IMAGE_URL}/api`;

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
