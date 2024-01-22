const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const prettyjson = require('prettyjson');

const session = require('express-session');
const bodyParser = require('body-parser');
const port = 3000;


const { v4: uuidv4 } = require('uuid');
const secretKey = uuidv4();

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Handle the root URL
app.get('/', (req, res) => {
    // Assuming index.html is located in the "pages" directory
    const filePath = path.join(__dirname, 'pages', 'index.html');
    res.sendFile(filePath, (error) => {
        if (error) {
            console.error('Error sending file:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Serve the register.html file
app.get('/register.html', (req, res) => {
    const filePath = path.join(__dirname, 'pages', 'register.html');

    res.sendFile(filePath, (error) => {
        if (error) {
            console.error('Error sending file:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Register endpoint
app.post('/register', async (req, res) => {
    const { firstname, lastname, email, password, phone } = req.body;
    console.log('Request Body:', req.body); // Debug statement
    
    if (!email || !firstname || !lastname || !phone || !password) {
        console.log('Missing fields:', { email, firstname, lastname, phone, password }); // Debug statement
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const user = await prisma.user.create({
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                phone: phone,
            },
        });

        res.json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user', errorMessage: error.message });
    }
});

// Serve the login.html file
app.get('/login.html', (req, res) => {
    const filePath = path.join(__dirname, 'pages', 'login.html');

    res.sendFile(filePath, (error) => {
        if (error) {
            console.error('Error sending file:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Store the user ID in the session
        req.session.userId = user.id;

        res.json({ message: 'Login successful', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to perform login' });
    }
});

// Serve the dashboard.html file
app.get('/dashboard.html', async (req, res) => {
    const filePath = path.join(__dirname, 'views', 'dashboard.html');

    const userId = req.session.userId; // Assuming you have the user ID stored in the session

    try {
        const user = await getUserInfo(userId);
        res.render('dashboard', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

async function getUserInfo(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
}

// Start the server
app.listen(port, () => {
    console.log('Server is running on port 3000');
});
