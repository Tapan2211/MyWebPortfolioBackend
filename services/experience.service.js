const experienceModel = require('../models/experience.model');

const createExperienceDoc = async (experience) => {
    const data = await experienceModel(experience);
    const result = data.save();
    return result;
}

const getExperienceDoc = async () => {
    try {
        const result = await experienceModel.find();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateExperienceDoc = async (id, experience) => {
    return await experienceModel.findByIdAndUpdate(id, experience, { new: true });
}

const deleteExperienceDoc = async (id) => {
    const result = await experienceModel.findByIdAndDelete(id);
    return result;
}

module.exports = {
    createExperienceDoc,
    getExperienceDoc,
    updateExperienceDoc,
    deleteExperienceDoc
}