const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        
        const user = await prisma.user.findUnique({
            where: { email }
        });
        
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        
        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '7d' });
        
        res.status(200).json({
            message: "Login successful",
            token
        });
        
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;
