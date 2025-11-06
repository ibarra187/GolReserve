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

// Interceptor para manejar tokens y opciones CORS
api.interceptors.request.use((config) => {
    // Agregar token si existe
    const token = tokenService.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Asegurar que las opciones CORS estén presentes en cada petición
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    
    // Log de la petición para debugging
    console.log('Configuración de la petición:', {
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data
    });
    
    return config;
}, (error) => {
    console.error('Error en la configuración de la petición:', error);
    return Promise.reject(error);
});

// Interceptor para manejar errores
api.interceptors.response.use(
    (response) => {
        console.log('Respuesta exitosa:', response);
        return response;
    },
    (error) => {
        console.error('Error completo:', error);
        
        if (error.response) {
            console.error('Estado de la respuesta:', error.response.status);
            console.error('Datos del error:', error.response.data);
            
            switch (error.response.status) {
                case 401:
                    tokenService.clearUserData();
                    window.location.hash = 'login';
                    break;
                case 403:
                    console.error('Error de CORS o permisos:', {
                        config: error.config,
                        headers: error.response.headers
                    });
                    break;
                default:
                    console.error('Error en la petición:', error.response.data);
            }
        }
        
        return Promise.reject(error.response?.data || error);
    }
);

export default api;