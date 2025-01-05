import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true, // Important pour Sanctum
});

// Ajouter un intercepteur pour inclure le token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Récupère le token depuis le localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;