import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import '../styles/AdminUsuarios.css'

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [filtro, setFiltro] = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
  const [nuevoRol, setNuevoRol] = useState('')

  // Datos de ejemplo - reemplazar con llamada a API
  useEffect(() => {
    const usuariosEjemplo = [
      { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com', cedula: '1234567890', telefono: '3001234567', rol: 'CLIENTE', fechaRegistro: '2025-10-15' },
      { id: 2, nombre: 'María García', email: 'maria@email.com', cedula: '0987654321', telefono: '3009876543', rol: 'CLIENTE', fechaRegistro: '2025-10-20' },
      { id: 3, nombre: 'Carlos López', email: 'carlos@email.com', cedula: '1122334455', telefono: '3001122334', rol: 'CLIENTE', fechaRegistro: '2025-11-01' },
      { id: 4, nombre: 'Ana Martínez', email: 'ana@email.com', cedula: '5544332211', telefono: '3005544332', rol: 'CLIENTE', fechaRegistro: '2025-11-10' },
    ]
    setUsuarios(usuariosEjemplo)
  }, [])

  const abrirModalCambioRol = (usuario) => {
    setUsuarioSeleccionado(usuario)
    setNuevoRol(usuario.rol)
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setUsuarioSeleccionado(null)
    setNuevoRol('')
  }

  const cambiarRol = () => {
    // Aquí iría la llamada a la API para cambiar el rol
    setUsuarios(usuarios.map(u => 
      u.id === usuarioSeleccionado.id ? { ...u, rol: nuevoRol } : u
    ))
    cerrarModal()
  }

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    usuario.email.toLowerCase().includes(filtro.toLowerCase()) ||
    usuario.cedula.includes(filtro)
  )

  return (
    <div className="admin-usuarios-container">
      <Navbar />
      
      <main className="admin-usuarios-main">
        <div className="admin-usuarios-content">
          <div className="admin-header">
            <h1 className="admin-title">Gestión de Usuarios</h1>
            <p className="admin-subtitle">Panel de administración de clientes registrados</p>
          </div>

          <div className="admin-toolbar">
            <div className="search-box">
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por nombre, email o cédula..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="stats-box">
              <span className="stat-label">Total Usuarios:</span>
              <span className="stat-value">{usuarios.length}</span>
            </div>
          </div>

          <div className="table-container">
            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Completo</th>
                  <th>Email</th>
                  <th>Cédula</th>
                  <th>Teléfono</th>
                  <th>Rol</th>
                  <th>Fecha Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td className="nombre-cell">{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.cedula}</td>
                    <td>{usuario.telefono}</td>
                    <td>
                      <span className={`rol-badge rol-${usuario.rol.toLowerCase()}`}>
                        {usuario.rol}
                      </span>
                    </td>
                    <td>{new Date(usuario.fechaRegistro).toLocaleDateString('es-ES')}</td>
                    <td>
                      <button 
                        className="btn-cambiar-rol"
                        onClick={() => abrirModalCambioRol(usuario)}
                      >
                        Cambiar Rol
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {usuariosFiltrados.length === 0 && (
              <div className="no-results">
                <p>No se encontraron usuarios con los criterios de búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal para cambiar rol */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Cambiar Rol de Usuario</h2>
            <div className="modal-body">
              <p className="modal-usuario-info">
                <strong>Usuario:</strong> {usuarioSeleccionado.nombre}
              </p>
              <p className="modal-usuario-info">
                <strong>Email:</strong> {usuarioSeleccionado.email}
              </p>
              
              <div className="form-group">
                <label htmlFor="rol-select">Nuevo Rol:</label>
                <select
                  id="rol-select"
                  value={nuevoRol}
                  onChange={(e) => setNuevoRol(e.target.value)}
                  className="rol-select"
                >
                  <option value="CLIENTE">CLIENTE</option>
                  <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                  <option value="SUPER_ADMINISTRADOR">SUPER_ADMINISTRADOR</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancelar" onClick={cerrarModal}>
                Cancelar
              </button>
              <button className="btn-confirmar" onClick={cambiarRol}>
                Confirmar Cambio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
