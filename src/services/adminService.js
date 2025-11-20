import api from './api';

export const adminService = {
    // Dashboard
    getDashboard: async () => {
        try {
            const response = await api.get('/admin/dashboard');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar dashboard');
        }
    },

    // Gestión de Establecimiento
    getEstablecimiento: async () => {
        try {
            const response = await api.get('/admin/establecimiento');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar establecimiento');
        }
    },

    actualizarEstablecimiento: async (data) => {
        try {
            const response = await api.put('/admin/establecimiento', data);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al actualizar establecimiento');
        }
    },

    // Gestión de Canchas
    getCanchas: async () => {
        try {
            const response = await api.get('/admin/canchas');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar canchas');
        }
    },

    getCancha: async (canchaId) => {
        try {
            const response = await api.get(`/admin/canchas/${canchaId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar cancha');
        }
    },

    crearCancha: async (data) => {
        try {
            const response = await api.post('/admin/canchas', data);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al crear cancha');
        }
    },

    actualizarCancha: async (canchaId, data) => {
        try {
            const response = await api.put(`/admin/canchas/${canchaId}`, data);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al actualizar cancha');
        }
    },

    cambiarEstadoCancha: async (canchaId, estado) => {
        try {
            const response = await api.put(
                `/admin/canchas/${canchaId}/estado?estado=${estado}`
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cambiar estado');
        }
    },

    eliminarCancha: async (canchaId) => {
        try {
            const response = await api.delete(`/admin/canchas/${canchaId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al eliminar cancha');
        }
    },

    // Gestión de Reservas
    getReservas: async (estado = null) => {
        try {
            const url = estado 
                ? `/admin/reservas?estado=${estado}`
                : '/admin/reservas';
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar reservas');
        }
    },

    getReservaDetalle: async (reservaId) => {
        try {
            const response = await api.get(`/admin/reservas/${reservaId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar detalle de reserva');
        }
    },

    cancelarReserva: async (reservaId) => {
        try {
            const response = await api.put(`/admin/reservas/${reservaId}/cancelar`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cancelar reserva');
        }
    }
};
