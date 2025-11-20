import api from './api';

export const superAdminService = {
    // Estadísticas generales
    getEstadisticas: async () => {
        try {
            const response = await api.get('/super-admin/estadisticas');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar estadísticas');
        }
    },

    // Gestión de Usuarios
    getUsuarios: async () => {
        try {
            const response = await api.get('/super-admin/usuarios');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar usuarios');
        }
    },

    getClientes: async () => {
        try {
            const response = await api.get('/super-admin/clientes');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar clientes');
        }
    },

    getAdministradores: async () => {
        try {
            const response = await api.get('/super-admin/administradores');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar administradores');
        }
    },

    cambiarRol: async (userId, nuevoRol) => {
        try {
            const response = await api.put(`/super-admin/usuarios/${userId}/rol`, {
                nuevoRol
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cambiar rol');
        }
    },

    // Gestión de Administradores y Establecimientos
    crearAdministrador: async (data) => {
        try {
            const response = await api.post('/super-admin/administradores', {
                nombreCompleto: data.nombreCompleto,
                cedula: data.cedula,
                telefono: data.telefono,
                email: data.email,
                password: data.password,
                nombreEstablecimiento: data.nombreEstablecimiento,
                direccionEstablecimiento: data.direccionEstablecimiento
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 409) {
                throw new Error('El email o cédula ya están registrados');
            }
            throw new Error(error.response?.data?.mensaje || 'Error al crear administrador');
        }
    },

    actualizarAdministrador: async (adminId, data) => {
        try {
            const response = await api.put(`/super-admin/administradores/${adminId}`, data);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al actualizar administrador');
        }
    },

    cambiarEstadoAdmin: async (adminId, estado) => {
        try {
            const response = await api.put(
                `/super-admin/administradores/${adminId}/estado?estado=${estado}`
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cambiar estado');
        }
    },

    eliminarAdministrador: async (adminId) => {
        try {
            const response = await api.delete(`/super-admin/administradores/${adminId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al eliminar administrador');
        }
    }
};
