const mongoose = require('mongoose');
const validator = require('validator');  // Import the validator library

const skillsSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Check if the value starts with '/uploads/' or is a valid URL
                return value.startsWith('/uploads/') || validator.isURL(value, { protocols: ['http', 'https'], require_protocol: true });
            },
            message: props => `${props.value} is not a valid URL or does not start with '/uploads/'!`
        }
    }
});

const skillModel = mongoose.model('skills', skillsSchema);
module.exports = skillModel;