// folder: public/js
// file: taskManager.js

// When the document is ready, it checks for an access token and either loads tasks or redirects to login.
document.addEventListener('DOMContentLoaded', function () {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
        window.location.href = 'login.html';
    } else {
        loadTasks();
    }
    document.getElementById('taskForm').addEventListener('submit', submitTaskForm);
});

// This function handles the form submission for both creating and updating tasks.
function submitTaskForm(event) {
    event.preventDefault();
    const taskId = document.getElementById('taskId').value;
    const taskName = document.getElementById('taskName').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskPriority = document.getElementById('taskPriority').value;

    const taskData = {
        name: taskName,
        dueDate: taskDueDate,
        priority: taskPriority
    };

    if (taskId) {
        updateTask(taskId, taskData);
    } else {
        createTask(taskData);
    }
}

// This function sends a POST request to create a new task.
function createTask(taskData) {
    fetch('http://localhost:5001/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error: ' + data.message);
        } else {
            alert('Task created successfully');
            loadTasks(); // Refresh the task list
        }
    })
    .catch(error => {
        console.error('Error creating task:', error);
    });
}

// This function sends a PUT request to update an existing task.
function updateTask(taskId, taskData) {
    fetch(`http://localhost:5001/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error: ' + data.message);
        } else {
            alert('Task updated successfully');
            loadTasks(); // Refresh the task list
        }
    })
    .catch(error => {
        console.error('Error updating task:', error);
    });
}

// This function fetches and displays tasks from the server.
function loadTasks() {
    fetch('http://localhost:5001/api/tasks', {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    })
    .then(response => response.json())
    .then(tasks => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Clear current tasks
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.name} - Priority: ${task.priority} - Due: ${new Date(task.dueDate).toDateString()}`;
            taskList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error loading tasks:', error);
    });
}

// This function resets the form fields and clears any selected taskId.
function clearForm() {
    document.getElementById('taskForm').reset();
    document.getElementById('taskId').value = '';
}

// This function handles user logout, clears the session storage, and redirects to the login page.
function logout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}

