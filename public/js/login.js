window.onload = function () {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
        window.location.href = 'taskManager.html'; // Redirect to task manager page
    }
};

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessages = document.getElementById('errorMessages');

    if (!email || !password) {
        errorMessages.textContent = 'Both email and password are required.';
        errorMessages.classList.remove('d-none');
        return;
    }

    fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.accessToken) {
            sessionStorage.setItem('accessToken', data.accessToken); // Save access token in session
            sessionStorage.setItem('userName', data.userName); // Save username in session
            sessionStorage.setItem('flash', 'Welcome back!'); // Save a flash message for welcome back
            window.location.href = 'taskManager.html'; // Redirect to task manager page
        } else {
            errorMessages.textContent = data.error || 'Login failed. Please try again.';
            errorMessages.classList.remove('d-none');
        }
    })
    .catch(error => {
        errorMessages.textContent = 'An error occurred. Please try again.';
        errorMessages.classList.remove('d-none');
    });
});

document.getElementById('email').addEventListener('blur', function () {
    const email = this.value;
    fetch('http://localhost:5001/api/users/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        const errorMessages = document.getElementById('errorMessages');
        if (data.exists) {
            errorMessages.textContent = ''; // Clear any error messages if email exists
            errorMessages.classList.add('d-none');
        } else {
            errorMessages.textContent = 'Email does not exist.';
            errorMessages.classList.remove('d-none');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
