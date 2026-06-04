const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <div className={`glass-panel task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-card-body">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={(e) => onToggle(task._id, e.target.checked)} 
          aria-label={`Toggle completion for task: ${task.title}`}
        />
        <div className="content">
          <div className="title">{task.title}</div>
          {task.description && <div className="description">{task.description}</div>}
        </div>
      </div>
      <div className="task-card-footer">
        <span className={`badge ${task.completed ? 'completed' : 'active'}`}>
          {task.completed ? 'Completed' : 'Active'}
        </span>
        <div className="task-actions">
          <button className="btn btn-ghost" onClick={() => onEdit(task)}>Edit</button>
          <button className="btn btn-danger" onClick={() => onDelete(task._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
