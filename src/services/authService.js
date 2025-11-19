import api from './api';
import { tokenService } from './tokenService';

export const authService = {
    login: async (email, password) => {
        try {
            const response = await api.post('/usuarios/login', { email, password });
            
            // Guardar los datos del usuario y el token JWT
            if (response.data) {
                const userData = {
                    email: response.data.email,
                    nombre: response.data.nombre,
                    idUsuario: response.data.idUsuario
                };
                
                // Si el backend devuelve un token, guardarlo
                if (response.data.token) {
                    tokenService.setToken(response.data.token);
                }
                
                tokenService.setUserData(userData);
                return response.data;
            }
        } catch (error) {
            // Manejar errores de forma clara
            if (error.response?.status === 401) {
                throw new Error('Correo o contraseña incorrectos');
            }
            if (error.response?.data?.mensaje) {
                throw new Error(error.response.data.mensaje);
            }
            throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
        }
    },

    register: async (userData) => {
        try {
            console.log('Datos de registro recibidos en authService:', userData);
            
            // Remover espacios en blanco y asegurarse de que los datos estén en el formato correcto
            const formattedData = {
                cedula: parseInt(userData.cedula.replace(/\s/g, '')),
                nombre: userData.nombre.trim(),
                email: userData.email.trim().toLowerCase(),
                password: userData.password,
                telefono: userData.telefono.replace(/\s/g, ''),
                estadoUsuario: "ACTIVO",
                rolUsuario: "CLIENTE"
            };
            
            console.log('Datos formateados para enviar al servidor:', formattedData);
            
            const response = await api.post('/usuarios/registrar', formattedData);
            console.log('Respuesta exitosa del servidor:', response.data);
            
            if (response.data) {
                console.log('Registro exitoso');
                return response.data;
            } else {
                throw new Error('No se recibió respuesta del servidor');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            
            if (error.response?.data?.message) {
                // Error con mensaje del servidor
                throw { message: error.response.data.message };
            } else if (error.response?.status === 403) {
                throw { message: 'No tienes permiso para realizar esta acción' };
            } else if (error.response?.status === 400) {
                throw { message: 'Datos inválidos. Por favor verifica la información' };
            } else if (error.message) {
                throw { message: error.message };
            } else {
                throw { message: 'Error al registrar usuario. Por favor, intenta más tarde.' };
            }
        }
    },

    logout: () => {
        tokenService.clearUserData();
        window.location.hash = 'login';
    },

    // Verificar si el usuario está autenticado
    isAuthenticated: () => {
        return tokenService.isAuthenticated();
    },

    // Obtener información del usuario actual
    getCurrentUser: () => {
        return tokenService.getUserData();
    }
};