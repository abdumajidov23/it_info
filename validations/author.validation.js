const Joi = require('joi');

exports.authorValidation = (data) => {
    const schemaAuthor = Joi.object({
        author_first_name: Joi.string().required().messages({
            'string.empty': "Muallifning ismi kiritilishi shart"
        }),
        author_last_name: Joi.string().required().messages({
            'string.empty': "Muallifning familiyasi kiritilishi shart"
        }),
        author_nick_name: Joi.string().min(4).max(20).messages({
            'string.min': "Muallifning taxallusi kamida 4 ta harfdan iborat bo'lishi kerak",
            'string.max': "Muallifning taxallusi 20 ta harfdan oshmasligi kerak"
        }),
        author_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required().messages({
            'string.pattern.base': "Parol 6 tadan 30 tagacha bo'lgan harflar va raqamlardan iborat bo'lishi kerak"
        }),
        confirmations: Joi.ref('author_password'),
        author_email: Joi.string().email().lowercase().required().messages({
            'string.email': "Elektron pochta noto'g'ri formatda kiritilgan"
        }),
        author_phone: Joi.string().pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/).required().messages({
            'string.pattern.base': "Telefon raqami 00-000-00-00 formatida bo'lishi kerak"
        }),
        author_info: Joi.string().optional(),
        author_position: Joi.string().optional(),
        author_photo: Joi.string().default("/foto/avatar.png"),
        is_expert: Joi.boolean().default(false),
        author_is_active: Joi.boolean().default(false),
        gender: Joi.string().valid("erkak", "ayol"),
        birthday: Joi.date().less('2000-01-01').greater('1980-01-01').messages({
            'date.less': "Tug'ilgan sana 2000 yil 1-yanvardan oldin bo'lishi kerak",
            'date.greater': "Tug'ilgan sana 1980 yil 1-yanvardan keyin bo'lishi kerak"
        }),
        referred: Joi.boolean().default(false),
        referredDetails: Joi.string().when('referred', {
            is: true,
            then: Joi.string().required(),
            otherwise: Joi.optional(),
        }),
        coding_langs: Joi.array().items(Joi.string(), Joi.number()).default([]),
        is_year: Joi.string().valid("YES", "NO").required()
    });

    return schemaAuthor.validate(data, { abortEarly: false });
};
