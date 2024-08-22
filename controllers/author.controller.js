const { errorHandler } = require('../helpers/error_handler');
const author = require('../schemas/author');
const { authorValidation } = require('../validations/author.validation');

const addAuthor = async (req, res) => {
    try {
        const { error, value } = authorValidation(req.body);

        if (error) {
            return res.status(400).send({ message: error.details.map(x => x.message).join(', ') });
        }

        const newAuthor = await author.create(value);

        res.status(201).send({ message: "Yangi muallif qo'shildi", newAuthor });
    } catch (error) {
        errorHandler(res, error);
    }
};


const getAuthors = async (req, res) => {
    try {
        const authors = await author.find();
        res.status(200).send(authors);
    } catch (error) {
        errorHandler(res, error);
    }
};

const getAuthorById = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await author.findById(id);
        if (!author) return res.status(404).send({ message: "Muallif topilmadi" });
        res.status(200).send(author);
    } catch (error) {
        errorHandler(res, error);
    }
};

const updateAuthor = async (req, res) => {
    try {
        const { 
            author_first_name, 
            author_last_name, 
            author_nick_name, 
            author_email, 
            author_phone, 
            author_password, 
            author_info, 
            author_position, 
            author_photo, 
            is_expert, 
            author_is_active 
        } = req.body;

        const { id } = req.params;

        const updatedAuthor = await author.findByIdAndUpdate(id, { 
            author_first_name, 
            author_last_name, 
            author_nick_name, 
            author_email, 
            author_phone, 
            author_password, 
            author_info, 
            author_position, 
            author_photo, 
            is_expert, 
            author_is_active 
        }, { new: true });

        if (!updatedAuthor) return res.status(404).send({ message: "Muallif topilmadi" });

        res.status(200).send({ message: "Muallif yangilandi", updatedAuthor });
    } catch (error) {
        errorHandler(res, error);
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAuthor = await author.findByIdAndDelete(id);
        if (!deletedAuthor) return res.status(404).send({ message: "Muallif topilmadi" });

        res.status(200).send({ message: "Muallif o'chirildi", deletedAuthor });
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports = {
    addAuthor,
    getAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
};
