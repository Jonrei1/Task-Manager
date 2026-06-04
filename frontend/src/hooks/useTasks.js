import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, toggleTask, deleteTask } from '../api/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); 
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0 });

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const loadTasks = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);
    try {
      let backendStatus = 'all';
      if (statusFilter === 'active') {
        backendStatus = 'active';
      } else if (statusFilter === 'inactive') {
        backendStatus = 'completed';
      }

      const response = await fetchTasks(debouncedSearch, backendStatus);
      setTasks(response.data.data);
      if (response.data.stats) {
        setStats(response.data.stats);
      }
    } catch (err) {
      setError(err.message || 'Failed to load tasks. Please try again.');
    } finally {
      if (showLoading) setLoading(false);
    }
  }, [debouncedSearch, statusFilter]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (data) => {
    try {
      await createTask(data);
      await loadTasks(false);
    } catch (err) {
      setError(err.message || 'Failed to add task.');
      throw err;
    }
  };

  const editTask = async (id, data) => {
    try {
      await updateTask(id, data);
      await loadTasks(false);
    } catch (err) {
      setError(err.message || 'Failed to update task.');
      throw err;
    }
  };

  const toggleComplete = async (id, completed) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task._id === id ? { ...task, completed } : task
    ));
    
    try {
      await toggleTask(id, completed);
      await loadTasks(false);
    } catch (err) {
      setError(err.message || 'Failed to update task status.');
      await loadTasks(false);
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      await loadTasks(false);
    } catch (err) {
      setError(err.message || 'Failed to delete task.');
    }
  };

  return {
    tasks,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    stats,
    loadTasks,
    addTask,
    editTask,
    toggleComplete,
    removeTask
  };
};
