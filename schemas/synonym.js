const mongoose = require('mongoose');

const SynonymSchema = new mongoose.Schema({
    desc_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Description',
        required: true,
    },
    dict_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dictionary',
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Synonym', SynonymSchema);
