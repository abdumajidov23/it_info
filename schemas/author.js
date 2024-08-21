const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    author_first_name: { type: String, required: true },
    author_last_name: { type: String, required: true },
    author_nick_name: { type: String },
    author_email: { type: String, required: true, unique: true },
    author_phone: { type: String, required: true },
    author_password: { type: String, required: true },
    author_info: { type: String },
    author_position: { type: String },
    author_photo: { type: String },
    is_expert: { type: Boolean, default: false },
    author_is_active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Author', AuthorSchema);