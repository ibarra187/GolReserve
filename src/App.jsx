import React, { useState, useEffect } from 'react'
import Login from './Login'
import Register from './register'

export default function App(){
  const [currentPage, setCurrentPage] = useState('login')

  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'register') {
        setCurrentPage('register')
      } else {
        setCurrentPage('login')
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
  
  return <Login />
}
