const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <div className={`glass-panel task-card ${task.completed ? 'completed' : ''}`}>
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={(e) => onToggle(task._id, e.target.checked)} 
      />
      <div className="content">
        <div className="title">{task.title}</div>
        {task.description && <div className="description">{task.description}</div>}
      </div>
      <span className={`badge ${task.completed ? 'completed' : 'active'}`}>
        {task.completed ? 'Completed' : 'Active'}
      </span>
      <button className="btn btn-ghost" onClick={() => onEdit(task)}>Edit</button>
      <button className="btn btn-danger" onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
};

export default TaskCard;
