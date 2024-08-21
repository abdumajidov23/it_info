const Description = require('../schemas/description');
const { errorHandler } = require('../helpers/error_handler');

const addDescription = async (req, res) => {
    try {
        const { category_id, description } = req.body;
        const newDescription = await Description.create({ category_id, description });
        res.status(201).send({ message: "Yangi tavsif qo'shildi", newDescription });
    } catch (error) {
        errorHandler(res, error);
    }
};


const getDescriptions = async (req, res) => {
    try {
        const descriptions = await Description.find({});
        res.send(descriptions);
    } catch (error) {
        errorHandler(res, error);
    }
};

const getDescriptionById = async (req, res) => {
    try {
        const description = await Description.findById(req.params.id);
        if (!description) return res.status(404).send({ message: "Tavsif topilmadi" });
        res.send(description);
    } catch (error) {
        errorHandler(res, error);
    }
};

const updateDescription = async (req, res) => {
    try {
        const { description } = req.body;
        const { id } = req.params;

        // Tavsifni ID bo'yicha yangilash
        const updatedDescription = await Description.findByIdAndUpdate(
            id,
            { description },
            { new: true }
        );

        if (!updatedDescription) {
            return res.status(404).send({ message: "Tavsif topilmadi" });
        }

        res.status(200).send({ message: "Tavsif yangilandi", updatedDescription });
    } catch (error) {
        errorHandler(res, error);
    }
};



const deleteDescription = async (req, res) => {
    try {
        const deletedDescription = await Description.findByIdAndDelete(req.params.id);
        if (!deletedDescription) return res.status(404).send({ message: "Tavsif topilmadi" });
        res.send({ message: "Tavsif o'chirildi" });
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports = {
    addDescription,
    getDescriptions,
    getDescriptionById,
    deleteDescription,
    updateDescription,
};