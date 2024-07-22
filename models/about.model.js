const mongoose = require('mongoose');
const validator = require('validator');

const aboutSchema = new mongoose.Schema({
    info: { type: String, required: true },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isURL(value) || /^uploads\//.test(value);
            },
            message: 'Invalid URL or file path'
        }
    },
    pdf: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isURL(value) || /^uploads\//.test(value);
            },
            message: 'Invalid URL or file path'
        }
    }
}, { timestamps: true });

const aboutModel = mongoose.model('about', aboutSchema);
module.exports = aboutModel;
