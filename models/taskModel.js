// folder: models
// file: taskModel.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the task name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter a description of the task"],
    },
    priority: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low'],
        default: 'Low',
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    dueDate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Task', taskSchema);
