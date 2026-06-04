const express = require('express');
const router = express.Router();
const {
  getTasks, getTask, createTask, updateTask, toggleTask, deleteTask
} = require('../controllers/taskController');

router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTask).put(updateTask).patch(toggleTask).delete(deleteTask);

module.exports = router;
