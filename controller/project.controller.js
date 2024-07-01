const {
    createProjectDoc,
    getProjectDoc,
    updateProjectDoc,
    deleteEducationDoc
} = require('../services/project.service');

const createProject = async (req, res) => {
    try {
        const { projectName, demoLink, gitLink } = req.body;
        const projectImage = req.file ? `/uploads/${req.file.filename}` : null;

        if (!projectName || !demoLink || !gitLink || !projectImage) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Log the project image path for debugging
        console.log('projectImage:', projectImage);

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
        res.status(201).json({ message: 'Project created successfully', data: responseData });
    } catch (error) {
        console.error('Error creating project:', error);
        return res.status(400).json({ message: 'Error creating project', error: error.message });
    }
}

const getProjects = async (req, res) => {
    const projects = await getProjectDoc();
    if (!projects || projects.length === 0) {
        return res.status(400).json({ message: 'No record found' });
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
            return res.status(404).json({ message: 'Category not found', data: updateProject });
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
        res.status(200).json({ message: 'Category updated successfully', data: updatedResponseData })
    } catch (error) {
        console.error("Error updating Project:", error);
        return res.status(500).json({ message: 'Error updating Category', error: error.message });
    }
}

const deleteProject = async (req, res) => {
    try {
        const projectID = req.params.id;
        const result = await deleteEducationDoc(projectID);
        return res.status(200).json({ message: 'Successfully deleted', result });
    } catch (error) {
        console.error("Error deleting project:", error); // Log the error details
        return res.status(500).json({ message: 'Could not delete project', error: error.message });
    }
}

module.exports = { createProject, getProjects, updateProject, deleteProject };
