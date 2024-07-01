const educationModel = require('../models/education.model');

const createEducationDoc = async (education) => {
    const data = await educationModel(education);
    const result = await data.save();
    return result;
}

const getEducationDoc = async () => {
    try {
        const result = await educationModel.find();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateEducationDoc = async (id, education) => {
    return await educationModel.findByIdAndUpdate(id, education, { new: true });
}

const deleteEducationDoc = async (id) => {
    const result = await educationModel.findByIdAndDelete(id);
    return result;
}

module.exports = {
    createEducationDoc,
    getEducationDoc,
    updateEducationDoc,
    deleteEducationDoc
}