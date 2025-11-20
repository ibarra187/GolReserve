import api from './api';

export const clienteService = {
    // Gestión de Perfil
    getPerfil: async () => {
        try {
            const response = await api.get('/cliente/perfil');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar perfil');
        }
    },

    actualizarPerfil: async (data) => {
        try {
            const response = await api.put('/cliente/perfil', data);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al actualizar perfil');
        }
    },

    // Explorar Establecimientos y Canchas
    getEstablecimientos: async () => {
        try {
            const response = await api.get('/cliente/establecimientos');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar establecimientos');
        }
    },

    getCanchas: async () => {
        try {
            const response = await api.get('/cliente/canchas');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar canchas');
        }
    },

    getCanchaDetalle: async (canchaId) => {
        try {
            const response = await api.get(`/cliente/canchas/${canchaId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar detalle de cancha');
        }
    },

    // Horarios Disponibles
    getHorariosDisponibles: async (canchaId, fecha) => {
        try {
            const response = await api.get(
                `/cliente/canchas/${canchaId}/horarios?fecha=${fecha}`
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar horarios');
        }
    },

    // Gestión de Reservas
    getMisReservas: async () => {
        try {
            const response = await api.get('/cliente/reservas');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar mis reservas');
        }
    },

    getReservaDetalle: async (reservaId) => {
        try {
            const response = await api.get(`/cliente/reservas/${reservaId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cargar detalle de reserva');
        }
    },

    crearReserva: async (data) => {
        try {
            const response = await api.post('/cliente/reservas', {
                cancha: { id: data.canchaId },
                fecha: data.fecha,
                horaInicio: data.horaInicio,
                horaFin: data.horaFin
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 409) {
                throw new Error('Ya tienes una reserva en ese horario');
            }
            throw new Error(error.response?.data?.mensaje || 'Error al crear reserva');
        }
    },

    cancelarReserva: async (reservaId) => {
        try {
            const response = await api.put(`/cliente/reservas/${reservaId}/cancelar`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.mensaje || 'Error al cancelar reserva');
        }
    }
};
