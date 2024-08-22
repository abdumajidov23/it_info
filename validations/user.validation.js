const Joi = require('joi');

const userValidationSchema = Joi.object({
    user_name: Joi.string().min(3).max(30).required(),
    user_email: Joi.string().email().required(),
    user_password: Joi.string().min(6).required(),
    user_info: Joi.string().optional(),
    user_photo: Joi.string().uri().optional(),
    user_is_active: Joi.boolean().required()
});

const authorValidation = (data) => {
    return userValidationSchema.validate(data);
};

module.exports = { authorValidation };