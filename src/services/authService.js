import api from './api';
import { tokenService } from './tokenService';

export const authService = {
    login: async (email, password) => {
        try {
            const response = await api.post('/usuarios/login', { email, password });
            
            // Guardar los datos del usuario y el token JWT
            if (response.data) {
                const userData = {
                    id: response.data.idUsuario,
                    email: response.data.email,
                    nombre: response.data.nombre,
                    rol: response.data.rolUsuario, // Backend usa 'rolUsuario'
                    estado: response.data.estadoUsuario // Backend usa 'estadoUsuario'
                };
                
                // Guardar token JWT
                if (response.data.token) {
                    tokenService.setToken(response.data.token);
                }
                
                // Guardar datos del usuario
                tokenService.setUserData(userData);
                
                // Redirigir según el rol
                authService.redirectByRole(userData.rol);
                
                return response.data;
            }
        } catch (error) {
            console.error('Error en login:', error);
            // Manejar errores de forma clara
            if (error.response?.status === 401) {
                throw new Error('Correo o contraseña incorrectos');
            }
            if (error.response?.status === 400) {
                throw new Error(error.response.data || 'Datos inválidos');
            }
            if (error.message) {
                throw new Error(error.message);
            }
            throw new Error('Error al iniciar sesión. Intenta nuevamente.');
        }
    },

    // Redirigir según el rol del usuario
    redirectByRole: (rol) => {
        switch(rol) {
            case 'SUPER_ADMINISTRADOR':
                window.location.hash = '#dashboard-super-admin';
                break;
            case 'ADMINISTRADOR':
                window.location.hash = '#dashboard-admin';
                break;
            case 'CLIENTE':
            default:
                window.location.hash = '#home';
                break;
        }
    },

    register: async (userData) => {
        try {
            console.log('Datos de registro recibidos en authService:', userData);
            
            // Formato exacto esperado por el backend
            const formattedData = {
                nombre: userData.nombre.trim(),
                cedula: userData.cedula.replace(/\s/g, ''),
                telefono: userData.telefono.replace(/\s/g, ''),
                email: userData.email.trim().toLowerCase(),
                password: userData.password
            };
            
            console.log('Datos formateados para enviar al servidor:', formattedData);
            
            const response = await api.post('/usuarios/registrar', formattedData);
            console.log('Respuesta exitosa del servidor:', response.data);
            
            if (response.data) {
                console.log('Registro exitoso - Usuario:', response.data);
                return {
                    success: true,
                    message: 'Usuario registrado exitosamente',
                    usuario: response.data
                };
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            
            // Manejo específico de errores del backend
            if (error.response?.status === 400) {
                const errorMsg = error.response.data || 'Datos inválidos';
                throw { message: errorMsg };
            } else if (error.response?.status === 409) {
                throw { message: 'El correo o cédula ya están registrados' };
            } else if (error.response?.data) {
                throw { message: error.response.data };
            } else if (error.message) {
                throw { message: error.message };
            } else {
                throw { message: 'Error al registrar usuario. Por favor, intenta más tarde.' };
            }
        }
    },

    logout: () => {
        tokenService.clearUserData();
        window.location.hash = '#login';
    },

    // Verificar si el usuario está autenticado
    isAuthenticated: () => {
        return tokenService.isAuthenticated();
    },

    // Obtener información del usuario actual
    getCurrentUser: () => {
        return tokenService.getUserData();
    },

    // Verificar si el usuario tiene un rol específico
    hasRole: (rol) => {
        const user = tokenService.getUserData();
        return user && user.rol === rol;
    },

    // Verificar si el usuario puede acceder a una ruta
    canAccessRoute: (route) => {
        const user = tokenService.getUserData();
        if (!user) return false;

        // Rutas de SUPER_ADMINISTRADOR
        const superAdminRoutes = ['dashboard-super-admin', 'admin-usuarios', 'admin-establecimientos', 'estadisticas'];
        if (superAdminRoutes.some(r => route.includes(r))) {
            return user.rol === 'SUPER_ADMINISTRADOR';
        }

        // Rutas de ADMINISTRADOR
        const adminRoutes = ['dashboard-admin', 'admin-reservas', 'admin-canchas'];
        if (adminRoutes.some(r => route.includes(r))) {
            return user.rol === 'ADMINISTRADOR';
        }

        // Rutas de CLIENTE (por defecto accesibles)
        return true;
    }
};