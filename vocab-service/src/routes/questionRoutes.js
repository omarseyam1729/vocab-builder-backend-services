const express = require('express');
const { fetchAllQuestions, fetchQuestionById } = require('../controllers/questionController');

const router = express.Router();
router.get('/', fetchAllQuestions);
router.get('/:id', fetchQuestionById);

module.exports = router;
