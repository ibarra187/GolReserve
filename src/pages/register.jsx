import React, { useState } from 'react'
import Navbar from '../components/Navbar'

export default function Register(){
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

  function handleChange(e){
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    setMessage('')

    // Validaciones
    if(!formData.nombre.trim() || !formData.cedula.trim() || !formData.telefono.trim() || !formData.correo.trim() || !formData.password.trim() || !formData.confirmPassword.trim()){
      setIsError(true)
      setMessage('Completa todos los campos.')
      return
    }

    if(formData.password.length < 6){
      setIsError(true)
      setMessage('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    if(formData.password !== formData.confirmPassword){
      setIsError(true)
      setMessage('Las contraseñas no coinciden.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(formData.correo)){
      setIsError(true)
      setMessage('Ingresa un correo electrónico válido.')
      return
    }

    const cedulaRegex = /^\d{6,15}$/
    if(!cedulaRegex.test(formData.cedula.replace(/\s/g, ''))){
      setIsError(true)
      setMessage('Ingresa una cédula válida (6-15 dígitos).')
      return
    }

    const phoneRegex = /^\d{8,15}$/
    if(!phoneRegex.test(formData.telefono.replace(/\s/g, ''))){
      setIsError(true)
      setMessage('Ingresa un número de teléfono válido (8-15 dígitos).')
      return
    }

    if(!formData.aceptaTerminos){
      setIsError(true)
      setMessage('Debes aceptar los términos y condiciones.')
      return
    }

    // Registro exitoso
    setIsError(false)
    setMessage('Registro exitoso. Redirigiendo al login...')
    setTimeout(()=>{
      window.location.href = '#login'
    },1500)
  }

  function handleBackToLogin(){
    window.location.href = '#login'
  }

  function handleShowTerms(e){
    e.preventDefault()
    setShowTerms(true)
  }

  function handleCloseTerms(){
    setShowTerms(false)
  }

  return (
    <main className="login-page">
      {/* Navbar reutilizable */}
      <Navbar currentPage="register" />

      <div className="login-content">
        <section className="hero">
          <div className="hero-content" style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:12}}>
            <img src="/LogoGolReserve.png" alt="GolReserve logo" style={{width:450,height:'auto'}} />
            <h1>Únete a GolReserve</h1>
            <p>Crea tu cuenta y comienza a reservar canchas sintéticas.</p>
          </div>
        </section>

        <section className="login-card" aria-labelledby="register-title">
          <h2 id="register-title">Crear cuenta</h2>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Tu nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label htmlFor="cedula">Cédula</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            placeholder="12345678"
            value={formData.cedula}
            onChange={handleChange}
            required
          />

          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="123456789"
            value={formData.telefono}
            onChange={handleChange}
            required
          />

          <label htmlFor="correo">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            placeholder="tucorreo@ejemplo.com"
            value={formData.correo}
            onChange={handleChange}
            required
          />

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
          />

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
          />

          <div className="row">
            <label className="checkbox">
              <input
                type="checkbox"
                id="aceptaTerminos"
                name="aceptaTerminos"
                checked={formData.aceptaTerminos}
                onChange={handleChange}
                required
              />
              <span>Acepto los <a href="#" onClick={handleShowTerms} style={{color:'#3b82f6'}}>términos y condiciones</a></span>
            </label>
          </div>

          <div id="error" className="error" role="alert" aria-live="polite" style={{color: isError ? '#b91c1c' : 'green'}}>{message}</div>

          <button type="submit" className="btn">Crear cuenta</button>

          <p className="register">¿Ya tienes cuenta? <button type="button" onClick={handleBackToLogin} style={{background:'none',border:'none',color:'#3b82f6',cursor:'pointer',textDecoration:'underline'}}>Inicia sesión</button></p>
        </form>
        </section>
      </div>

      {/* Modal de Términos y Condiciones */}
      {showTerms && (
        <div className="modal-overlay" onClick={handleCloseTerms}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Términos y Condiciones</h2>
              <button className="modal-close" onClick={handleCloseTerms}>&times;</button>
            </div>
            <div className="modal-body">
              <p><strong>Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              
              <h3>1. Uso del Servicio</h3>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              
              <h3>2. Reservas y Pagos</h3>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              
              <h3>3. Cancelaciones</h3>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
              
              <h3>4. Responsabilidades</h3>
              <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
              
              <h3>5. Privacidad</h3>
              <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
              
              <p><strong>Fecha de última actualización:</strong> Octubre 2025</p>
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={handleCloseTerms}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
