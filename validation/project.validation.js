const Joi = require('joi');

const projectSchema = Joi.object({
    projectName: Joi.string().min(2).max(50).required(),
    demoLink: Joi.string().uri().required(),
    gitLink: Joi.string().uri().required(),
    projectImage: Joi.string().required().custom((value, helpers) => {
        if (!value.startsWith('/uploads/') && !Joi.string().uri().validate(value).error) {
            return helpers.error('any.invalid');
        }
        return value;
    }, 'Project Image Validation')
});

module.exports = { projectSchema };
