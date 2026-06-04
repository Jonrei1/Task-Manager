import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import Header from './components/Header';
import StatCards from './components/StatCards';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import ConfirmDialog from './components/ConfirmDialog';

function App() {
  const {
    tasks, loading, error, search, setSearch,
    statusFilter, setStatusFilter, stats, addTask, editTask, toggleComplete, removeTask
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleAddClick = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setTaskToDelete(id);
  };

  const handleModalSubmit = async (data) => {
    if (editingTask) {
      await editTask(editingTask._id, data);
    } else {
      await addTask(data);
    }
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await removeTask(taskToDelete);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-header">
        <Header 
          search={search} 
          onSearchChange={(e) => setSearch(e.target.value)} 
          statusFilter={statusFilter}
          onFilterChange={setStatusFilter}
          onAddClick={handleAddClick} 
        />
      </div>
      
      <div className="dashboard-statcards">
        <StatCards stats={stats} />
      </div>
      
      <div className="dashboard-main">
        {error && <div className="error-text">{error}</div>}
        <TaskList 
          tasks={tasks} 
          loading={loading} 
          onToggle={toggleComplete} 
          onEdit={handleEditClick} 
          onDelete={handleDeleteClick} 
        />
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleModalSubmit} 
        initialData={editingTask} 
      />

      <ConfirmDialog 
        isOpen={!!taskToDelete} 
        message="Are you sure you want to delete this task?" 
        onConfirm={handleConfirmDelete} 
        onCancel={() => setTaskToDelete(null)} 
      />
    </div>
  );
}

export default App;
