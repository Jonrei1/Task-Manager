const Task = require('../models/Task');

const getTasks = async (req, res, next) => {
  try {
    const { search, status } = req.query;
    let baseFilter = {};

    if (search) {
      baseFilter.title = { $regex: search, $options: 'i' };
    }

    const totalCount = await Task.countDocuments(baseFilter);
    const activeCount = await Task.countDocuments({ ...baseFilter, completed: false });
    const completedCount = await Task.countDocuments({ ...baseFilter, completed: true });

    let filter = { ...baseFilter };
    if (status === 'active') {
      filter.completed = false;
    } else if (status === 'completed') {
      filter.completed = true;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      data: tasks,
      stats: { total: totalCount, active: activeCount, completed: completedCount }
    });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Title is required and must be a valid string' });
    }

    const task = await Task.create({ 
      title: title.trim(), 
      description: description ? description.trim() : '' 
    });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    
    if (title !== undefined && (!title || typeof title !== 'string' || !title.trim())) {
      return res.status(400).json({ success: false, message: 'Title must be a valid string' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: 'after', runValidators: true }
    );
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const toggleTask = async (req, res, next) => {
  try {
    const { completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed },
      { returnDocument: 'after', runValidators: true }
    );
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  toggleTask,
  deleteTask
};
