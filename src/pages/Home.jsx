import React from 'react';
import '../styles/home.css';
import Navbar from '../components/navbar';

function Home() {
  return (
    <div className="home-container">
      {/* Navbar reutilizable */}
      <Navbar currentPage="home" />

      {/* Sección Hero */}
      <section id="inicio" className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">
            Reserva tu<br />
            Cancha en<br />
            5 Segundos
          </h2>
          <div className="hero-underline"></div>
          
          <p className="hero-description">
            Encuentra canchas en tu ciudad, consulta horarios en 
            tiempo real y paga fácil desde tu celular.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => window.location.href = '#reservas'}>
              <span className="soccer-icon">⚽</span> Reservar ahora
            </button>
            <button className="btn-secondary">
              <span className="play-icon">▶</span> Ver cómo funciona
            </button>
          </div>
        </div>

        <div className="hero-image">
          {/* Imagen del jugador */}
          <img src="/camiseta.png" alt="Jugador con balón" className="hero-player" />
          
          {/* Widget de pago simulado */}
          <div className="payment-widget">
            <input type="text" placeholder="Enter amount" defaultValue="$70.000 COP" />
            <button className="send-btn">Send</button>
          </div>

          {/* Iconos decorativos - espacios para imágenes */}
          <div className="floating-icon icon-card">
            <p>💳</p>
          </div>
          <div className="floating-icon icon-check">
            <p>✓</p>
          </div>
          <div className="floating-icon icon-ticket">
            <p>🎫</p>
          </div>
          <div className="floating-icon icon-calendar">
            <p>📅</p>
          </div>
        </div>
      </section>

      {/* Sección Cómo Funciona */}
      <section id="como-funciona" className="how-it-works">
        <h2 className="section-title">¿Cómo funciona?</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">
              <p>🔍</p>
            </div>
            <h3>1. Busca</h3>
            <p>Encuentra canchas disponibles en tu ciudad</p>
          </div>
          
          <div className="step">
            <div className="step-icon">
              <p>📅</p>
            </div>
            <h3>2. Reserva</h3>
            <p>Selecciona fecha y hora en tiempo real</p>
          </div>
          
          <div className="step">
            <div className="step-icon">
              <p>💳</p>
            </div>
            <h3>3. Paga</h3>
            <p>Paga de forma segura desde tu celular</p>
          </div>
          
          <div className="step">
            <div className="step-icon">
              <p>⚽</p>
            </div>
            <h3>4. Juega</h3>
            <p>¡Disfruta tu partido!</p>
          </div>
        </div>
      </section>

      {/* Sección Reservar */}
      <section id="reservar" className="reserve-section">
        <h2 className="section-title">Canchas Disponibles</h2>
        <div className="fields-container">
          <div className="field-card">
            <div className="field-image-placeholder">
              <p>Imagen de cancha 1</p>
            </div>
            <h3>Cancha Premium</h3>
            <p>Césped sintético de alta calidad</p>
            <button className="btn-reserve" onClick={() => window.location.href = '#reservas'}>Reservar</button>
          </div>
          
          <div className="field-card">
            <div className="field-image-placeholder">
              <p>Imagen de cancha 2</p>
            </div>
            <h3>Cancha Estándar</h3>
            <p>Césped sintético estándar</p>
            <button className="btn-reserve" onClick={() => window.location.href = '#reservas'}>Reservar</button>
          </div>
          
          <div className="field-card">
            <div className="field-image-placeholder">
              <p>Imagen de cancha 3</p>
            </div>
            <h3>Cancha Techada</h3>
            <p>Perfecta para cualquier clima</p>
            <button className="btn-reserve" onClick={() => window.location.href = '#reservas'}>Reservar</button>
          </div>
        </div>
      </section>

      {/* Sección Contacto */}
      <section id="contacto" className="contact-section">
        <h2 className="section-title">Contáctanos</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <h3>Email</h3>
                <p>info@golreserve.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <div>
                <h3>Teléfono</h3>
                <p>+57 300 123 4567</p>
              </div>
            </div>
            
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <h3>Ubicación</h3>
                <p>Tuluá, Colombia</p>
              </div>
            </div>
          </div>
          
          <form className="contact-form">
            <input type="text" placeholder="Nombre" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Mensaje" rows="5" required></textarea>
            <button type="submit" className="btn-submit">Enviar Mensaje</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>GolReserve</h3>
            <p>La forma más fácil de reservar canchas de fútbol</p>
          </div>
          
          <div className="footer-section">
            <h4>Enlaces</h4>
            <ul>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#como-funciona">Cómo funciona</a></li>
              <li><a href="#reservar">Reservar</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-icons">
              <a href="#" className="social-icon">📘 Facebook</a>
              <a href="#" className="social-icon">📷 Instagram</a>
              <a href="#" className="social-icon">🐦 Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 GolReserve. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
