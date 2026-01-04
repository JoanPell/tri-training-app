import { useState } from 'react';
import './App.css';
import WelcomeScreen from './components/WelcomeScreen';
import WeekSelector from './components/WeekSelector';
import WorkoutCard from './components/WorkoutCard';
import trainingData from './data/trainings-full.json';
import { useTrainingProgress } from './hooks/useTrainingProgress';
import { getDateForWeekDay } from './utils/dateUtils';

function App() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const {
    hasStarted,
    startDate,
    startTraining,
    toggleWorkoutComplete,
    isWorkoutCompleted
  } = useTrainingProgress();

  const handleStart = (initialDate) => {
    startTraining(initialDate);
  };

  const handleToggleComplete = (workout) => {
    toggleWorkoutComplete(workout.week, workout.day);
  };

  // Determinar la fase según la semana
  const getPhaseText = (week) => {
    if (week >= 1 && week <= 4) {
      return 'Fase 1 • Establecer la condición física básica';
    } else if (week >= 5 && week <= 8) {
      return 'Fase 2 • Desarrollar resistencia específica';
    } else if (week >= 9 && week <= 12) {
      return 'Fase 3 • Específico para carrera';
    }
    return 'Fase 1 • Establecer la condición física básica';
  };

  // Filtrar entrenamientos de la semana seleccionada
  const weekWorkouts = trainingData.flat_workouts.filter(w => w.week === selectedWeek);

  // Si no ha iniciado el programa, mostrar pantalla de bienvenida
  if (!hasStarted) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">Sprint Triathlon</h1>
        <p className="app-subtitle">{getPhaseText(selectedWeek)}</p>
        <WeekSelector
          selectedWeek={selectedWeek}
          onWeekChange={setSelectedWeek}
        />
      </header>

      <div className="workouts-container">
        <div className="workouts-list">
          {weekWorkouts.map((workout, index) => {
            const workoutDate = getDateForWeekDay(startDate, workout.week, workout.day);
            const completed = isWorkoutCompleted(workout.week, workout.day);

            return (
              <WorkoutCard
                key={`${workout.week}-${workout.day}-${index}`}
                workout={{ ...workout, completed }}
                workoutDate={workoutDate}
                onToggleComplete={handleToggleComplete}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
