import React, { useState, useEffect } from 'react';
import '../styles/reservas.css';
import Navbar from '../components/navbar';
import { tokenService } from '../services/tokenService';
import { reservaService } from '../services/reservaService';

export default function Reservas() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourt, setSelectedCourt] = useState('futbol5');
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [unavailableTimes, setUnavailableTimes] = useState({});
  const [loading, setLoading] = useState(false);

  // Datos de canchas y horarios
  const courts = {
    futbol5: { name: 'Fútbol 5', price: 50000, id: 1 },
    futbol7: { name: 'Fútbol 7', price: 70000, id: 2 },
    futbol11: { name: 'Fútbol 11', price: 100000, id: 3 }
  };

  const timeSlots = [
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', 
    '21:00', '22:00', '23:00'
  ];

  // Cargar reservas existentes desde la base de datos
  useEffect(() => {
    const loadReservas = async () => {
      try {
        setLoading(true);
        const reservas = await reservaService.getAllReservas();
        
        // Organizar horarios ocupados por fecha y cancha
        const ocupados = {};
        reservas.forEach(reserva => {
          const dateKey = new Date(reserva.fechaReserva).toDateString();
          if (!ocupados[dateKey]) {
            ocupados[dateKey] = {};
          }
          if (!ocupados[dateKey][reserva.idCancha]) {
            ocupados[dateKey][reserva.idCancha] = [];
          }
          ocupados[dateKey][reserva.idCancha].push(reserva.horaInicio);
        });
        
        setUnavailableTimes(ocupados);
      } catch (error) {
        console.error('Error al cargar reservas:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadReservas();
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }
    
    return days;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isTimeAvailable = (time) => {
    const dateKey = selectedDate.toDateString();
    const courtId = courts[selectedCourt].id;
    return !unavailableTimes[dateKey]?.[courtId]?.includes(time);
  };

  const toggleTimeSelection = (time) => {
    if (!isTimeAvailable(time)) return;
    
    setSelectedTimes(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const calculateTotal = () => {
    return selectedTimes.length * courts[selectedCourt].price;
  };

  const handleReservation = async () => {
    if (selectedTimes.length === 0) {
      alert('Selecciona al menos un horario');
      return;
    }
    
    // Verificar si el usuario está autenticado
    if (!tokenService.isAuthenticated()) {
      alert('Debes iniciar sesión o registrarte para realizar una reserva');
      window.location.hash = 'register';
      return;
    }
    
    try {
      setLoading(true);
      // Obtener datos del usuario
      const userData = tokenService.getUserData();
      
      console.log('Datos del usuario:', userData);
      
      // Crear una reserva por cada horario seleccionado
      for (const time of selectedTimes) {
        // Calcular hora de fin (1 hora después)
        const [hora, minuto] = time.split(':').map(Number);
        let horaFin = hora + 1;
        
        // Si la hora fin es 24, convertir a 00 del día siguiente
        // Pero para reservas, mejor usar 23:59 como límite
        if (horaFin === 24) {
          horaFin = 0;
        }
        
        const horaFinFormateada = `${horaFin.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
        
        const reservaData = {
          idUsuario: userData.idUsuario,
          idCancha: courts[selectedCourt].id,
          fechaReserva: selectedDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
          horaInicio: time,
          horaFin: horaFinFormateada,
          estadoReserva: 'CONFIRMADA',
          valorTotal: courts[selectedCourt].price
        };
        
        console.log('Enviando reserva:', reservaData);
        await reservaService.createReserva(reservaData);
      }
      
      alert(`¡Reserva confirmada! Se han reservado ${selectedTimes.length} hora(s) para ${courts[selectedCourt].name} el ${formatDate(selectedDate)}`);
      
      // Limpiar selección de horarios
      setSelectedTimes([]);
      
      // Recargar reservas para actualizar horarios ocupados
      const reservas = await reservaService.getAllReservas();
      const ocupados = {};
      reservas.forEach(reserva => {
        const dateKey = new Date(reserva.fechaReserva).toDateString();
        if (!ocupados[dateKey]) {
          ocupados[dateKey] = {};
        }
        if (!ocupados[dateKey][reserva.idCancha]) {
          ocupados[dateKey][reserva.idCancha] = [];
        }
        ocupados[dateKey][reserva.idCancha].push(reserva.horaInicio);
      });
      setUnavailableTimes(ocupados);
      
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);
      
      let errorMessage = '';
      
      // Manejo específico para cada tipo de error
      if (error.response?.status === 409) {
        // Conflicto - horario ya reservado
        errorMessage = error.response?.data?.mensaje || 'El horario seleccionado ya está reservado. Por favor, elige otro horario.';
      } else if (error.response?.data?.mensaje) {
        errorMessage = error.response.data.mensaje;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.mensaje) {
        errorMessage = error.mensaje;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = 'Error al crear la reserva. Por favor, intenta nuevamente.';
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="reservas-container">
      {/* Navbar reutilizable */}
      <Navbar currentPage="reservas" />

      {/* Contenido principal */}
      <main className="reservas-main">
        <div className="reservas-content">
          <h1 className="reservas-title">Reserva tu cancha</h1>
          
          <div className="reservas-grid">
            {/* Panel de calendario */}
            <div className="calendar-section">
              <div className="calendar-header">
                <button 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="calendar-nav-btn"
                >
                  &#8249;
                </button>
                <h3 className="calendar-month">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="calendar-nav-btn"
                >
                  &#8250;
                </button>
              </div>
              
              <div className="calendar-grid">
                <div className="calendar-days-header">
                  {dayNames.map(day => (
                    <div key={day} className="calendar-day-name">{day}</div>
                  ))}
                </div>
                
                <div className="calendar-days">
                  {getDaysInMonth(currentMonth).map((dayObj, index) => (
                    <button
                      key={index}
                      onClick={() => dayObj.isCurrentMonth && setSelectedDate(dayObj.date)}
                      className={`calendar-day ${
                        dayObj.isCurrentMonth ? 'current-month' : 'other-month'
                      } ${
                        selectedDate.toDateString() === dayObj.date.toDateString() ? 'selected' : ''
                      } ${
                        dayObj.date < new Date().setHours(0,0,0,0) ? 'past-date' : ''
                      }`}
                      disabled={!dayObj.isCurrentMonth || dayObj.date < new Date().setHours(0,0,0,0)}
                    >
                      {dayObj.date.getDate()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel de reservas */}
            <div className="booking-section">
              <div className="booking-header">
                <h3>Reservas para</h3>
                <p className="selected-date">{formatDate(selectedDate)}</p>
              </div>

              {/* Selector de tipo de cancha */}
              <div className="court-selector">
                <h4>Tipo de cancha</h4>
                <div className="court-options">
                  {Object.entries(courts).map(([key, court]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCourt(key)}
                      className={`court-btn ${selectedCourt === key ? 'selected' : ''}`}
                    >
                      {court.name}
                      <span className="court-price">${court.price.toLocaleString()}/hora</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Horarios disponibles */}
              <div className="time-selector">
                <h4>Horarios disponibles</h4>
                <div className="time-grid">
                  {timeSlots.map(time => {
                    const available = isTimeAvailable(time);
                    const selected = selectedTimes.includes(time);
                    
                    return (
                      <button
                        key={time}
                        onClick={() => toggleTimeSelection(time)}
                        className={`time-btn ${
                          !available ? 'unavailable' : 
                          selected ? 'selected' : 'available'
                        }`}
                        disabled={!available}
                      >
                        {time}
                        {!available && <span className="unavailable-badge">Ocupado</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Resumen de reserva */}
              {selectedTimes.length > 0 && (
                <div className="booking-summary">
                  <h4>Resumen de reserva</h4>
                  <div className="summary-details">
                    <p><strong>Cancha:</strong> {courts[selectedCourt].name}</p>
                    <p><strong>Fecha:</strong> {selectedDate.toLocaleDateString('es-ES')}</p>
                    <p><strong>Horarios:</strong> {selectedTimes.join(', ')}</p>
                    <p><strong>Total:</strong> ${calculateTotal().toLocaleString()}</p>
                  </div>
                  
                  <button 
                    className="reserve-btn" 
                    onClick={handleReservation}
                    disabled={loading}
                  >
                    {loading ? 'Procesando...' : 'Confirmar Reserva'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
