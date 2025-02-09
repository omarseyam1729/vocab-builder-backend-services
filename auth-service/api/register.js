const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

     
        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: '7d' });

        res.status(201).json({
            message: "User registered successfully",
            token
        });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;
