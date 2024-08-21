const express = require('express');
const router = express.Router();
const {
    addSynonym,
    getSynonyms,
    getSynonymById,
    updateSynonym,
    deleteSynonym
} = require('../controllers/synonym.controller');

router.post('/synonyms', addSynonym);
router.get('/synonyms', getSynonyms);
router.get('/synonyms/:id', getSynonymById);
router.put('/synonyms/:id', updateSynonym);
router.delete('/synonyms/:id', deleteSynonym);

module.exports = router;