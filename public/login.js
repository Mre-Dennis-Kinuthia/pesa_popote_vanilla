document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email,
        password,
    };

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const data = await response.json();
            document.location.replace('/dashboard.html');
            console.log(data);
        } else {
            console.error('Failed to login');
        }
    } catch (error) {
        console.error(error);
    }
      form.reset(); // Reset the form fields
});