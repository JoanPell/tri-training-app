import { useState } from 'react';
import './WelcomeScreen.css';
import { getNextMonday, formatDate } from '../utils/dateUtils';

const motivationalMessages = [
  "Bruce ja ha sortit a córrer... i tu encara ets al llit?",
  "Oihane et mira amb cara de 'venga va, que pots!'",
  "Speaker en forma, equip en forma!",
  "Entrena ara, gaudeix dels macarrons gratinats després",
  "Si pots aguantar un partit del Sabadell, pots amb això",
  "Bruce t'espera per celebrar-ho amb un bon passeig",
  "Oihane ja sap que avui estaràs cansat... però orgullós",
  "Al Nova Creu Alta també es pateix, això és entrenar!",
  "Les calories que cremes ara són croquetes després",
  "Del speaker del Sabadell al triatleta de Barcelona",
  "Bruce t'observa amb cara de 'tu pots, amo'",
  "Els arlequinats no es rendeixen mai!",
  "Entrena fort, celebra amb Oihane i Bruce més fort",
  "Barcelona t'espera, però primer sues una mica",
  "Speaker de dia, triatleta de nit... o al revés?",
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
  const nextMonday = getNextMonday();

  // Seleccionar un mensaje aleatorio al inicio
  const [message] = useState(() => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  });

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
