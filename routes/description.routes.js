const express = require('express');
const router = express.Router();
const {
    addDescription,
    getDescriptions,
    getDescriptionById,
    updateDescription,
    deleteDescription
} = require('../controllers/description.controller');

router.post('/', addDescription);
router.get('/', getDescriptions);
router.get('/:id', getDescriptionById);
router.put('/:id', updateDescription);
router.delete('/:id', deleteDescription);

module.exports = router;
