import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import '../styles/AdminEstablecimientos.css'

export default function AdminEstablecimientos() {
  const [administradores, setAdministradores] = useState([])
  const [filtro, setFiltro] = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [adminSeleccionado, setAdminSeleccionado] = useState(null)
  const [accionModal, setAccionModal] = useState('') // 'editar' o 'eliminar'

  // Datos de ejemplo - reemplazar con llamada a API
  useEffect(() => {
    const adminsEjemplo = [
      { 
        id: 1, 
        nombre: 'Pedro Sánchez', 
        email: 'pedro@admin.com', 
        cedula: '9988776655', 
        telefono: '3009988776',
        establecimiento: 'Cancha Sintética Los Pinos',
        direccion: 'Calle 45 #23-10',
        ciudad: 'Cali',
        fechaRegistro: '2025-09-01',
        estado: 'ACTIVO'
      },
      { 
        id: 2, 
        nombre: 'Laura Rodríguez', 
        email: 'laura@admin.com', 
        cedula: '6677889900', 
        telefono: '3006677889',
        establecimiento: 'Complejo Deportivo El Estadio',
        direccion: 'Carrera 100 #15-25',
        ciudad: 'Cali',
        fechaRegistro: '2025-09-15',
        estado: 'ACTIVO'
      },
      { 
        id: 3, 
        nombre: 'Roberto Díaz', 
        email: 'roberto@admin.com', 
        cedula: '4455667788', 
        telefono: '3004455667',
        establecimiento: 'Canchas Sinteticas La Pradera',
        direccion: 'Avenida 3N #45-67',
        ciudad: 'Cali',
        fechaRegistro: '2025-10-01',
        estado: 'ACTIVO'
      },
    ]
    setAdministradores(adminsEjemplo)
  }, [])

  const abrirModalEditar = (admin) => {
    setAdminSeleccionado(admin)
    setAccionModal('editar')
    setModalAbierto(true)
  }

  const abrirModalEliminar = (admin) => {
    setAdminSeleccionado(admin)
    setAccionModal('eliminar')
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setAdminSeleccionado(null)
    setAccionModal('')
  }

  const confirmarAccion = () => {
    if (accionModal === 'eliminar') {
      // Aquí iría la llamada a la API para eliminar
      setAdministradores(administradores.filter(a => a.id !== adminSeleccionado.id))
    }
    // Para editar, se necesitaría un formulario más complejo
    cerrarModal()
  }

  const toggleEstado = (id) => {
    setAdministradores(administradores.map(a => 
      a.id === id ? { ...a, estado: a.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO' } : a
    ))
  }

  const administradoresFiltrados = administradores.filter(admin =>
    admin.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    admin.email.toLowerCase().includes(filtro.toLowerCase()) ||
    admin.establecimiento.toLowerCase().includes(filtro.toLowerCase()) ||
    admin.ciudad.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div className="admin-establecimientos-container">
      <Navbar />
      
      <main className="admin-establecimientos-main">
        <div className="admin-establecimientos-content">
          <div className="admin-header">
            <h1 className="admin-title">Gestión de Administradores y Establecimientos</h1>
            <p className="admin-subtitle">Panel de control de propietarios y canchas sintéticas</p>
          </div>

          <div className="admin-toolbar">
            <div className="search-box">
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por nombre, email, establecimiento o ciudad..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-label">Total Administradores:</span>
                <span className="stat-value">{administradores.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Activos:</span>
                <span className="stat-value stat-active">
                  {administradores.filter(a => a.estado === 'ACTIVO').length}
                </span>
              </div>
            </div>
          </div>

          <div className="table-container">
            <table className="establecimientos-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Administrador</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Establecimiento</th>
                  <th>Dirección</th>
                  <th>Ciudad</th>
                  <th>Estado</th>
                  <th>Fecha Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {administradoresFiltrados.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.id}</td>
                    <td className="nombre-cell">
                      <div className="admin-info">
                        <strong>{admin.nombre}</strong>
                        <small>CC: {admin.cedula}</small>
                      </div>
                    </td>
                    <td>{admin.email}</td>
                    <td>{admin.telefono}</td>
                    <td className="establecimiento-cell">
                      <strong>{admin.establecimiento}</strong>
                    </td>
                    <td>{admin.direccion}</td>
                    <td>{admin.ciudad}</td>
                    <td>
                      <button
                        className={`estado-toggle ${admin.estado.toLowerCase()}`}
                        onClick={() => toggleEstado(admin.id)}
                      >
                        {admin.estado}
                      </button>
                    </td>
                    <td>{new Date(admin.fechaRegistro).toLocaleDateString('es-ES')}</td>
                    <td>
                      <div className="acciones-cell">
                        <button 
                          className="btn-accion btn-editar"
                          onClick={() => abrirModalEditar(admin)}
                          title="Editar"
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          className="btn-accion btn-eliminar"
                          onClick={() => abrirModalEliminar(admin)}
                          title="Eliminar"
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {administradoresFiltrados.length === 0 && (
              <div className="no-results">
                <p>No se encontraron administradores con los criterios de búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal para confirmar acciones */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {accionModal === 'eliminar' ? '¿Eliminar Administrador?' : 'Editar Administrador'}
            </h2>
            <div className="modal-body">
              {accionModal === 'eliminar' ? (
                <>
                  <p className="modal-warning">Esta acción eliminará permanentemente:</p>
                  <div className="modal-info-box">
                    <p><strong>Administrador:</strong> {adminSeleccionado.nombre}</p>
                    <p><strong>Establecimiento:</strong> {adminSeleccionado.establecimiento}</p>
                    <p><strong>Email:</strong> {adminSeleccionado.email}</p>
                  </div>
                  <p className="modal-warning">¿Está seguro de continuar?</p>
                </>
              ) : (
                <div className="modal-info-box">
                  <p>Funcionalidad de edición en desarrollo</p>
                  <p><strong>Administrador:</strong> {adminSeleccionado.nombre}</p>
                  <p><strong>Establecimiento:</strong> {adminSeleccionado.establecimiento}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-cancelar" onClick={cerrarModal}>
                Cancelar
              </button>
              {accionModal === 'eliminar' && (
                <button className="btn-confirmar btn-danger" onClick={confirmarAccion}>
                  Eliminar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
