const { pool } = require('../config/db');

const getAllWords = async () => {
    const [rows] = await pool.query('SELECT * FROM words');
    return rows;
};

const getWordById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM words WHERE id = ?', [id]);
    return rows[0]; 
};
const getRandomWord = async () => {
    const [rows] = await pool.query('SELECT * FROM words ORDER BY RAND() LIMIT 1');
    return rows[0];
};
module.exports = { getAllWords, getWordById, getRandomWord };
