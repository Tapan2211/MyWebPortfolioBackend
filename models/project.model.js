const mongoose = require('mongoose');
const validator = require('validator');

const projectSchema = new mongoose.Schema({
    projectName: { type: String, unique: true, required: true },
    demoLink: {
        type: String,
        validate: {
            validator: (value) => validator.isURL(value),
            message: 'Invalid demo project URL'
        }
    },
    gitLink: {
        type: String,
        validate: {
            validator: (value) => validator.isURL(value),
            message: 'Invalid Git URL'
        }
    },
    projectImage: {
        type: String,
        validate: {
            validator: (value) => validator.isURL(value) || /^\/uploads\//.test(value),
            message: 'Invalid URL or file path'
        }
    }
});

const projectModel = mongoose.model('project', projectSchema);
module.exports = projectModel;
