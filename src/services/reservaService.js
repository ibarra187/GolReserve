import api from './api';

export const reservaService = {
    getAllReservas: async () => {
        try {
            const response = await api.get('/reservas');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al obtener reservas' };
        }
    },

    createReserva: async (reservaData) => {
        try {
            const response = await api.post('/reservas/crear', reservaData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al crear la reserva' };
        }
    },

    updateReserva: async (id, reservaData) => {
        try {
            const response = await api.put(`/reservas/${id}`, reservaData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al actualizar la reserva' };
        }
    },

    deleteReserva: async (id) => {
        try {
            const response = await api.delete(`/reservas/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al eliminar la reserva' };
        }
    },

    getReservasByUsuario: async (idUsuario) => {
        try {
            const response = await api.get(`/reservas/usuario/${idUsuario}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al obtener las reservas del usuario' };
        }
    },

    cancelarReserva: async (idReserva) => {
        try {
            const response = await api.put(`/reservas/cancelar/${idReserva}`, {
                estadoReserva: 'CANCELADA'
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al cancelar la reserva' };
        }
    }
};