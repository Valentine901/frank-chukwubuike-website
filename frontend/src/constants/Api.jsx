
// import axios from "axios";

// const isProduction = import.meta.env.PROD;

// export const BASE_WS_URL = isProduction
//     ? "wss://portofolio-backend-ggxw.onrender.com"
//     : "ws://localhost:8000";

// export const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL || 
//     (isProduction ? "https://portofolio-backend-ggxw.onrender.com" : "http://localhost:8000");

// const BASE_URL = `${BASE_IMAGE_URL}/api`;

// export const api = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//     },
//     withCredentials: true,
// });

import axios from "axios";

const isProduction = import.meta.env.PROD;


export const BASE_WS_URL = isProduction
    ? "wss://portofolio-backend-ggxw.onrender.com"
    : "ws://localhost:8000";

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || 
    (isProduction ? "https://onrender.com" : "http://localhost:8000/api");

export const api = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
