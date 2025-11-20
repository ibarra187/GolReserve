import React, { useState } from 'react'
import Navbar from '../components/navbar'
import { authService } from '../services/authService'

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    correo: '',
    password: '',
    confirmPassword: '',
    aceptaTerminos: false
  })
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(true)
  const [showTerms, setShowTerms] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')

    // ✅ Validaciones básicas
    if (
      !formData.nombre.trim() ||
      !formData.cedula.trim() ||
      !formData.telefono.trim() ||
      !formData.correo.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setIsError(true)
      setMessage('Completa todos los campos.')
      return
    }

    // ✅ Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.correo)) {
      setIsError(true)
      setMessage('Ingresa un correo electrónico válido.')
      return
    }

    // ✅ Validar cédula
    const cedulaRegex = /^\d{6,15}$/
    if (!cedulaRegex.test(formData.cedula.replace(/\s/g, ''))) {
      setIsError(true)
      setMessage('Ingresa una cédula válida (6-15 dígitos).')
      return
    }

    // ✅ Validar teléfono
    const phoneRegex = /^\d{8,15}$/
    if (!phoneRegex.test(formData.telefono.replace(/\s/g, ''))) {
      setIsError(true)
      setMessage('Ingresa un número de teléfono válido (8-15 dígitos).')
      return
    }

    // ✅ Validar contraseñas
    if (formData.password.length < 6) {
      setIsError(true)
      setMessage('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setIsError(true)
      setMessage('Las contraseñas no coinciden.')
      return
    }

    // ✅ Validar términos
    if (!formData.aceptaTerminos) {
      setIsError(true)
      setMessage('Debes aceptar los términos y condiciones.')
      return
    }

    // ✅ Enviar datos al backend
    try {
      const userData = {
        nombre: formData.nombre.trim(),
        cedula: formData.cedula.trim(),
        telefono: formData.telefono.trim(),
        email: formData.correo.trim(),
        password: formData.password
      }

      const result = await authService.register(userData)
      
      if (result.success) {
        setIsError(false)
        setMessage('¡Registro exitoso! Redirigiendo al login...')
        setTimeout(() => {
          window.location.hash = 'login'
        }, 1500)
      }
    } catch (error) {
      setIsError(true)
      setMessage(error.message || 'Error al registrar el usuario.')
    }
  }

  function handleBackToLogin() {
    window.location.href = '#login'
  }

  function handleShowTerms(e) {
    e.preventDefault()
    setShowTerms(true)
  }

  function handleCloseTerms() {
    setShowTerms(false)
  }

  return (
    <main className="login-page">
      <Navbar currentPage="register" />

      <div className="login-content">
        <section className="hero">
          <div
            className="hero-content"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 12
            }}
          >
            <img
              src="/LogoGolReserve.png"
              alt="GolReserve logo"
              style={{ width: 450, height: 'auto' }}
            />
            <h1>Únete a GolReserve</h1>
            <p>Crea tu cuenta y comienza a reservar canchas sintéticas.</p>
          </div>
        </section>

        <section className="login-card" aria-labelledby="register-title">
          <h2 id="register-title">Crear cuenta</h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cedula">Cédula</label>
              <input
                type="text"
                id="cedula"
                name="cedula"
                placeholder="Número de cédula"
                value={formData.cedula}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                placeholder="Número de teléfono"
                value={formData.telefono}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="correo">Correo electrónico</label>
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="tucorreo@ejemplo.com"
                value={formData.correo}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="checkbox">
                <input
                  type="checkbox"
                  id="aceptaTerminos"
                  name="aceptaTerminos"
                  checked={formData.aceptaTerminos}
                  onChange={handleChange}
                  required
                />
                <span>
                  Acepto los{' '}
                  <button
                    type="button"
                    onClick={handleShowTerms}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#3b82f6',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    términos y condiciones
                  </button>
                </span>
              </label>
            </div>

            <div
              id="error"
              className="error"
              role="alert"
              aria-live="polite"
              style={{
                color: isError ? '#b91c1c' : 'green',
                marginBottom: '1rem'
              }}
            >
              {message}
            </div>

            <button type="submit" className="btn">
              Crear cuenta
            </button>

            <p className="register">
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={handleBackToLogin}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#3b82f6',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Inicia sesión
              </button>
            </p>
          </form>
        </section>
      </div>

      {/* ✅ Modal de Términos y Condiciones */}
      {showTerms && (
        <div className="modal-overlay" onClick={handleCloseTerms}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Términos y Condiciones</h2>
              <button className="modal-close" onClick={handleCloseTerms}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Lorem ipsum dolor sit amet</strong>, consectetur
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua...
              </p>
              <p>
                <strong>Fecha de última actualización:</strong> Octubre 2025
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={handleCloseTerms}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
