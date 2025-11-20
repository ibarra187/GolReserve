import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { adminService } from '../services/adminService'
import '../styles/DashboardAdmin.css'

export default function DashboardAdmin() {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarDashboard()
  }, [])

  const cargarDashboard = async () => {
    try {
      const data = await adminService.getDashboard()
      setDashboard(data)
    } catch (error) {
      console.error('Error al cargar dashboard:', error)
      // Mantener valores por defecto en caso de error
      setDashboard({
        establecimiento: { nombre: 'Mi Establecimiento', direccion: '', ciudad: '' },
        reservasHoy: 0,
        reservasMes: 0,
        ingresosMes: 0,
        canchasActivas: 0,
        clientesRecurrentes: 0,
        promedioOcupacion: 0,
        totalCanchas: 0
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-admin-container">
        <Navbar />
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  const establecimiento = dashboard?.establecimiento || { nombre: 'Mi Establecimiento', direccion: '', ciudad: '' }
  const estadisticas = {
    reservasHoy: dashboard?.reservasHoy || 0,
    reservasMes: dashboard?.reservasMes || 0,
    ingresosMes: dashboard?.ingresosMes || 0,
    canchasActivas: dashboard?.totalCanchas || 0,
    clientesRecurrentes: dashboard?.clientesRecurrentes || 0,
    promedioOcupacion: dashboard?.promedioOcupacion || 0
  }

  return (
    <div className="dashboard-admin-container">
      <Navbar />
      
      <main className="dashboard-admin-main">
        <div className="dashboard-admin-content">
          {/* Header con info del establecimiento */}
          <div className="establecimiento-header">
            <div className="establecimiento-info">
              <h1 className="establecimiento-nombre">{establecimiento.nombre}</h1>
              <p className="establecimiento-direccion">
                📍 {establecimiento.direccion}, {establecimiento.ciudad}
              </p>
            </div>
            <div className="fecha-actual">
              <span className="fecha-label">Hoy</span>
              <span className="fecha-value">
                {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>

          {/* Grid de estadísticas */}
          <div className="estadisticas-grid">
            <div className="stat-card card-hoy">
              <div className="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">{estadisticas.reservasHoy}</span>
                <span className="stat-label">Reservas Hoy</span>
              </div>
            </div>

            <div className="stat-card card-mes">
              <div className="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">{estadisticas.reservasMes}</span>
                <span className="stat-label">Reservas del Mes</span>
              </div>
            </div>

            <div className="stat-card card-ingresos">
              <div className="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">${(estadisticas.ingresosMes / 1000000).toFixed(1)}M</span>
                <span className="stat-label">Ingresos del Mes</span>
              </div>
            </div>

            <div className="stat-card card-ocupacion">
              <div className="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="stat-info">
                <span className="stat-value">{estadisticas.promedioOcupacion}%</span>
                <span className="stat-label">Ocupación Promedio</span>
              </div>
            </div>
          </div>

          {/* Grid de acciones principales */}
          <div className="acciones-grid">
            <a href="#admin-reservas" className="accion-card card-reservas">
              <div className="accion-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="48" height="48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="accion-content">
                <h3 className="accion-title">Gestión de Reservas</h3>
                <p className="accion-description">
                  Administra todas las reservas: activas, pasadas y canceladas
                </p>
                <div className="accion-stats">
                  <div className="mini-stat">
                    <span className="mini-stat-value">15</span>
                    <span className="mini-stat-label">Activas</span>
                  </div>
                  <div className="mini-stat">
                    <span className="mini-stat-value">3</span>
                    <span className="mini-stat-label">Pendientes</span>
                  </div>
                </div>
              </div>
              <div className="accion-arrow">→</div>
            </a>

            <a href="#admin-canchas" className="accion-card card-canchas">
              <div className="accion-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="48" height="48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="accion-content">
                <h3 className="accion-title">Mis Canchas</h3>
                <p className="accion-description">
                  Gestiona tus canchas y asigna reservas a cada una
                </p>
                <div className="accion-stats">
                  <div className="mini-stat">
                    <span className="mini-stat-value">{estadisticas.canchasActivas}</span>
                    <span className="mini-stat-label">Canchas Activas</span>
                  </div>
                </div>
              </div>
              <div className="accion-arrow">→</div>
            </a>

            <div className="accion-card card-estadisticas-detalladas">
              <div className="accion-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="48" height="48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="accion-content">
                <h3 className="accion-title">Estadísticas Detalladas</h3>
                <p className="accion-description">
                  Visualiza reportes y métricas de rendimiento
                </p>
                <div className="accion-stats">
                  <div className="mini-stat">
                    <span className="mini-stat-value">{estadisticas.clientesRecurrentes}</span>
                    <span className="mini-stat-label">Clientes Recurrentes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
