const {
    createEducationDoc,
    getEducationDoc,
    updateEducationDoc,
    deleteEducationDoc
} = require('../services/education.service');

const createEducation = async (req, res) => {
    try {

        const { degree, branch, grade, collageName, city, passingYear } = req.body;

        if (!degree || !branch || !grade || !collageName || !city || !passingYear) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Construct the project object
        const education = {
            degree,
            branch,
            grade,
            collageName,
            city,
            passingYear
        };

        const data = await createEducationDoc(education);

        const responseData = {
            degree: data.degree,
            branch: data.branch,
            grade: data.grade,
            collageName: data.collageName,
            city: data.city,
            passingYear: data.passingYear,
            _id: data._id,
            __v: data.__v
        };
        res.status(201).json({ message: 'Education created successfully', data: responseData });
    } catch (error) {
        console.error('Error creating education:', error);
        return res.status(400).json({ message: 'Error creating educations', error: error.message });
    }
}

const getEducation = async (req, res) => {
    try {
        const education = await getEducationDoc();
        res.status(200).json(education);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ message: 'Error fetching category list', error: error.message });
    }
}

const updateEducation = async (req, res) => {

    try {
        const { id } = req.params;
        const { degree, branch, grade, collageName, city, passingYear } = req.body;

        if (!degree || !branch || !grade || !collageName || !city || !passingYear) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const education = { degree, branch, grade, collageName, city, passingYear };
        const result = await updateEducationDoc(id, education);

        if (!result) {
            return res.status(404).json({ message: 'Education not found' });
        }

        return res.status(200).json({ message: "Successfully updated education", result });
    } catch (error) {
        console.error("Error updating Education:", error);
        return res.status(500).json({ message: 'Error updating Education', error: error.message });
    }
}

const deleteEducation = async (req, res) => {
    try {
        const projectID = req.params.id;
        const result = await deleteEducationDoc(projectID);
        if (!result) {
            return res.status(404).json({ message: 'Education not found' });
        }
        return res.status(200).json({ message: 'Successfully deleted', result });
    } catch (error) {
        console.error("Error deleting education:", error); // Log the error details
        return res.status(500).json({ message: 'Could not delete education', error: error.message });
    }
}

module.exports = {
    createEducation,
    getEducation,
    updateEducation,
    deleteEducation
}