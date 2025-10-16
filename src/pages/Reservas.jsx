import React, { useState, useEffect } from 'react';
import '../styles/Reservas.css';
import Navbar from '../components/Navbar';

export default function Reservas() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourt, setSelectedCourt] = useState('futbol5');
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Datos de canchas y horarios
  const courts = {
    futbol5: { name: 'Fútbol 5', price: 50000 },
    futbol7: { name: 'Fútbol 7', price: 70000 },
    futbol11: { name: 'Fútbol 11', price: 100000 }
  };

  const timeSlots = [
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', 
    '21:00', '22:00', '23:00'
  ];

  // Horarios ocupados simulados (en producción vendría de API)
  const [unavailableTimes] = useState({
    [selectedDate.toDateString()]: ['16:00', '19:00', '22:00']
  });

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
    return !unavailableTimes[dateKey]?.includes(time);
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

  const handleReservation = () => {
    if (selectedTimes.length === 0) {
      alert('Selecciona al menos un horario');
      return;
    }
    
    const reservation = {
      date: selectedDate,
      court: courts[selectedCourt].name,
      times: selectedTimes,
      total: calculateTotal()
    };
    
    console.log('Reserva:', reservation);
    alert(`Reserva confirmada para ${courts[selectedCourt].name} el ${formatDate(selectedDate)}`);
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
                  
                  <button className="reserve-btn" onClick={handleReservation}>
                    Confirmar Reserva
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
