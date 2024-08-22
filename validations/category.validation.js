const Joi = require('joi');

module.exports.categoryValidation = (data) => {
    const schemaCategory = Joi.object({
        category_name: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({
                "string.empty": "Kategoriya nomini kiritish shart",
                "string.min": "Kategoriya nomi 2ta harfdan uzun bo'lishi kerak",
                "string.max": "Kategoriya nomi 100ta harfdan uzun bo'lmasligi kerak",
                "any.required": "Kategoriya nomi kiritilishi shart"
            }),

        parent_category_id: Joi.string()
            .alphanum()
            .messages({
                "string.alphanum": "ID notog'ri"
            })
    });

    return schemaCategory.validate(data , {abortEarly: false});
};
