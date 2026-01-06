import { useState } from 'react';

const STORAGE_KEYS = {
  START_DATE: 'tri_training_start_date',
  COMPLETED_WORKOUTS: 'tri_training_completed_workouts',
  HAS_STARTED: 'tri_training_has_started',
  LAST_VIEWED_WEEK: 'tri_training_last_viewed_week'
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

  // Calcular la semana actual basándose en la fecha de inicio
  const getCurrentWeek = () => {
    if (!startDate) return 1;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const diffTime = today - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor(diffDays / 7) + 1;

    // Limitar entre semana 1 y 12
    return Math.max(1, Math.min(12, weekNumber));
  };

  // Obtener la última semana visitada
  const getLastViewedWeek = () => {
    const saved = localStorage.getItem(STORAGE_KEYS.LAST_VIEWED_WEEK);
    if (saved) {
      return parseInt(saved, 10);
    }
    // Si no hay última semana visitada, devolver la semana actual
    return getCurrentWeek();
  };

  // Guardar la última semana visitada
  const saveLastViewedWeek = (week) => {
    localStorage.setItem(STORAGE_KEYS.LAST_VIEWED_WEEK, week.toString());
  };

  // Reiniciar todo el progreso (útil para testing)
  const resetProgress = () => {
    setHasStarted(false);
    setStartDate(null);
    setCompletedWorkouts([]);
    localStorage.removeItem(STORAGE_KEYS.HAS_STARTED);
    localStorage.removeItem(STORAGE_KEYS.START_DATE);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_WORKOUTS);
    localStorage.removeItem(STORAGE_KEYS.LAST_VIEWED_WEEK);
  };

  return {
    hasStarted,
    startDate,
    completedWorkouts,
    startTraining,
    toggleWorkoutComplete,
    isWorkoutCompleted,
    resetProgress,
    getCurrentWeek,
    getLastViewedWeek,
    saveLastViewedWeek
  };
};
