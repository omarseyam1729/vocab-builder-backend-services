
const {getAllWords,getWordById,getRandomWord}=require('../models/wordModel');

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
        res.json(word);
    }
    catch(err){
        next(err);
    }
}
const fetchRandomWord = async (req, res, next) => {
    try{
        const word = await getRandomWord();
        if(!word) return res.status(404).json({error:'No Word sent from DB'});
        res.json(word);
    }

    catch(err){
    next(err);
    }
}


module.exports = {fetchAllWords,fetchWordById,fetchRandomWord};