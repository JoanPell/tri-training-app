import { useState } from 'react';
import './WorkoutCard.css';
import swimIcon from '../assets/icons/swim.svg';
import runIcon from '../assets/icons/run.svg';
import bikeIcon from '../assets/icons/bike.svg';
import recoveryIcon from '../assets/icons/recovery.svg';
import { getDayShort } from '../utils/dateUtils';

const disciplineIcons = {
  'Natación': swimIcon,
  'Carrera': runIcon,
  'Bicicleta': bikeIcon,
  'Brick': bikeIcon,
  'Descanso': recoveryIcon,
  'Multideporte': swimIcon
};

const zoneColors = {
  1: '#22c55e',
  2: '#3b82f6',
  3: '#f59e0b',
  4: '#ef4444',
  5: '#a855f7'
};

function WorkoutCard({ workout, workoutDate, workoutIndex, onToggleComplete }) {
  const [expanded, setExpanded] = useState(false);

  const getZoneLabel = (zone) => {
    if (!zone) return 'Recovery';
    return `Zone ${zone}`;
  };

  const isRestDay = workout.discipline === 'Descanso';

  return (
    <div
      className={`workout-card ${isRestDay ? 'rest-day' : ''} ${workout.completed ? 'completed' : ''}`}
      onClick={() => !isRestDay && setExpanded(!expanded)}
    >
      <div className="workout-header">
        <div className="workout-date">
          <div className="day-short">{getDayShort(workout.day)}</div>
          <div className="day-number">{workoutDate.getDate()}</div>
        </div>

        <div className="workout-icon">
          <img
            src={disciplineIcons[workout.discipline] || swimIcon}
            alt={workout.discipline}
            className="discipline-icon"
          />
        </div>

        <div className="workout-info">
          <h3 className="workout-title">{workout.title}</h3>
          <div className="workout-meta">
            <span className="workout-duration">{workout.duration}</span>
            {workout.main_zone && (
              <>
                <span className="meta-divider">•</span>
                <span
                  className="workout-zone"
                  style={{ color: zoneColors[workout.main_zone] }}
                >
                  {getZoneLabel(workout.main_zone)}
                </span>
              </>
            )}
          </div>
        </div>

        {!isRestDay && (
          <div
            className={`workout-checkbox ${workout.completed ? 'checked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(workout, workoutIndex);
            }}
          >
            {workout.completed && <span className="checkmark">✓</span>}
          </div>
        )}
      </div>

      {expanded && !isRestDay && (
        <div className="workout-details">
          <div className="workout-blocks">
            <h4>Bloques de entrenamiento:</h4>
            <ul>
              {workout.blocks.map((block, index) => (
                <li key={index}>{block}</li>
              ))}
            </ul>
          </div>
          {workout.notes && (
            <div className="workout-notes">
              <h4>Notas:</h4>
              <p>{workout.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WorkoutCard;
