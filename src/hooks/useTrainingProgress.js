import { useState } from 'react';

const STORAGE_KEYS = {
  START_DATE: 'tri_training_start_date',
  COMPLETED_WORKOUTS: 'tri_training_completed_workouts',
  HAS_STARTED: 'tri_training_has_started'
};

export const useTrainingProgress = () => {
  // Estado para saber si ha iniciado el programa
  const [hasStarted, setHasStarted] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.HAS_STARTED) === 'true';
  });

  // Estado para la fecha de inicio (próximo lunes)
  const [startDate, setStartDate] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.START_DATE);
    return saved ? new Date(saved) : null;
  });

  // Estado para entrenamientos completados
  const [completedWorkouts, setCompletedWorkouts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_WORKOUTS);
    return saved ? JSON.parse(saved) : [];
  });

  // Iniciar el programa de entrenamiento
  const startTraining = (initialDate) => {
    setHasStarted(true);
    setStartDate(initialDate);
    localStorage.setItem(STORAGE_KEYS.HAS_STARTED, 'true');
    localStorage.setItem(STORAGE_KEYS.START_DATE, initialDate.toISOString());
  };

  // Marcar/desmarcar un entrenamiento como completado
  const toggleWorkoutComplete = (week, day, index) => {
    setCompletedWorkouts(prev => {
      const key = `${week}-${day}-${index}`;
      const isCompleted = prev.includes(key);

      let newCompleted;
      if (isCompleted) {
        // Quitar de completados
        newCompleted = prev.filter(item => item !== key);
      } else {
        // Agregar a completados
        newCompleted = [...prev, key];
      }

      // Guardar en localStorage
      localStorage.setItem(STORAGE_KEYS.COMPLETED_WORKOUTS, JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  // Verificar si un entrenamiento está completado
  const isWorkoutCompleted = (week, day, index) => {
    const key = `${week}-${day}-${index}`;
    return completedWorkouts.includes(key);
  };

  // Reiniciar todo el progreso (útil para testing)
  const resetProgress = () => {
    setHasStarted(false);
    setStartDate(null);
    setCompletedWorkouts([]);
    localStorage.removeItem(STORAGE_KEYS.HAS_STARTED);
    localStorage.removeItem(STORAGE_KEYS.START_DATE);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_WORKOUTS);
  };

  return {
    hasStarted,
    startDate,
    completedWorkouts,
    startTraining,
    toggleWorkoutComplete,
    isWorkoutCompleted,
    resetProgress
  };
};
