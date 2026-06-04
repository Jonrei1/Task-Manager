import TaskCard from './TaskCard';

const TaskList = ({ tasks, loading, onToggle, onEdit, onDelete }) => {
  if (loading) {
    return <div style={{ color: 'var(--color-text-muted)' }}>Loading...</div>;
  }

  if (!tasks || tasks.length === 0) {
    return <div style={{ color: 'var(--color-text-muted)' }}>No tasks found</div>;
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskCard 
          key={task._id} 
          task={task} 
          onToggle={onToggle} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default TaskList;
