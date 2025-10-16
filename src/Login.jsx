import React, { useState } from 'react'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(true)

  function handleSubmit(e){
    e.preventDefault()
    setMessage('')

    if(!email.trim() || !password.trim()){
      setIsError(true)
      setMessage('Completa todos los campos.')
      return
    }

    if(password.length < 6){
      setIsError(true)
      setMessage('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    if(email === 'test@demo.com' && password === 'password'){
      setIsError(false)
      setMessage('Inicio de sesión exitoso. Redirigiendo...')
      setTimeout(()=>{
        window.location.href = '#'
      },800)
    } else {
      setIsError(true)
      setMessage('Correo o contraseña incorrectos.')
    }
  }

  return (
    <main className="login-page">
      {/* Navbar */}
      <header className="login-navbar">
        <nav className="navbar-content">
          <a href="#" className="nav-link">Inicio</a>
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}>Como funciona</a>
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}>Reservar</a>
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}>Contacto</a>
          <a href="#login" className="nav-link active">Iniciar sesión</a>
        </nav>
      </header>

      <section style={{display:'grid', gridTemplateColumns:'420px 1fr', maxWidth:'1200px', margin:'0 auto', gap:'48px', alignItems:'center', minHeight:'calc(100vh - 60px)'}}>
        <section className="hero">
          <div className="hero-content" style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:12}}>
            <img src="/LogoGolReserve.png" alt="GolReserve logo" style={{width:450,height:'auto'}} />
            <h1>Alquila tu cancha sintética</h1>
            <p>Reserva rápido, paga seguro y juega cuando quieras.</p>
          </div>
        </section>

        <section className="login-card" aria-labelledby="login-title">
          <h2 id="login-title">Iniciar sesión</h2>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
          />

          <div className="row">
            <label className="checkbox">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              <span>Recordarme</span>
            </label>
            <a className="help-link" href="#">¿Olvidaste tu contraseña?</a>
          </div>

          <div id="error" className="error" role="alert" aria-live="polite" style={{color: isError ? '#b91c1c' : 'green'}}>{message}</div>

          <button type="submit" className="btn">Entrar</button>

          <p className="register">¿No tienes cuenta? <button type="button" onClick={() => window.location.href = '#register'} style={{background:'none',border:'none',color:'#3b82f6',cursor:'pointer',textDecoration:'underline'}}>Regístrate</button></p>
        </form>
      </section>
      </section>
    </main>
  )
}
