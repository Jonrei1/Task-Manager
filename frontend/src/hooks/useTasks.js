import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, toggleTask, deleteTask } from '../api/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); 
  const [dateFilter, setDateFilter] = useState('');
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

      let startDate = '';
      let endDate = '';
      if (dateFilter) {
        const start = new Date(`${dateFilter}T00:00:00`);
        const end = new Date(`${dateFilter}T23:59:59.999`);
        startDate = start.toISOString();
        endDate = end.toISOString();
      }

      const response = await fetchTasks(debouncedSearch, backendStatus, startDate, endDate);
      setTasks(response.data.data);
      if (response.data.stats) {
        setStats(response.data.stats);
      }
    } catch (err) {
      setError(err.message || 'Failed to load tasks. Please try again.');
    } finally {
      if (showLoading) setLoading(false);
    }
  }, [debouncedSearch, statusFilter, dateFilter]);

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

  const removeTaskOptimistic = useCallback((id) => {
    setTasks(prev => prev.filter(t => t._id !== id));
  }, []);

  const undoRemoveTaskOptimistic = useCallback((task) => {
    setTasks(prev => {
      const newTasks = [...prev, task];
      return newTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    });
  }, []);

  const commitDeleteTask = useCallback(async (id) => {
    try {
      await deleteTask(id);
      await loadTasks(false);
    } catch (err) {
      setError(err.message || 'Failed to delete task.');
    }
  }, [loadTasks]);

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
    dateFilter,
    setDateFilter,
    stats,
    loadTasks,
    addTask,
    editTask,
    toggleComplete,
    removeTask,
    removeTaskOptimistic,
    undoRemoveTaskOptimistic,
    commitDeleteTask
  };
};
