const Joi = require('joi');

const educationSchema = Joi.object({
    degree: Joi.string().min(2).max(50).required(),
    branch: Joi.string().required(),
    grade: Joi.string().required(),
    collageName: Joi.string().min(3).max(100).required(),
    city: Joi.string().min(2).max(100).required(),
    passingYear: Joi.string().required(),
});

module.exports = {
    educationSchema,
};