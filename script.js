//script.js
const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value

    // Perform Prisma registration logic here (backend implementation)
    // Example: Make a POST request to the backend API for registration
    fetch('/register', {
        method: 'POST',
        body: JSON.stringify({ firstname, lastname, email, password, phone }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Handle the response from the server
    })
    .catch(error => {
        console.error(error); // Handle any errors that occur during registration
    });
});

// Login Form
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform Prisma login logic here (backend implementation)
    // Example: Make a POST request to the backend API for login
    fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Handle the response from the server
    })
    .catch(error => {
        console.error(error); // Handle any errors that occur during login
    });
});
