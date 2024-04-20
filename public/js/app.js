document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        username: username,
        email: email,
        password: password
    };

    registerUser(userData);
});

function displayErrorMessage(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
}

function registerUser(userData) {
    fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            displayErrorMessage(data.message);
        } else {
            alert('Registration Successful!');
            window.location.href = 'login.html'; // Redirect to login page
        }
    })
    .catch(error => {
        displayErrorMessage('An error occurred. Please try again later.');
    });
}
