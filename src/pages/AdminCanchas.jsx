import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import '../styles/AdminCanchas.css'

export default function AdminCanchas() {
  const [canchas, setCanchas] = useState([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [modalAsignacion, setModalAsignacion] = useState(false)
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null)
  const [accionModal, setAccionModal] = useState('') // 'crear', 'editar', 'eliminar'
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'Fútbol 5',
    precioHora: '',
    estado: 'disponible',
    caracteristicas: ''
  })

  // Datos de ejemplo - reemplazar con API
  useEffect(() => {
    const canchasEjemplo = [
      { 
        id: 1, 
        nombre: 'Cancha 1', 
        tipo: 'Fútbol 5',
        precioHora: 50000,
        estado: 'disponible',
        caracteristicas: 'Césped sintético de alta calidad, iluminación LED',
        reservasHoy: 5,
        ocupacion: 62
      },
      { 
        id: 2, 
        nombre: 'Cancha 2', 
        tipo: 'Fútbol 7',
        precioHora: 70000,
        estado: 'disponible',
        caracteristicas: 'Césped sintético premium, vestuarios',
        reservasHoy: 6,
        ocupacion: 75
      },
      { 
        id: 3, 
        nombre: 'Cancha Principal', 
        tipo: 'Fútbol 11',
        precioHora: 100000,
        estado: 'disponible',
        caracteristicas: 'Cancha reglamentaria, graderías, marcador electrónico',
        reservasHoy: 4,
        ocupacion: 80
      },
      { 
        id: 4, 
        nombre: 'Cancha 3', 
        tipo: 'Fútbol 5',
        precioHora: 50000,
        estado: 'mantenimiento',
        caracteristicas: 'Césped sintético, iluminación',
        reservasHoy: 0,
        ocupacion: 0
      },
    ]
    setCanchas(canchasEjemplo)
  }, [])

  const abrirModalCrear = () => {
    setFormData({
      nombre: '',
      tipo: 'Fútbol 5',
      precioHora: '',
      estado: 'disponible',
      caracteristicas: ''
    })
    setAccionModal('crear')
    setModalAbierto(true)
  }

  const abrirModalEditar = (cancha) => {
    setCanchaSeleccionada(cancha)
    setFormData({
      nombre: cancha.nombre,
      tipo: cancha.tipo,
      precioHora: cancha.precioHora.toString(),
      estado: cancha.estado,
      caracteristicas: cancha.caracteristicas
    })
    setAccionModal('editar')
    setModalAbierto(true)
  }

  const abrirModalEliminar = (cancha) => {
    setCanchaSeleccionada(cancha)
    setAccionModal('eliminar')
    setModalAbierto(true)
  }

  const abrirModalAsignacion = (cancha) => {
    setCanchaSeleccionada(cancha)
    setModalAsignacion(true)
  }

  const cerrarModales = () => {
    setModalAbierto(false)
    setModalAsignacion(false)
    setCanchaSeleccionada(null)
    setAccionModal('')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (accionModal === 'crear') {
      const nuevaCancha = {
        id: canchas.length + 1,
        nombre: formData.nombre,
        tipo: formData.tipo,
        precioHora: parseInt(formData.precioHora),
        estado: formData.estado,
        caracteristicas: formData.caracteristicas,
        reservasHoy: 0,
        ocupacion: 0
      }
      setCanchas([...canchas, nuevaCancha])
    } else if (accionModal === 'editar') {
      setCanchas(canchas.map(c => 
        c.id === canchaSeleccionada.id 
          ? { ...c, ...formData, precioHora: parseInt(formData.precioHora) }
          : c
      ))
    }
    
    cerrarModales()
  }

  const eliminarCancha = () => {
    setCanchas(canchas.filter(c => c.id !== canchaSeleccionada.id))
    cerrarModales()
  }

  const toggleEstado = (id) => {
    setCanchas(canchas.map(c => 
      c.id === id 
        ? { ...c, estado: c.estado === 'disponible' ? 'mantenimiento' : 'disponible' }
        : c
    ))
  }

  return (
    <div className="admin-canchas-container">
      <Navbar />
      
      <main className="admin-canchas-main">
        <div className="admin-canchas-content">
          <div className="admin-canchas-header">
            <div>
              <h1 className="admin-canchas-title">Mis Canchas</h1>
              <p className="admin-canchas-subtitle">Gestiona las canchas de tu establecimiento</p>
            </div>
            <button className="btn-crear-cancha" onClick={abrirModalCrear}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nueva Cancha
            </button>
          </div>

          {/* Grid de canchas */}
          <div className="canchas-grid">
            {canchas.map((cancha) => (
              <div key={cancha.id} className={`cancha-card ${cancha.estado}`}>
                <div className="cancha-card-header">
                  <div className="cancha-tipo-badge">{cancha.tipo}</div>
                  <button 
                    className={`estado-toggle ${cancha.estado}`}
                    onClick={() => toggleEstado(cancha.id)}
                  >
                    {cancha.estado === 'disponible' ? 'Disponible' : 'Mantenimiento'}
                  </button>
                </div>

                <h3 className="cancha-nombre">{cancha.nombre}</h3>
                
                <div className="cancha-precio">
                  <span className="precio-label">Precio por hora:</span>
                  <span className="precio-value">${cancha.precioHora.toLocaleString()}</span>
                </div>

                <div className="cancha-stats">
                  <div className="stat-item">
                    <span className="stat-icon">📅</span>
                    <div className="stat-info">
                      <span className="stat-value">{cancha.reservasHoy}</span>
                      <span className="stat-label">Reservas hoy</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">📊</span>
                    <div className="stat-info">
                      <span className="stat-value">{cancha.ocupacion}%</span>
                      <span className="stat-label">Ocupación</span>
                    </div>
                  </div>
                </div>

                <div className="cancha-caracteristicas">
                  <p>{cancha.caracteristicas}</p>
                </div>

                <div className="cancha-actions">
                  <button 
                    className="btn-action btn-asignar"
                    onClick={() => abrirModalAsignacion(cancha)}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Ver Horarios
                  </button>
                  <button 
                    className="btn-action btn-editar"
                    onClick={() => abrirModalEditar(cancha)}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar
                  </button>
                  <button 
                    className="btn-action btn-eliminar"
                    onClick={() => abrirModalEliminar(cancha)}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {canchas.length === 0 && (
            <div className="no-canchas">
              <p>No tienes canchas registradas. Crea tu primera cancha para comenzar.</p>
              <button className="btn-crear-primera" onClick={abrirModalCrear}>
                Crear Primera Cancha
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modal Crear/Editar/Eliminar */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={cerrarModales}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {accionModal === 'crear' && 'Crear Nueva Cancha'}
                {accionModal === 'editar' && 'Editar Cancha'}
                {accionModal === 'eliminar' && '¿Eliminar Cancha?'}
              </h2>
              <button className="modal-close" onClick={cerrarModales}>×</button>
            </div>

            {accionModal === 'eliminar' ? (
              <>
                <div className="modal-body">
                  <p className="modal-warning">¿Estás seguro de que deseas eliminar esta cancha?</p>
                  <div className="modal-info-box">
                    <p><strong>Nombre:</strong> {canchaSeleccionada.nombre}</p>
                    <p><strong>Tipo:</strong> {canchaSeleccionada.tipo}</p>
                  </div>
                  <p className="modal-warning-text">Esta acción no se puede deshacer.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn-cancelar" onClick={cerrarModales}>Cancelar</button>
                  <button className="btn-confirmar btn-danger" onClick={eliminarCancha}>Eliminar</button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre de la Cancha *</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Ej: Cancha 1, Cancha Principal"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="tipo">Tipo de Cancha *</label>
                    <select
                      id="tipo"
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Fútbol 5">Fútbol 5</option>
                      <option value="Fútbol 7">Fútbol 7</option>
                      <option value="Fútbol 11">Fútbol 11</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="precioHora">Precio por Hora *</label>
                    <input
                      type="number"
                      id="precioHora"
                      name="precioHora"
                      value={formData.precioHora}
                      onChange={handleInputChange}
                      placeholder="50000"
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="estado">Estado *</label>
                    <select
                      id="estado"
                      name="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="disponible">Disponible</option>
                      <option value="mantenimiento">Mantenimiento</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="caracteristicas">Características</label>
                    <textarea
                      id="caracteristicas"
                      name="caracteristicas"
                      value={formData.caracteristicas}
                      onChange={handleInputChange}
                      placeholder="Ej: Césped sintético de alta calidad, iluminación LED, vestuarios"
                      rows="3"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn-cancelar" onClick={cerrarModales}>Cancelar</button>
                  <button type="submit" className="btn-confirmar">
                    {accionModal === 'crear' ? 'Crear Cancha' : 'Guardar Cambios'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal de Asignación de Horarios */}
      {modalAsignacion && canchaSeleccionada && (
        <div className="modal-overlay" onClick={cerrarModales}>
          <div className="modal-content modal-asignacion" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Horarios - {canchaSeleccionada.nombre}</h2>
              <button className="modal-close" onClick={cerrarModales}>×</button>
            </div>
            <div className="modal-body">
              <p className="info-text">Aquí se mostrarían los horarios disponibles y reservados de esta cancha.</p>
              <p className="info-text">Funcionalidad en desarrollo para asignar reservas manualmente.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancelar" onClick={cerrarModales}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
