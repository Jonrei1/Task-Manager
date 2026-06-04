const StatCards = ({ stats = { total: 0, active: 0, completed: 0 } }) => {
  const { total, active, completed } = stats;

  return (
    <>
      <div className="glass-panel stat-card">
        <span className="label">Total Tasks</span>
        <span className="value">{total}</span>
      </div>
      <div className="glass-panel stat-card">
        <span className="label">Active</span>
        <span className="value">{active}</span>
      </div>
      <div className="glass-panel stat-card">
        <span className="label">Completed</span>
        <span className="value">{completed}</span>
      </div>
    </>
  );
};

export default StatCards;
