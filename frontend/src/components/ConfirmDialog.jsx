const ConfirmDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content" style={{ maxWidth: '400px' }}>
        <h3 style={{ marginBottom: 'var(--spacing-2)' }}>Confirm</h3>
        <p style={{ marginBottom: 'var(--spacing-3)' }}>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-2)' }}>
          <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
