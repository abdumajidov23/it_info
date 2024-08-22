const Category = require('../schemas/cotegory')
const { errorHandler } = require('../helpers/error_handler');
const Joi = require('joi');
const { categoryValidation } = require('../validations/category.validation');

const addCategory = async (req, res) => {
    try {
        // Validatsiya qilish
        const { error, value } = categoryValidation(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const newCategory = new Category({
            category_name: value.category_name,
            parent_category_id: value.parent_category_id,
        });

        await newCategory.save();
        res.status(201).send({ message: "Kategoriya qoshildi", newCategory });
    } catch (error) {
        errorHandler(res, error);
    }
};


const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (error) {
        errorHandler(res, error);
    }
};


const updateCategory = async (req, res) => {
    try {
        const { category_name, parent_category_id } = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id, { category_name, parent_category_id }, { new: true });
        if (!category) return res.status(404).send({ message: 'Kategoriya topilmadi' });
        res.send({ message: 'Kategoriya muvaffaqiyatli yangilandi', category });
    } catch (error) {
        errorHandler(res, error);
    }
};


const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).send({ message: 'Kategoriya topilmadi' });
        res.send({ message: 'Kategoriya muvaffaqiyatli o\'chirildi' });
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports ={
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory,
}