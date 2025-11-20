import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import { adminService } from '../services/adminService'
import '../styles/AdminReservas.css'

export default function AdminReservas() {
  const [filtroEstado, setFiltroEstado] = useState(null) // null, 'CONFIRMADA', 'CANCELADA', 'COMPLETADA'
  const [busqueda, setBusqueda] = useState('')
  const [reservas, setReservas] = useState([])
  const [modalDetalles, setModalDetalles] = useState(false)
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    cargarReservas()
  }, [filtroEstado])

  const cargarReservas = async () => {
    try {
      setLoading(true)
      const data = await adminService.getReservas(filtroEstado)
      setReservas(data)
    } catch (error) {
      console.error('Error al cargar reservas:', error)
      alert('Error al cargar reservas: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const cambiarEstadoReserva = async (reservaId, nuevoEstado) => {
    try {
      if (nuevoEstado === 'CANCELADA') {
        await adminService.cancelarReserva(reservaId)
        alert('Reserva cancelada exitosamente')
        cargarReservas()
      }
    } catch (error) {
      alert('Error: ' + error.message)
    }
  }

  const reservasFiltradas = reservas.filter(reserva => {
    const cumpleBusqueda = 
      reserva.cliente?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      reserva.cancha?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      reserva.cliente?.email?.toLowerCase().includes(busqueda.toLowerCase())
    
    return cumpleBusqueda
  })

  const contarPorEstado = (estado) => {
    if (estado === null) return reservas.length
    return reservas.filter(r => r.estadoReserva === estado).length
  }

  if (loading) {
    return (
      <div className="admin-reservas-container">
        <Navbar />
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Cargando reservas...</p>
        </div>
      </div>
    )
  }

  const abrirDetalles = (reserva) => {
    setReservaSeleccionada(reserva)
    setModalDetalles(true)
  }

  const cerrarModal = () => {
    setModalDetalles(false)
    setReservaSeleccionada(null)
  }

  const handleCancelarReserva = async () => {
    if (!reservaSeleccionada) return
    if (!confirm('¿Estás seguro de cancelar esta reserva?')) return
    
    await cambiarEstadoReserva(reservaSeleccionada.idReserva, 'CANCELADA')
    cerrarModal()
  }

  return (
    <div className="admin-reservas-container">
      <Navbar />
      
      <main className="admin-reservas-main">
        <div className="admin-reservas-content">
          <div className="admin-reservas-header">
            <h1 className="admin-reservas-title">Gestión de Reservas</h1>
            <p className="admin-reservas-subtitle">Administra todas las reservas de tu establecimiento</p>
          </div>

          {/* Filtros de estado */}
          <div className="filtros-estado">
            <button 
              className={`filtro-btn ${filtroEstado === null ? 'active' : ''}`}
              onClick={() => setFiltroEstado(null)}
            >
              <span className="filtro-label">Todas</span>
              <span className="filtro-count">{contarPorEstado(null)}</span>
            </button>
            <button 
              className={`filtro-btn ${filtroEstado === 'CONFIRMADA' ? 'active' : ''}`}
              onClick={() => setFiltroEstado('CONFIRMADA')}
            >
              <span className="filtro-label">Activas</span>
              <span className="filtro-count">{contarPorEstado('CONFIRMADA')}</span>
            </button>
            <button 
              className={`filtro-btn ${filtroEstado === 'COMPLETADA' ? 'active' : ''}`}
              onClick={() => setFiltroEstado('COMPLETADA')}
            >
              <span className="filtro-label">Completadas</span>
              <span className="filtro-count">{contarPorEstado('COMPLETADA')}</span>
            </button>
            <button 
              className={`filtro-btn ${filtroEstado === 'CANCELADA' ? 'active' : ''}`}
              onClick={() => setFiltroEstado('CANCELADA')}
            >
              <span className="filtro-label">Canceladas</span>
              <span className="filtro-count">{contarPorEstado('CANCELADA')}</span>
            </button>
          </div>

          {/* Buscador */}
          <div className="search-bar">
            <svg className={`search-icon ${searchFocused || busqueda ? 'hidden' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por cliente, email o tipo de cancha..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="search-input"
            />
          </div>

          {/* Tabla de reservas */}
          <div className="reservas-table-container">
            <table className="reservas-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Contacto</th>
                  <th>Cancha</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Duración</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservasFiltradas.map((reserva) => (
                  <tr key={reserva.idReserva}>
                    <td>#{reserva.idReserva}</td>
                    <td className="cliente-cell">{reserva.cliente?.nombre || 'N/A'}</td>
                    <td>
                      <div className="contacto-info">
                        <small>{reserva.cliente?.email || '-'}</small>
                        <small>{reserva.cliente?.telefono || '-'}</small>
                      </div>
                    </td>
                    <td className="cancha-cell">{reserva.cancha?.nombre || 'N/A'}</td>
                    <td>{reserva.fecha ? new Date(reserva.fecha).toLocaleDateString('es-ES') : '-'}</td>
                    <td className="hora-cell">{reserva.horaInicio} - {reserva.horaFin}</td>
                    <td>{reserva.duracionMinutos ? `${reserva.duracionMinutos} min` : '-'}</td>
                    <td className="precio-cell">${reserva.precioTotal ? reserva.precioTotal.toLocaleString() : '0'}</td>
                    <td>
                      <span className={`estado-badge estado-${reserva.estadoReserva?.toLowerCase() || 'pendiente'}`}>
                        {reserva.estadoReserva || 'PENDIENTE'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn-detalles"
                        onClick={() => abrirDetalles(reserva)}
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {reservasFiltradas.length === 0 && (
              <div className="no-results">
                <p>No se encontraron reservas con los criterios seleccionados</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal de detalles */}
      {modalDetalles && reservaSeleccionada && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Detalles de la Reserva #{reservaSeleccionada.idReserva}</h2>
              <button className="modal-close" onClick={cerrarModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="detalle-section">
                <h3>Información del Cliente</h3>
                <div className="detalle-grid">
                  <div className="detalle-item">
                    <span className="detalle-label">Nombre:</span>
                    <span className="detalle-value">{reservaSeleccionada.cliente?.nombre || 'N/A'}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Email:</span>
                    <span className="detalle-value">{reservaSeleccionada.cliente?.email || '-'}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Teléfono:</span>
                    <span className="detalle-value">{reservaSeleccionada.cliente?.telefono || '-'}</span>
                  </div>
                </div>
              </div>

              <div className="detalle-section">
                <h3>Información de la Reserva</h3>
                <div className="detalle-grid">
                  <div className="detalle-item">
                    <span className="detalle-label">Cancha:</span>
                    <span className="detalle-value">{reservaSeleccionada.cancha?.nombre || 'N/A'}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Fecha:</span>
                    <span className="detalle-value">{reservaSeleccionada.fecha ? new Date(reservaSeleccionada.fecha).toLocaleDateString('es-ES') : '-'}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Horario:</span>
                    <span className="detalle-value">{reservaSeleccionada.horaInicio} - {reservaSeleccionada.horaFin}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Duración:</span>
                    <span className="detalle-value">{reservaSeleccionada.duracionMinutos} minutos</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Precio:</span>
                    <span className="detalle-value precio">${reservaSeleccionada.precioTotal ? reservaSeleccionada.precioTotal.toLocaleString() : '0'}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Estado:</span>
                    <span className={`estado-badge estado-${reservaSeleccionada.estadoReserva?.toLowerCase() || 'pendiente'}`}>
                      {reservaSeleccionada.estadoReserva || 'PENDIENTE'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {reservaSeleccionada.estadoReserva === 'CONFIRMADA' && (
                <button 
                  className="btn-accion btn-cancelar-reserva"
                  onClick={handleCancelarReserva}
                >
                  Cancelar Reserva
                </button>
              )}
              <button className="btn-accion btn-cerrar" onClick={cerrarModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
