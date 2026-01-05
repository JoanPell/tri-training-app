import { useState, useEffect } from 'react';
import './WelcomeScreen.css';
import { getNextMonday, formatDate } from '../utils/dateUtils';

const motivationalMessages = [
  "Cada entrenament et porta més a prop de la meta!",
  "El triatlonista que vols ser està esperant-te!",
  "Avui és un bon dia per superar-te!",
  "La constància és el secret de l'èxit!",
  "Ets més fort del que penses!",
  "Petit a petit, fas el camí!",
  "El triatleta que vols ser està a dins teu!",
  "Cada sessió compta, segueix endavant!"
];

function WelcomeScreen({ onStart, hasStarted, onContinue }) {
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState('');
  const nextMonday = getNextMonday();

  useEffect(() => {
    // Seleccionar un mensaje aleatorio
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setMessage(randomMessage);
  }, []);

  const handleStart = () => {
    setShow(false);
    setTimeout(() => onStart(nextMonday), 500);
  };

  const handleContinue = () => {
    setShow(false);
    setTimeout(() => onContinue(), 500);
  };

  return (
    <div className={`welcome-screen ${!show ? 'fade-out' : ''}`} onClick={hasStarted ? handleContinue : undefined}>
      <div className="welcome-content">
        <h1 className="welcome-name">Jaume</h1>
        <p className="welcome-description">
          {message}
        </p>

        {!hasStarted && (
          <>
            <div className="welcome-info">
              <p className="start-info">El teu entrenament comença el:</p>
              <p className="start-date">{formatDate(nextMonday, 'short')}</p>
              <p className="start-note">(Proper Dilluns)</p>
            </div>

            <button className="start-button" onClick={handleStart}>
              Start Preparation
            </button>
          </>
        )}

        {hasStarted && (
          <p className="tap-continue">Toca per continuar</p>
        )}
      </div>
    </div>
  );
}

export default WelcomeScreen;
