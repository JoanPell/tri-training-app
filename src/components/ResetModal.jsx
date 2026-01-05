import './ResetModal.css';

function ResetModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Resetea el pla</h2>
        <p className="modal-description">
          Segur que vols resetejar el pla? Perdràs tots els entrenaments que has marcat com a fets.
        </p>
        <div className="modal-buttons">
          <button className="modal-button cancel" onClick={onClose}>
            Cancel·la
          </button>
          <button className="modal-button confirm" onClick={onConfirm}>
            Resetea
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetModal;
