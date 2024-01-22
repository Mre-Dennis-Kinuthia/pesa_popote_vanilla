document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;

    const userData = {
        firstname,
        lastname,
        email,
        password,
        phone,
    };

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error('Failed to register user');
        }
    } catch (error) {
        console.error(error);
    }
    form.reset(); // Reset the form fields
});
