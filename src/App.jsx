import React, { useState, useEffect } from 'react'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import Reservas from './pages/reservas'
import Profile from './pages/profile'
import MisReservas from './pages/MisReservas'
import AdminUsuarios from './pages/AdminUsuarios'
import AdminEstablecimientos from './pages/AdminEstablecimientos'
import DashboardSuperAdmin from './pages/DashboardSuperAdmin'
import DashboardAdmin from './pages/DashboardAdmin'
import AdminReservas from './pages/AdminReservas'
import AdminCanchas from './pages/AdminCanchas'
import { authService } from './services/authService'

export default function App(){
  const [currentPage, setCurrentPage] = useState('home')
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    // Verificar si hay usuario logueado
    const user = authService.getCurrentUser()
    setUsuario(user)
  }, [])

  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.replace('#', '')
      
      // Proteger rutas según rol del usuario
      if (hash && usuario) {
        if (!authService.canAccessRoute(hash)) {
          // Redirigir al dashboard correspondiente si no tiene acceso
          authService.redirectByRole(usuario.rol)
          return
        }
      }
      
      if (hash === 'register') {
        setCurrentPage('register')
      } else if (hash === 'login') {
        setCurrentPage('login')
      } else if (hash === 'reservas') {
        setCurrentPage('reservas')
      } else if (hash === 'mis-reservas') {
        setCurrentPage('mis-reservas')
      } else if (hash === 'profile') {
        setCurrentPage('profile')
      } else if (hash === 'admin-usuarios') {
        setCurrentPage('admin-usuarios')
      } else if (hash === 'admin-establecimientos') {
        setCurrentPage('admin-establecimientos')
      } else if (hash === 'dashboard-super-admin') {
        setCurrentPage('dashboard-super-admin')
      } else if (hash === 'dashboard-admin') {
        setCurrentPage('dashboard-admin')
      } else if (hash === 'admin-reservas') {
        setCurrentPage('admin-reservas')
      } else if (hash === 'admin-canchas') {
        setCurrentPage('admin-canchas')
      } else {
        setCurrentPage('home')
      }
    }

    // Inicializar página basada en hash actual
    handleHashChange()
    
    // Escuchar cambios en el hash
    window.addEventListener('hashchange', handleHashChange)
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [usuario])

  if (currentPage === 'register') {
    return <Register />
  }
  
  if (currentPage === 'login') {
    return <Login />
  }
  
  if (currentPage === 'reservas') {
    return <Reservas />
  }

  if (currentPage === 'mis-reservas') {
    return <MisReservas />
  }

  if (currentPage === 'profile') {
    return <Profile />
  }

  if (currentPage === 'admin-usuarios') {
    return <AdminUsuarios />
  }

  if (currentPage === 'admin-establecimientos') {
    return <AdminEstablecimientos />
  }

  if (currentPage === 'dashboard-super-admin') {
    return <DashboardSuperAdmin />
  }

  if (currentPage === 'dashboard-admin') {
    return <DashboardAdmin />
  }

  if (currentPage === 'admin-reservas') {
    return <AdminReservas />
  }

  if (currentPage === 'admin-canchas') {
    return <AdminCanchas />
  }
  
  return <Home />
}
