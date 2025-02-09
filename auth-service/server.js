const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const register = require('./api/register');
const login = require('./api/login');
dotenv.config();
const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function checkDatabaseConnection() {
    try {
        await prisma.$connect();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); 
    }
}



app.use('/api/register', register);
app.use('/api/login',login);




app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await checkDatabaseConnection(); 
    console.log(` Server is running on port ${PORT}`);
});

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    console.log(' Prisma disconnected.');
    process.exit(0);
});
