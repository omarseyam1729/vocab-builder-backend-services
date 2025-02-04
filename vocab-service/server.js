require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('./src/middlewares/rateLimiter');
const wordRoutes = require('./src/routes/wordRoutes');
const questionRoutes = require('./src/routes/questionRoutes');
const { connectDB } = require('./src/config/db');

const app = express();
app.use(express.json()); 
app.use(helmet()); 
app.use(cors()); 
app.use(rateLimiter); 
connectDB();


app.use('/api/words', wordRoutes);
app.use('/api/questions', questionRoutes);


app.get('/', (req, res) => {
    res.json({ message: 'Vocab Service is running ' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Vocab Service running on port ${PORT}`);
});
