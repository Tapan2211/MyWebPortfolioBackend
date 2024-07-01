const Joi = require('joi');

const createUserSchema = Joi.object({
    fullname: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    mobile: Joi.number().required(),
    address: Joi.string().min(10).max(100).required()
});

module.exports = {
    createUserSchema,
};