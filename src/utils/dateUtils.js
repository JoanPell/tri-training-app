// Obtener el próximo lunes a partir de una fecha
export const getNextMonday = (date = new Date()) => {
  const result = new Date(date);
  const day = result.getDay();
  const daysUntilMonday = day === 0 ? 1 : day === 1 ? 7 : 8 - day;
  result.setDate(result.getDate() + daysUntilMonday);
  result.setHours(0, 0, 0, 0);
  return result;
};

// Calcular la fecha de un día específico de una semana
export const getDateForWeekDay = (startDate, weekNumber, dayName) => {
  const dayMap = {
    'Lunes': 0,
    'Martes': 1,
    'Miércoles': 2,
    'Jueves': 3,
    'Viernes': 4,
    'Sábado': 5,
    'Domingo': 6
  };

  const daysToAdd = (weekNumber - 1) * 7 + dayMap[dayName];
  const result = new Date(startDate);
  result.setDate(result.getDate() + daysToAdd);
  return result;
};

// Formatear fecha como "12 Ene"
export const formatDate = (date) => {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${date.getDate()} ${months[date.getMonth()]}`;
};

// Obtener el día de la semana abreviado
export const getDayShort = (dayName) => {
  const days = {
    'Lunes': 'Mon',
    'Martes': 'Tue',
    'Miércoles': 'Wed',
    'Jueves': 'Thu',
    'Viernes': 'Fri',
    'Sábado': 'Sat',
    'Domingo': 'Sun'
  };
  return days[dayName] || dayName;
};

// Verificar si una fecha es hoy
export const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Verificar si una fecha ya pasó
export const isPast = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};
