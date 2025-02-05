const { pool } = require('../config/db');

const getAllQuestions = async () => {
    const [rows] = await pool.query('SELECT * FROM questions');
    return rows;
};

const getQuestionById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM questions WHERE id = ?', [id]);
    return rows[0]; 
};
const getRandomQuestion = async () => {
    const [rows] = await pool.query('SELECT * FROM questions ORDER BY RAND() LIMIT 1');
    return rows[0];
};
module.exports = { getAllQuestions, getQuestionById,getRandomQuestion };
