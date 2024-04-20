// folder: controllers
// file: taskController.js
const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

// Create Task
exports.createTask = asyncHandler(async (req, res) => {
    const { name, description, priority, dueDate } = req.body;
    if (!name || !description) {
        res.status(400);
        throw new Error('Name and description are required');
    }

    const task = new Task({
        name,
        description,
        priority,
        dueDate,
        user: req.user._id,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
});

// Get all tasks of a user
exports.getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
});

// Update Task
exports.updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    if (task.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
});

// Delete Task
exports.deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    if (task.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await task.remove();
    res.json({ message: 'Task removed' });
});
