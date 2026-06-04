const Header = ({ search, onSearchChange, statusFilter, onFilterChange, onAddClick }) => {
  const options = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const handleToggle = (val) => {
    onFilterChange(val);
  };

  return (
    <>
      <h2>Task Manager</h2>
      <div style={{ display: 'flex', gap: 'var(--spacing-3)', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search tasks..." 
            value={search} 
            onChange={onSearchChange} 
            style={{ width: '250px', paddingRight: '32px' }}
          />
          {search && (
            <button
              onClick={() => onSearchChange({ target: { value: '' } })}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                lineHeight: '1',
                color: 'var(--color-text-muted)',
                padding: '0',
                display: 'grid',
                placeItems: 'center'
              }}
              title="Clear search"
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>
        {/* Multi-Select Filters */}
        <div style={{ 
          display: 'flex', 
          gap: '12px'
        }}>
          {options.map(option => {
            const isActive = statusFilter === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleToggle(option.value)}
                className={`filter-btn ${isActive ? 'active' : ''}`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <button className="btn btn-primary" onClick={onAddClick}>+ Add Task</button>
      </div>
    </>
  );
};

export default Header;
