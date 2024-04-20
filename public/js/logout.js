// folder: public/js
// file: logout.js

function logout() {
    sessionStorage.clear(); // This will clear all stored session data
    window.location.href = 'login.html'; // Redirect user to the login page
}
