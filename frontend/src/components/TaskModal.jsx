import { useState, useEffect } from 'react';

const TaskModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title || '');
        setDescription(initialData.description || '');
      } else {
        setTitle('');
        setDescription('');
      }
      setError('');
      setIsSubmitting(false);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit({ title, description });
    } catch (err) {
      setError(err.message || 'Failed to save task.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content">
        <h3 style={{ marginBottom: 'var(--spacing-3)' }}>
          {initialData ? 'Edit Task' : 'Add Task'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'var(--spacing-2)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', color: 'var(--color-text-muted)' }}>Title *</label>
            <input 
              type="text" 
              className="input-field" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Task title"
              disabled={isSubmitting}
            />
            {error && <div className="error-text">{error}</div>}
          </div>
          
          <div style={{ marginBottom: 'var(--spacing-3)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', color: 'var(--color-text-muted)' }}>Description</label>
            <textarea 
              className="input-field" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Optional description"
              rows="3"
              disabled={isSubmitting}
              style={{ resize: 'vertical' }}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-2)' }}>
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isSubmitting}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
