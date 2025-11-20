import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import { authService } from '../services/authService'
import '../styles/profile.css'

export default function Profile() {
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Verificar autenticación
        if (!authService.isAuthenticated()) {
            window.location.hash = 'login'
            return
        }

        // Cargar datos del usuario
        const user = authService.getCurrentUser()
        if (user) {
            setUserData(user)
        }
        setIsLoading(false)
    }, [])

    if (isLoading) {
        return (
            <main className="login-page">
                <Navbar currentPage="profile" />
                <div className="login-content">
                    <div className="loading">Cargando...</div>
                </div>
            </main>
        )
    }

    if (!userData) {
        return (
            <main className="login-page">
                <Navbar currentPage="profile" />
                <div className="login-content">
                    <div className="error">No se pudo cargar la información del usuario</div>
                </div>
            </main>
        )
    }

    return (
        <main className="login-page">
            <Navbar currentPage="profile" />
            
            <div className="login-content">
                <section className="hero">
                    <div className="hero-content" style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:12}}>
                        <img src="/LogoGolReserve.png" alt="GolReserve logo" style={{width:450,height:'auto'}} />
                        <h1>Mi Perfil</h1>
                        <p>Gestiona tu información personal</p>
                    </div>
                </section>

                <section className="login-card profile-card" aria-labelledby="profile-title">
                    <h2 id="profile-title">Información Personal</h2>
                    
                    <div className="profile-info">
                        <div className="info-group">
                            <label>Nombre completo</label>
                            <p>{userData.nombre}</p>
                        </div>

                        <div className="info-group">
                            <label>Correo electrónico</label>
                            <p>{userData.email}</p>
                        </div>

                        <div className="info-group">
                            <label>ID de Usuario</label>
                            <p>{userData.id}</p>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button type="button" className="btn btn-outline" onClick={() => window.location.hash = 'home'}>
                            Volver al inicio
                        </button>
                    </div>
                </section>
            </div>
        </main>
    )
}