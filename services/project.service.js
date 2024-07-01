const projectModel = require('../models/project.model');

const createProjectDoc = async (project) => {
    const data = await projectModel(project);
    const result = await data.save();
    return result;
}

const getProjectDoc = async () => {
    try {
        const result = await projectModel.find();
        return result;
    } catch (error) {
        throw error;
    }
}

const updateProjectDoc = async (id, projectName, demoLink, gitLink, projectImage) => {
    try {
        const updateData = {
            id,
            projectName,
            demoLink,
            gitLink,
        };
        if (projectImage) updateData.projectImage = projectImage;
        return await projectModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        console.error("Error in updateProject :", error);
        throw error;
    }
}

const deleteProjectDoc = async (id) => {
    try {
        const result = await projectModel.findOneAndDelete({ _id: id });
        return result;
    } catch (error) {
        console.error("Error in deleteProject:", error);
        throw error;
    }
}

module.exports = {
    createProjectDoc,
    getProjectDoc,
    updateProjectDoc,
    deleteProjectDoc
}