const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    user_email: { type: String, required: true, unique: true },
    user_password: { type: String, required: true },
    user_info: { type: String },
    user_photo: { type: String },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date },
    user_is_active: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', UserSchema);
