const Joi = require('joi');

const validateAbout = (data) => {
    const schema = Joi.object({
        info: Joi.string().required()
    });
    return schema.validate(data); // Corrected function call here
}

module.exports = validateAbout;
