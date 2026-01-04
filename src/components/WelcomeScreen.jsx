import { useState } from 'react';
import './WelcomeScreen.css';
import { getNextMonday, formatDate } from '../utils/dateUtils';

function WelcomeScreen({ onStart }) {
  const [show, setShow] = useState(true);
  const nextMonday = getNextMonday();

  const handleStart = () => {
    setShow(false);
    setTimeout(() => onStart(nextMonday), 500);
  };

  return (
    <div className={`welcome-screen ${!show ? 'fade-out' : ''}`}>
      <div className="welcome-content">
        <h1 className="welcome-title">Bienvenido</h1>
        <h2 className="welcome-name">Jaume</h2>
        <p className="welcome-subtitle">Plan de entrenamiento Sprint Triathlon</p>
        <p className="welcome-description">
          12 semanas de preparación para tu primer triatlón
        </p>

        <div className="welcome-info">
          <p className="start-info">Tu entrenamiento comenzará el:</p>
          <p className="start-date">{formatDate(nextMonday)}</p>
          <p className="start-note">(Próximo lunes)</p>
        </div>

        <button className="start-button" onClick={handleStart}>
          Empezar preparación
        </button>
      </div>
    </div>
  );
}

export default WelcomeScreen;
