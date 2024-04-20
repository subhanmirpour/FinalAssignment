// folder: routes
// file: taskRoutes.js
const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const validateToken = require('../middleware/validateTokenHandler'); 

// Create an instance of the router
const router = express.Router();

router.route('/').post(validateToken, createTask).get(validateToken, getTasks);
router.route('/:id').put(validateToken, updateTask).delete(validateToken, deleteTask);

module.exports = router;
