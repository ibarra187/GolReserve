import React from 'react';
import '../styles/Navbar.css';

export default function Navbar({ currentPage = 'home' }) {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/LogoGolReserve.png" alt="GolReserve Logo" className="logo" />
        <span className="brand-name">GolReserve</span>
      </div>
      
      <nav className="nav-menu">
        <a 
          href="#home" 
          className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
        >
          Inicio
        </a>
        <a 
          href="#reservas" 
          className={`nav-link ${currentPage === 'reservas' ? 'active' : ''}`}
        >
          Reservar
        </a>
        <a href="#" className="nav-link">Cómo funciona</a>
        <a href="#" className="nav-link">Contacto</a>
      </nav>
      
      <div className="nav-actions">
        <a 
          href="#login" 
          className={`nav-link ${currentPage === 'login' ? 'active' : ''}`}
        >
          Iniciar sesión
        </a>
        <a 
          href="#register" 
          className={`btn-register ${currentPage === 'register' ? 'active' : ''}`}
        >
          Registrarse
        </a>
      </div>
    </header>
  );
}