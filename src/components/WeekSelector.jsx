import './WeekSelector.css';

function WeekSelector({ selectedWeek, onWeekChange, totalWeeks = 12 }) {
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  return (
    <div className="week-selector-container">
      <div className="week-selector">
        {weeks.map((week) => (
          <button
            key={week}
            className={`week-button ${selectedWeek === week ? 'active' : ''}`}
            onClick={() => onWeekChange(week)}
          >
            Week {week}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WeekSelector;
