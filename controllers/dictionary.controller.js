const { 
    errorHandler
} = require("../helpers/error_handler");
const Dictionary = require("../schemas/dictionary")

const addTerm = async(req, res)=>{
    try{
        const { term } = (req.body);
        const dict = await Dictionary.findOne({term:{$regex: term, $options:"i"}});
        if(dict) {
            return res.status(400).send({message: "Bu termin allaqachon mavjud"});
        }
        const newDictionary = await Dictionary.create({
            term,
            letter:term[0],
        });

        res.status(201).send({
            message:"Yangi termin qoshildi", 
            newDictionary});
    }catch(error){
        errorHandler(res,error)
    }
};

const getDictionary = async(req, res) => {
    try{
        const dictionaries = await Dictionary.find({});
        res.send(dictionaries);
    }catch(error){
        errorHandler(res,error)
    }
};

const getDictioanryById = async(req, res) => {
    try{
        const dictionary = await Dictionary.findById(req.params.id);
        if(!dictionary) return res.status(404).send({message: "Termin topilmadi"});
        res.send(dictionary);
    }catch(error){
        errorHandler(res,error)
    }
};

const updateDictioanry = async(req, res) => {
    try{
        const { term, letter } = req.body;
        const dictionary = await Dictionary.findByIdAndUpdate(req.params.id, { term, letter }, {new: true});
        if(!dictionary) return res.status(404).send({message: "Termin topilmadi"});
        res.send(dictionary);
    }catch(error){
        errorHandler(res,error)
    }
};

const deleteDictioanry = async(req, res) => {
    try{
        const dictionary = await Dictionary.findByIdAndDelete(req.params.id);
        if(!dictionary) return res.status(404).send({message: "Termin topilmadi"});
        res.send(dictionary);
    }catch(error){
        errorHandler(res,error)
    }
};


const getTermsByQuery = async(req, res)=>{
    try{
        const { term } = req.query;
        const dictionaries = await Dictionary.find({ term: {$regex: term, $options:"i"}});
        res.send(dictionaries);
    }catch(error){
        errorHandler(res,error)
    }
}


module.exports = {
    addTerm,
    getDictionary,
    getDictioanryById,
    updateDictioanry,
    deleteDictioanry,
    getTermsByQuery
}
