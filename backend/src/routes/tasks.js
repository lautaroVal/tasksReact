const express = require('express');
const router = express.Router();
const {list, addTask, updateTask, removeTask} = require('../controllers/tasksController');

router

    .get('/api/tasks', list)
    .post('/api/tasks', addTask)
    .put('/api/tasks/:id',updateTask)
    .delete('/api/tasks/:id',removeTask)

module.exports = router

