import { useState } from 'react';
import './App.css';
import WelcomeScreen from './components/WelcomeScreen';
import WeekSelector from './components/WeekSelector';
import WorkoutCard from './components/WorkoutCard';
import ResetModal from './components/ResetModal';
import trainingData from './data/trainings-full.json';
import { useTrainingProgress } from './hooks/useTrainingProgress';
import { getDateForWeekDay } from './utils/dateUtils';

function App() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const {
    hasStarted,
    startDate,
    startTraining,
    toggleWorkoutComplete,
    isWorkoutCompleted,
    resetProgress
  } = useTrainingProgress();

  const handleStart = (initialDate) => {
    startTraining(initialDate);
    setShowWelcome(false);
  };

  const handleContinue = () => {
    setShowWelcome(false);
  };

  const handleToggleComplete = (workout, index) => {
    toggleWorkoutComplete(workout.week, workout.day, index);
  };

  const handleResetConfirm = () => {
    resetProgress();
    setIsResetModalOpen(false);
    setShowWelcome(true);
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

  // Mostrar pantalla de bienvenida al inicio
  if (showWelcome) {
    return (
      <WelcomeScreen
        onStart={handleStart}
        hasStarted={hasStarted}
        onContinue={handleContinue}
      />
    );
  }

  // Si no ha iniciado el programa después del welcome, mostrar pantalla de bienvenida
  if (!hasStarted) {
    return <WelcomeScreen onStart={handleStart} hasStarted={false} onContinue={() => {}} />;
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
            const completed = isWorkoutCompleted(workout.week, workout.day, index);

            return (
              <WorkoutCard
                key={`${workout.week}-${workout.day}-${index}`}
                workout={{ ...workout, completed }}
                workoutDate={workoutDate}
                workoutIndex={index}
                onToggleComplete={handleToggleComplete}
              />
            );
          })}
        </div>

        <button className="reset-button" onClick={() => setIsResetModalOpen(true)}>
          Resetea el plan
        </button>
      </div>

      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetConfirm}
      />
    </div>
  );
}

export default App;
