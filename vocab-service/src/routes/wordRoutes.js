const express = require('express');
const {fetchAllWords,fetchWordById } = require('../controllers/wordController');

const router = express.Router();

router.get('/',fetchAllWords);
router.get('/:id',fetchWordById);

module.exports = router;
