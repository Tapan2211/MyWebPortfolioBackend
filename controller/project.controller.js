const {
    createProjectDoc,
    getProjectDoc,
    updateProjectDoc,
    deleteProjectDoc
} = require('../services/project.service');
const message = require('../config/messages');

const createProject = async (req, res) => {
    try {
        const { projectName, demoLink, gitLink } = req.body;
        const projectImage = req.file ? `/uploads/${req.file.filename}` : null;

        if (!projectName || !demoLink || !gitLink || !projectImage) {
            return res.status(400).json({ message: message.errors.ALL_FIELD_REQUIRED });
        }

        // Construct the project object
        const project = {
            projectName,
            demoLink,
            gitLink,
            projectImage
        };

        const data = await createProjectDoc(project);
        // Modify the response to return the full URL for projectImage
        const fullProjectImageUrl = `${req.protocol}://${req.get('host')}${data.projectImage}`;

        const responseData = {
            projectName: data.projectName,
            demoLink: data.demoLink,
            gitLink: data.gitLink,
            projectImage: fullProjectImageUrl,
            _id: data._id,
            __v: data.__v
        };
        res.status(201).json({ message: message.success.SUCCESSFULLY_CREATE, data: responseData });
    } catch (error) {
        console.error(message.errors.PEOJECT_CREATED_ERROR, error);
        return res.status(400).json({ message: message.errors.PEOJECT_CREATED_ERROR, error: error.message });
    }
}

const getProjects = async (req, res) => {
    const projects = await getProjectDoc();
    if (!projects || projects.length === 0) {
        return res.status(400).json({ message: message.NO_RECORD_FOUND });
    }

    const fullProjectsDetails = projects.map(project => ({
        ...project._doc,
        projectImage: `${req.protocol}://${req.get('host')}${project.projectImage}`
    }));

    return res.status(200).json(fullProjectsDetails);

}

const updateProject = async (req, res) => {
    const { projectName, demoLink, gitLink } = req.body;
    const projectImage = req.file ? `/uploads/${req.file.filename}` : null; // Get the uploaded file path if it exists
    const { id } = req.params;

    try {
        const updateProject = await updateProjectDoc(
            id,
            projectName,
            demoLink,
            gitLink,
            projectImage
        );

        if (!updateProject) {
            return res.status(404).json({ message: message.NO_RECORD_FOUND, data: updateProject });
        }
        const data = await updateProjectDoc(updateProject);
        // Modify the response to return the full URL for projectImage
        const fullProjectImageUrl = `${req.protocol}://${req.get('host')}${data.projectImage}`;

        const updatedResponseData = {
            projectName: data.projectName,
            demoLink: data.demoLink,
            gitLink: data.gitLink,
            projectImage: fullProjectImageUrl,
            _id: data._id,
            __v: data.__v
        };
        res.status(200).json({ message: message.success.SUCCESSFULLY_UPDATED, data: updatedResponseData })
    } catch (error) {
        console.error(message.errors.PROJECT_UPDATE_ERROR, error);
        return res.status(500).json({ message: message.errors.PROJECT_UPDATE_ERROR, error: error.message });
    }
}

const deleteProject = async (req, res) => {
    try {
        const projectID = req.params.id;
        const result = await deleteProjectDoc(projectID);
        return res.status(200).json({ message: message.success.SUCCESSFULLY_DELETE, result });
    } catch (error) {
        console.error(message.errors.PROJECT_DELETE_ERROR, error);
        return res.status(500).json({ message: message.errors.PROJECT_DELETE_ERROR, error: error.message });
    }
}

module.exports = { createProject, getProjects, updateProject, deleteProject };
