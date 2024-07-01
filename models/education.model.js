const mongoose = require('mongoose');
const validator = require('validator');

const educationSchema = mongoose.Schema({
    degree: { type: String, required: true },
    branch: { type: String, required: true },
    grade: { type: String, required: true },
    collageName: { type: String, required: true },
    city: { type: String, required: true },
    passingYear: { type: String, required: true },
});

const educationModule = mongoose.model('education', educationSchema);
module.exports = educationModule;