const Joi = require('joi');

const skillsSchema = Joi.object({
    skill: Joi.string().min(2).max(50).required(),
    image: Joi.string().required().custom((value, helpers) => {
        if (!value.startsWith('/uploads/') && !Joi.string().uri().validate(value).error) {
            return helpers.error('any.invalid');
        }
        return value;
    }, 'Skill Image Validation')
});

module.exports = { skillsSchema };
