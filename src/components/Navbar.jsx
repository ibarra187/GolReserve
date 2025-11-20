import React from 'react';
import '../styles/navbar.css';
import { authService } from '../services/authService';

export default function Navbar({ currentPage = 'home' }) {
    const isAuthenticated = authService.isAuthenticated();
    return (
        <header className="header">
            <div className="logo-container">
                <img src="/LogoGolReserve.png" alt="GolReserve Logo" className="logo" />
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
                {isAuthenticated ? (
                    <>
                        <a 
                            href="#mis-reservas"
                            className={`nav-link ${currentPage === 'mis-reservas' ? 'active' : ''}`}
                        >
                            Mis Reservas
                        </a>
                        <a 
                            href="#profile"
                            className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
                        >
                            Mi Perfil
                        </a>
                        <button 
                            onClick={() => authService.logout()}
                            className="nav-link"
                            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                        >
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </header>
    );
}
