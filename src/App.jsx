import React, { useState, useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/register'
import Home from './pages/Home'
import Reservas from './pages/Reservas'

export default function App(){
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'register') {
        setCurrentPage('register')
      } else if (hash === 'login') {
        setCurrentPage('login')
      } else if (hash === 'reservas') {
        setCurrentPage('reservas')
      } else {
        setCurrentPage('home')
      }
    }

    // Inicializar página basada en hash actual
    handleHashChange()
    
    // Escuchar cambios en el hash
    window.addEventListener('hashchange', handleHashChange)
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (currentPage === 'register') {
    return <Register />
  }
  
  if (currentPage === 'login') {
    return <Login />
  }
  
  if (currentPage === 'reservas') {
    return <Reservas />
  }
  
  return <Home />
}
