const express = require('express');
const {fetchAllWords,fetchWordById,fetchRandomWord } = require('../controllers/wordController');

const router = express.Router();

router.get('/',fetchAllWords);
router.get('/random',fetchRandomWord);
router.get('/:id',fetchWordById);

module.exports = router;
