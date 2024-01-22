const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create users
    const user1 = await prisma.user.create({
      data: {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doec@example.com',
        password: 'password123',
        phone: '1234567890',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane.smcith@example.com',
        password: 'password456',
        phone: '9876543210',
      },
    });

    const payment = await prisma.payment.create({
      data: {
        phoneNumber: '0719276044',
        amount: '100.0',
        user: { connect: { id: user1.id } },
      },
    });

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
