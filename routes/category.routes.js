const express = require('express');
const router = express.Router();
const {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require('../controllers/cotegory.controller');

router.post('/create', addCategory);
router.get('/', getCategories);
router.delete('/:id', deleteCategory);
router.put('/update/:id', updateCategory);

module.exports = router