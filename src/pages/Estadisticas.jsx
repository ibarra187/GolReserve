import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import { superAdminService } from '../services/superAdminService'
import '../styles/Estadisticas.css'

export default function Estadisticas() {
  const [estadisticas, setEstadisticas] = useState({
    totalUsuarios: 0,
    totalClientes: 0,
    totalAdministradores: 0,
    totalEstablecimientos: 0,
    totalCanchas: 0,
    totalReservas: 0,
    reservasConfirmadas: 0,
    reservasCanceladas: 0,
    reservasCompletadas: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarEstadisticas()
  }, [])

  const cargarEstadisticas = async () => {
    try {
      const data = await superAdminService.getEstadisticas()
      setEstadisticas(data)
    } catch (error) {
      console.error('Error al cargar estadísticas:', error)
      // Datos de ejemplo si falla
      setEstadisticas({
        totalUsuarios: 156,
        totalClientes: 143,
        totalAdministradores: 13,
        totalEstablecimientos: 28,
        totalCanchas: 85,
        totalReservas: 342,
        reservasConfirmadas: 234,
        reservasCanceladas: 56,
        reservasCompletadas: 52
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="estadisticas-container">
        <Navbar currentPage="estadisticas" />
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Cargando estadísticas...</p>
        </div>
      </div>
    )
  }

  const porcentajeOcupacion = estadisticas.totalReservas > 0 
    ? ((estadisticas.reservasConfirmadas + estadisticas.reservasCompletadas) / estadisticas.totalReservas * 100).toFixed(1)
    : 0

  return (
    <div className="estadisticas-container">
      <Navbar currentPage="estadisticas" />
      
      <main className="estadisticas-main">
        <div className="estadisticas-content">
          <div className="estadisticas-header">
            <h1 className="estadisticas-title">📊 Estadísticas de la Plataforma</h1>
            <p className="estadisticas-subtitle">Panel de métricas y análisis de GolReserve</p>
          </div>

          {/* Grid de estadísticas principales */}
          <div className="stats-grid">
            {/* Total Usuarios */}
            <div className="stat-card primary">
              <div className="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Usuarios</p>
                <p className="stat-value">{estadisticas.totalUsuarios}</p>
                <p className="stat-description">Registrados en la plataforma</p>
              </div>
            </div>

            {/* Total Clientes */}
            <div className="stat-card success">
              <div className="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="stat-info">
                <p className="stat-label">Clientes</p>
                <p className="stat-value">{estadisticas.totalClientes}</p>
                <p className="stat-description">{((estadisticas.totalClientes / estadisticas.totalUsuarios) * 100).toFixed(1)}% del total</p>
              </div>
            </div>

            {/* Total Administradores */}
            <div className="stat-card warning">
              <div className="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="stat-info">
                <p className="stat-label">Administradores</p>
                <p className="stat-value">{estadisticas.totalAdministradores}</p>
                <p className="stat-description">Propietarios de establecimientos</p>
              </div>
            </div>

            {/* Total Establecimientos */}
            <div className="stat-card info">
              <div className="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="stat-info">
                <p className="stat-label">Establecimientos</p>
                <p className="stat-value">{estadisticas.totalEstablecimientos}</p>
                <p className="stat-description">Centros deportivos activos</p>
              </div>
            </div>

            {/* Total Canchas */}
            <div className="stat-card purple">
              <div className="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="stat-info">
                <p className="stat-label">Canchas Sintéticas</p>
                <p className="stat-value">{estadisticas.totalCanchas}</p>
                <p className="stat-description">Disponibles para reserva</p>
              </div>
            </div>

            {/* Total Reservas */}
            <div className="stat-card danger">
              <div className="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Reservas</p>
                <p className="stat-value">{estadisticas.totalReservas}</p>
                <p className="stat-description">Historial completo</p>
              </div>
            </div>
          </div>

          {/* Sección de Reservas */}
          <div className="reservas-section">
            <h2 className="section-title">Estado de Reservas</h2>
            
            <div className="reservas-grid">
              <div className="reserva-card confirmada">
                <div className="reserva-header">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3>Confirmadas</h3>
                </div>
                <p className="reserva-count">{estadisticas.reservasConfirmadas}</p>
                <div className="reserva-progress">
                  <div 
                    className="progress-bar confirmada-bar" 
                    style={{ width: `${(estadisticas.reservasConfirmadas / estadisticas.totalReservas * 100)}%` }}
                  />
                </div>
                <p className="reserva-percent">
                  {((estadisticas.reservasConfirmadas / estadisticas.totalReservas) * 100).toFixed(1)}% del total
                </p>
              </div>

              <div className="reserva-card completada">
                <div className="reserva-header">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3>Completadas</h3>
                </div>
                <p className="reserva-count">{estadisticas.reservasCompletadas}</p>
                <div className="reserva-progress">
                  <div 
                    className="progress-bar completada-bar" 
                    style={{ width: `${(estadisticas.reservasCompletadas / estadisticas.totalReservas * 100)}%` }}
                  />
                </div>
                <p className="reserva-percent">
                  {((estadisticas.reservasCompletadas / estadisticas.totalReservas) * 100).toFixed(1)}% del total
                </p>
              </div>

              <div className="reserva-card cancelada">
                <div className="reserva-header">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3>Canceladas</h3>
                </div>
                <p className="reserva-count">{estadisticas.reservasCanceladas}</p>
                <div className="reserva-progress">
                  <div 
                    className="progress-bar cancelada-bar" 
                    style={{ width: `${(estadisticas.reservasCanceladas / estadisticas.totalReservas * 100)}%` }}
                  />
                </div>
                <p className="reserva-percent">
                  {((estadisticas.reservasCanceladas / estadisticas.totalReservas) * 100).toFixed(1)}% del total
                </p>
              </div>
            </div>
          </div>

          {/* Métricas adicionales */}
          <div className="metricas-section">
            <div className="metrica-card">
              <h3>Tasa de Ocupación</h3>
              <div className="metrica-visual">
                <svg className="circular-progress" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="54" 
                    fill="none" 
                    stroke="#4caf50" 
                    strokeWidth="12"
                    strokeDasharray={`${(porcentajeOcupacion / 100) * 339.292} 339.292`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <text x="60" y="60" textAnchor="middle" dy="7" fontSize="24" fontWeight="700" fill="#1e293b">
                    {porcentajeOcupacion}%
                  </text>
                </svg>
              </div>
              <p className="metrica-description">Reservas activas y completadas</p>
            </div>

            <div className="metrica-card">
              <h3>Promedio de Canchas por Establecimiento</h3>
              <div className="metrica-value-large">
                {(estadisticas.totalCanchas / estadisticas.totalEstablecimientos).toFixed(1)}
              </div>
              <p className="metrica-description">Canchas por centro deportivo</p>
            </div>

            <div className="metrica-card">
              <h3>Promedio de Reservas por Usuario</h3>
              <div className="metrica-value-large">
                {(estadisticas.totalReservas / estadisticas.totalClientes).toFixed(1)}
              </div>
              <p className="metrica-description">Reservas por cliente registrado</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
