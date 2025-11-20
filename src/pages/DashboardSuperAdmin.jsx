import React from 'react'
import Navbar from '../components/navbar'
import '../styles/DashboardSuperAdmin.css'

export default function DashboardSuperAdmin() {
  return (
    <div className="dashboard-super-admin-container">
      <Navbar />
      
      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Panel de Super Administrador</h1>
            <p className="dashboard-subtitle">Gestión completa del sistema GolReserve</p>
          </div>

          <div className="dashboard-grid">
            {/* Card de Usuarios */}
            <a href="#admin-usuarios" className="dashboard-card card-usuarios">
              <div className="card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="48" height="48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="card-content">
                <h2 className="card-title">Gestión de Usuarios</h2>
                <p className="card-description">
                  Administra todos los clientes registrados en la plataforma. 
                  Cambia roles, visualiza información y gestiona permisos.
                </p>
                <div className="card-stats">
                  <div className="stat">
                    <span className="stat-number">45</span>
                    <span className="stat-label">Usuarios Activos</span>
                  </div>
                </div>
              </div>
              <div className="card-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            {/* Card de Administradores */}
            <a href="#admin-establecimientos" className="dashboard-card card-administradores">
              <div className="card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="48" height="48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="card-content">
                <h2 className="card-title">Administradores y Establecimientos</h2>
                <p className="card-description">
                  Controla los propietarios de canchas sintéticas y sus establecimientos. 
                  Gestiona permisos y supervisa operaciones.
                </p>
                <div className="card-stats">
                  <div className="stat">
                    <span className="stat-number">12</span>
                    <span className="stat-label">Establecimientos</span>
                  </div>
                </div>
              </div>
              <div className="card-arrow">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            {/* Card de Estadísticas */}
            <div className="dashboard-card card-estadisticas">
              <div className="card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="48" height="48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="card-content">
                <h2 className="card-title">Estadísticas del Sistema</h2>
                <p className="card-description">
                  Visualiza métricas y estadísticas generales del sistema
                </p>
                <div className="stats-grid">
                  <div className="stat-mini">
                    <span className="stat-mini-value">287</span>
                    <span className="stat-mini-label">Reservas Totales</span>
                  </div>
                  <div className="stat-mini">
                    <span className="stat-mini-value">$2.5M</span>
                    <span className="stat-mini-label">Ingresos Mes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Configuración */}
            <div className="dashboard-card card-configuracion">
              <div className="card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="48" height="48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="card-content">
                <h2 className="card-title">Configuración del Sistema</h2>
                <p className="card-description">
                  Ajusta parámetros generales, permisos y configuraciones avanzadas
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
