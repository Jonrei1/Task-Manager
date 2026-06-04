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
      <h2 className="header-title">Task Manager</h2>
      <div className="header-controls">
        <div className="search-container">
          <input 
            type="text" 
            className="input-field search-input" 
            placeholder="Search tasks by title or description..." 
            value={search} 
            onChange={onSearchChange} 
          />
          {search && (
            <button
              onClick={() => onSearchChange({ target: { value: '' } })}
              className="clear-search-btn"
              title="Clear search"
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>
        {/* Multi-Select Filters */}
        <div className="filter-group">
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

        <button className="btn btn-primary add-task-btn" onClick={onAddClick}>+ Add Task</button>
      </div>
    </>
  );
};

export default Header;
