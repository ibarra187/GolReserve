const TOKEN_KEY = 'jwt_token';
const USER_KEY = 'user_data';

export const tokenService = {
    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },

    setToken: (token) => {
        localStorage.setItem(TOKEN_KEY, token);
    },

    removeToken: () => {
        localStorage.removeItem(TOKEN_KEY);
    },

    // Almacenar datos del usuario
    setUserData: (userData) => {
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
    },

    // Obtener datos del usuario
    getUserData: () => {
        try {
            const data = localStorage.getItem(USER_KEY);
            if (!data) return null;
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            return null;
        }
    },

    // Limpiar datos del usuario
    clearUserData: () => {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
    },

    // Verificar si el usuario está autenticado
    isAuthenticated: () => {
        return !!localStorage.getItem(TOKEN_KEY);
    }
};