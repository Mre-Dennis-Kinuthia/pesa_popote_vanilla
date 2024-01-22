const { createUser } = require('./user');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Example usage
createUser('john@example.com', 'John', 'Doe', '123456789', 'password')
    .then((user) => console.log('User created:', user))
    .catch((error) => console.error('Error creating user:', error))
    .finally(() => prisma.$disconnect());
