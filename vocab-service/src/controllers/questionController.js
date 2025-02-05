const { getAllQuestions, getQuestionById,getRandomQuestion } = require('../models/questionModel');

const fetchAllQuestions = async (req, res, next) => {
    try {
        const questions = await getAllQuestions();
        res.json(questions);
    } catch (err) {
        next(err);
    }
};

const fetchQuestionById = async (req, res, next) => {
    try {
        const question = await getQuestionById(req.params.id);
        if (!question) return res.status(404).json({ error: 'Question not found' });
        res.json(question);
    } catch (err) {
        next(err);
    }
};

const fetchRandomQuestion = async (req, res, next) => {
    try{
        const question = await getRandomQuestion();
        if(!question) return res.status(404).json({error:'No Question sent from DB'});
        res.json(question);
    }

    catch(err){
    next(err);
    }
}

module.exports = { fetchAllQuestions, fetchQuestionById,fetchRandomQuestion };
