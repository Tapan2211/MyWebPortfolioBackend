const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
    companyName: { type: String, required: true },
    position: { type: String, required: true },
    city: { type: String, required: true },
    year: { type: String, required: true },
    currentWorking: { type: String },
    startingDate: { type: String, required: true },
});

const experienceModel = mongoose.model('experienc', experienceSchema);
module.exports = experienceModel;