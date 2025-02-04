
const {getAllWords,getWordById}=require('../models/wordModel');

const fetchAllWords = async (req, res, next) => {
    try {
        const words = await getAllWords();
        res.json(words);
    } catch (err) {
        next(err);
    }
}

const fetchWordById = async (req, res, next) => {
    try{
        const word=await getWordById(req.params.id);
    }
    catch(err){
        next(err);
    }
}

module.exports = {fetchAllWords,fetchWordById};