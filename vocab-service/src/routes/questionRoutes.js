const express = require('express');
const { fetchAllQuestions, fetchQuestionById,fetchRandomQuestion } = require('../controllers/questionController');

const router = express.Router();
router.get('/', fetchAllQuestions);
router.get('/random', fetchRandomQuestion);
router.get('/:id', fetchQuestionById);

module.exports = router;
