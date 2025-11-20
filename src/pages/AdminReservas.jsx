import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import '../styles/AdminReservas.css'

export default function AdminReservas() {
  const [filtroEstado, setFiltroEstado] = useState('todas') // todas, activas, pasadas, canceladas
  const [busqueda, setBusqueda] = useState('')
  const [reservas, setReservas] = useState([])
  const [modalDetalles, setModalDetalles] = useState(false)
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null)

  // Datos de ejemplo - reemplazar con API
  useEffect(() => {
    const reservasEjemplo = [
      { 
        id: 1, 
        cliente: 'Juan Pérez', 
        email: 'juan@email.com',
        telefono: '3001234567',
        cancha: 'Fútbol 5', 
        fecha: '2025-11-21', 
        hora: '15:00', 
        duracion: '1 hora',
        precio: 50000,
        estado: 'activa' 
      },
      { 
        id: 2, 
        cliente: 'María García', 
        email: 'maria@email.com',
        telefono: '3009876543',
        cancha: 'Fútbol 7', 
        fecha: '2025-11-22', 
        hora: '18:00', 
        duracion: '1.5 horas',
        precio: 70000,
        estado: 'activa' 
      },
      { 
        id: 3, 
        cliente: 'Carlos López', 
        email: 'carlos@email.com',
        telefono: '3001122334',
        cancha: 'Fútbol 11', 
        fecha: '2025-11-18', 
        hora: '20:00', 
        duracion: '2 horas',
        precio: 100000,
        estado: 'pasada' 
      },
      { 
        id: 4, 
        cliente: 'Ana Martínez', 
        email: 'ana@email.com',
        telefono: '3005544332',
        cancha: 'Fútbol 5', 
        fecha: '2025-11-19', 
        hora: '16:00', 
        duracion: '1 hora',
        precio: 50000,
        estado: 'cancelada' 
      },
      { 
        id: 5, 
        cliente: 'Luis Rodríguez', 
        email: 'luis@email.com',
        telefono: '3007788990',
        cancha: 'Fútbol 7', 
        fecha: '2025-11-23', 
        hora: '19:00', 
        duracion: '1 hora',
        precio: 70000,
        estado: 'activa' 
      },
    ]
    setReservas(reservasEjemplo)
  }, [])

  const reservasFiltradas = reservas.filter(reserva => {
    const cumpleFiltroEstado = filtroEstado === 'todas' || reserva.estado === filtroEstado
    const cumpleBusqueda = 
      reserva.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      reserva.cancha.toLowerCase().includes(busqueda.toLowerCase()) ||
      reserva.email.toLowerCase().includes(busqueda.toLowerCase())
    
    return cumpleFiltroEstado && cumpleBusqueda
  })

  const contarPorEstado = (estado) => {
    if (estado === 'todas') return reservas.length
    return reservas.filter(r => r.estado === estado).length
  }

  const abrirDetalles = (reserva) => {
    setReservaSeleccionada(reserva)
    setModalDetalles(true)
  }

  const cerrarModal = () => {
    setModalDetalles(false)
    setReservaSeleccionada(null)
  }

  const cambiarEstadoReserva = (nuevoEstado) => {
    setReservas(reservas.map(r => 
      r.id === reservaSeleccionada.id ? { ...r, estado: nuevoEstado } : r
    ))
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
              className={`filtro-btn ${filtroEstado === 'todas' ? 'active' : ''}`}
              onClick={() => setFiltroEstado('todas')}
            >
              <span className="filtro-label">Todas</span>
              <span className="filtro-count">{contarPorEstado('todas')}</span>
            </button>
            <button 
              className={`filtro-btn ${filtroEstado === 'activa' ? 'active' : ''}`}
              onClick={() => setFiltroEstado('activa')}
            >
              <span className="filtro-label">Activas</span>
              <span className="filtro-count">{contarPorEstado('activa')}</span>
            </button>
            <button 
              className={`filtro-btn ${filtroEstado === 'pasada' ? 'active' : ''}`}
              onClick={() => setFiltroEstado('pasada')}
            >
              <span className="filtro-label">Pasadas</span>
              <span className="filtro-count">{contarPorEstado('pasada')}</span>
            </button>
            <button 
              className={`filtro-btn ${filtroEstado === 'cancelada' ? 'active' : ''}`}
              onClick={() => setFiltroEstado('cancelada')}
            >
              <span className="filtro-label">Canceladas</span>
              <span className="filtro-count">{contarPorEstado('cancelada')}</span>
            </button>
          </div>

          {/* Buscador */}
          <div className="search-bar">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por cliente, email o tipo de cancha..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
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
                  <tr key={reserva.id}>
                    <td>#{reserva.id}</td>
                    <td className="cliente-cell">{reserva.cliente}</td>
                    <td>
                      <div className="contacto-info">
                        <small>{reserva.email}</small>
                        <small>{reserva.telefono}</small>
                      </div>
                    </td>
                    <td className="cancha-cell">{reserva.cancha}</td>
                    <td>{new Date(reserva.fecha).toLocaleDateString('es-ES')}</td>
                    <td className="hora-cell">{reserva.hora}</td>
                    <td>{reserva.duracion}</td>
                    <td className="precio-cell">${reserva.precio.toLocaleString()}</td>
                    <td>
                      <span className={`estado-badge estado-${reserva.estado}`}>
                        {reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}
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
              <h2 className="modal-title">Detalles de la Reserva #{reservaSeleccionada.id}</h2>
              <button className="modal-close" onClick={cerrarModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="detalle-section">
                <h3>Información del Cliente</h3>
                <div className="detalle-grid">
                  <div className="detalle-item">
                    <span className="detalle-label">Nombre:</span>
                    <span className="detalle-value">{reservaSeleccionada.cliente}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Email:</span>
                    <span className="detalle-value">{reservaSeleccionada.email}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Teléfono:</span>
                    <span className="detalle-value">{reservaSeleccionada.telefono}</span>
                  </div>
                </div>
              </div>

              <div className="detalle-section">
                <h3>Información de la Reserva</h3>
                <div className="detalle-grid">
                  <div className="detalle-item">
                    <span className="detalle-label">Cancha:</span>
                    <span className="detalle-value">{reservaSeleccionada.cancha}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Fecha:</span>
                    <span className="detalle-value">{new Date(reservaSeleccionada.fecha).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Hora:</span>
                    <span className="detalle-value">{reservaSeleccionada.hora}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Duración:</span>
                    <span className="detalle-value">{reservaSeleccionada.duracion}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Precio:</span>
                    <span className="detalle-value precio">${reservaSeleccionada.precio.toLocaleString()}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Estado:</span>
                    <span className={`estado-badge estado-${reservaSeleccionada.estado}`}>
                      {reservaSeleccionada.estado.charAt(0).toUpperCase() + reservaSeleccionada.estado.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {reservaSeleccionada.estado === 'activa' && (
                <button 
                  className="btn-accion btn-cancelar-reserva"
                  onClick={() => cambiarEstadoReserva('cancelada')}
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
