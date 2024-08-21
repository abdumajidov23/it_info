const { errorHandler } = require('../helpers/error_handler');
const synonym = require('../schemas/synonym');

const addSynonym = async (req, res) => {
    try {
        const { desc_id, dict_id } = req.body;
        const newSynonym = await synonym.create({ desc_id, dict_id });
        res.status(201).send({ message: "Yangi sinonim qo'shildi", newSynonym });
    } catch (error) {
        errorHandler(res, error);
    }
};

const getSynonyms = async (req, res) => {
    try {
        const synonyms = await synonym.find().populate('desc_id dict_id');
        res.status(200).send(synonyms);
    } catch (error) {
        errorHandler(res, error);
    }
};

const getSynonymById = async (req, res) => {
    try {
        const { id } = req.params;
        const synonym = await synonym.findById(id).populate('desc_id dict_id');
        if (!synonym) return res.status(404).send({ message: "Sinonim topilmadi" });
        res.status(200).send(synonym);
    } catch (error) {
        errorHandler(res, error);
    }
};

const updateSynonym = async (req, res) => {
    try {
        const { desc_id, dict_id } = req.body;
        const { id } = req.params;

        const updatedSynonym = await synonym.findByIdAndUpdate(id, { desc_id, dict_id }, { new: true });
        if (!updatedSynonym) return res.status(404).send({ message: "Sinonim topilmadi" });

        res.status(200).send({ message: "Sinonim yangilandi", updatedSynonym });
    } catch (error) {
        errorHandler(res, error);
    }
};

const deleteSynonym = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSynonym = await synonym.findByIdAndDelete(id);
        if (!deletedSynonym) return res.status(404).send({ message: "Sinonim topilmadi" });

        res.status(200).send({ message: "Sinonim o'chirildi", deletedSynonym });
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports = {
    addSynonym,
    getSynonyms,
    getSynonymById,
    updateSynonym,
    deleteSynonym
};