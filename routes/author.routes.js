const express = require('express');
const router = express.Router();
const { 
    addAuthor, 
    getAuthors, 
    getAuthorById, 
    updateAuthor, 
    deleteAuthor
} = require('../controllers/author.controller');

router.post('/', addAuthor);
router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;