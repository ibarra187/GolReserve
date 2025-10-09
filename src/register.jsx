import React, { useState } from 'react'

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

  return (
    <main className="login-page">
      <section className="hero">
        <div className="hero-content" style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:12}}>
          <img src="/LogoGolReserve.png" alt="GolReserve logo" style={{width:140,height:'auto'}} />
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
              <span>Acepto los <a href="#" style={{color:'#3b82f6'}}>términos y condiciones</a></span>
            </label>
          </div>

          <div id="error" className="error" role="alert" aria-live="polite" style={{color: isError ? '#b91c1c' : 'green'}}>{message}</div>

          <button type="submit" className="btn">Crear cuenta</button>

          <p className="register">¿Ya tienes cuenta? <button type="button" onClick={handleBackToLogin} style={{background:'none',border:'none',color:'#3b82f6',cursor:'pointer',textDecoration:'underline'}}>Inicia sesión</button></p>
        </form>
      </section>
    </main>
  )
}