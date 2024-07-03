const Joi = require('joi');

const experienceSchema = Joi.object({
    companyName: Joi.string().min(2).max(50).required(),
    position: Joi.string().required(),
    city: Joi.string().required(),
    year: Joi.string().min(1).max(100).required(),
    currentWorking: Joi.string().allow('').optional(),
    startingDate: Joi.string().required(),
});

module.exports = {
    experienceSchema,
};