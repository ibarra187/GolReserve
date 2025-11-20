import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MisReservas.css';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { reservaService } from '../services/reservaService';
import { tokenService } from '../services/tokenService';

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todas'); // todas, activas, pasadas, canceladas
  const { toasts, removeToast, success, error, info } = useToast();

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      setLoading(true);
      const userData = tokenService.getUserData();
      
      if (!userData) {
        window.location.hash = 'login';
        return;
      }

      const todasReservas = await reservaService.getReservasByUsuario(userData.id); // Usar 'id' no 'idUsuario'
      setReservas(todasReservas);
    } catch (err) {
      error('Error al cargar las reservas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelarReserva = async (idReserva) => {
    if (!window.confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      return;
    }

    try {
      await reservaService.cancelarReserva(idReserva);
      success('Reserva cancelada exitosamente');
      cargarReservas(); // Recargar la lista
    } catch (err) {
      error('Error al cancelar la reserva');
      console.error(err);
    }
  };

  const reservasFiltradas = reservas.filter(reserva => {
    const hoy = new Date();
    const fechaReserva = new Date(reserva.fechaReserva);
    
    switch(filter) {
      case 'activas':
        return fechaReserva >= hoy && reserva.estadoReserva === 'CONFIRMADA';
      case 'pasadas':
        return fechaReserva < hoy;
      case 'canceladas':
        return reserva.estadoReserva === 'CANCELADA';
      default:
        return true;
    }
  });

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEstadoBadge = (estado) => {
    const estados = {
      'CONFIRMADA': { class: 'confirmada', text: 'Confirmada' },
      'CANCELADA': { class: 'cancelada', text: 'Cancelada' },
      'COMPLETADA': { class: 'completada', text: 'Completada' }
    };
    return estados[estado] || { class: '', text: estado };
  };

  return (
    <div className="mis-reservas-container">
      <Navbar currentPage="profile" />

      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      <main className="mis-reservas-main">
        <div className="mis-reservas-content">
          <div className="mis-reservas-header">
            <h1>Mis Reservas</h1>
            <button className="btn-nueva-reserva" onClick={() => window.location.hash = 'reservas'}>
              + Nueva Reserva
            </button>
          </div>

          {/* Filtros */}
          <div className="filtros-container">
            <button 
              className={`filtro-btn ${filter === 'todas' ? 'active' : ''}`}
              onClick={() => setFilter('todas')}
            >
              Todas
            </button>
            <button 
              className={`filtro-btn ${filter === 'activas' ? 'active' : ''}`}
              onClick={() => setFilter('activas')}
            >
              Activas
            </button>
            <button 
              className={`filtro-btn ${filter === 'pasadas' ? 'active' : ''}`}
              onClick={() => setFilter('pasadas')}
            >
              Pasadas
            </button>
            <button 
              className={`filtro-btn ${filter === 'canceladas' ? 'active' : ''}`}
              onClick={() => setFilter('canceladas')}
            >
              Canceladas
            </button>
          </div>

          {/* Lista de Reservas */}
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Cargando reservas...</p>
            </div>
          ) : reservasFiltradas.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h3>No tienes reservas</h3>
              <p>Comienza reservando una cancha para jugar con tus amigos</p>
              <button className="btn-reservar" onClick={() => window.location.hash = 'reservas'}>
                Reservar Cancha
              </button>
            </div>
          ) : (
            <div className="reservas-grid">
              {reservasFiltradas.map(reserva => {
                const estadoBadge = getEstadoBadge(reserva.estadoReserva);
                const fechaReserva = new Date(reserva.fechaReserva);
                const hoy = new Date();
                const puedeCancel = fechaReserva >= hoy && reserva.estadoReserva === 'CONFIRMADA';

                return (
                  <div key={reserva.idReserva} className="reserva-card">
                    <div className="reserva-header">
                      <span className={`estado-badge ${estadoBadge.class}`}>
                        {estadoBadge.text}
                      </span>
                      <span className="reserva-id">#{reserva.idReserva}</span>
                    </div>

                    <div className="reserva-body">
                      <div className="reserva-info">
                        <div className="info-item">
                          <span className="info-icon">🏟️</span>
                          <div>
                            <p className="info-label">Cancha</p>
                            <p className="info-value">{reserva.cancha?.nombreCancha || 'Cancha'}</p>
                          </div>
                        </div>

                        <div className="info-item">
                          <span className="info-icon">📅</span>
                          <div>
                            <p className="info-label">Fecha</p>
                            <p className="info-value">{formatearFecha(reserva.fechaReserva)}</p>
                          </div>
                        </div>

                        <div className="info-item">
                          <span className="info-icon">⏰</span>
                          <div>
                            <p className="info-label">Horario</p>
                            <p className="info-value">{reserva.horaInicio} - {reserva.horaFin}</p>
                          </div>
                        </div>

                        <div className="info-item">
                          <span className="info-icon">💰</span>
                          <div>
                            <p className="info-label">Total</p>
                            <p className="info-value precio">${reserva.valorTotal?.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {puedeCancel && (
                      <div className="reserva-footer">
                        <button 
                          className="btn-cancelar"
                          onClick={() => cancelarReserva(reserva.idReserva)}
                        >
                          Cancelar Reserva
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
