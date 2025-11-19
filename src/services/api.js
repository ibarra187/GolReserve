import axios from 'axios';
import { tokenService } from './tokenService';

const api = axios.create({
    baseURL: 'http://localhost:9090/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    withCredentials: false
});

// Interceptor para manejar tokens
api.interceptors.request.use((config) => {
    // Agregar token si existe
    const token = tokenService.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para manejar errores
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Solo redirigir a login si NO estamos en una página de autenticación
        const isAuthPage = window.location.hash === '#login' || window.location.hash === '#register';
        
        if (error.response?.status === 401 && !isAuthPage) {
            tokenService.clearUserData();
            window.location.hash = 'login';
        }
        
        return Promise.reject(error);
    }
);

export default api;