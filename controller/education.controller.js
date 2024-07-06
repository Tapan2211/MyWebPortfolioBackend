const {
    createEducationDoc,
    getEducationDoc,
    updateEducationDoc,
    deleteEducationDoc
} = require('../services/education.service');
const message = require('../config/messages');

const createEducation = async (req, res) => {
    try {

        const { degree, branch, grade, collageName, city, passingYear } = req.body;

        if (!degree || !branch || !grade || !collageName || !city || !passingYear) {
            return res.status(400).json({ message: message.errors.ALL_FIELD_REQUIRED });
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
        res.status(201).json({ message: message.success.EDUCATION_CREATE, data: responseData });
    } catch (error) {
        console.error(message.errors.EDUCATION_CREATED_ERROR, error);
        return res.status(400).json({ message: message.errors.EDUCATION_CREATED_ERROR, error: error.message });
    }
}

const getEducation = async (req, res) => {
    try {
        const education = await getEducationDoc();
        if (!education || education.length === 0) {
            return res.status(404).json({ message: message.NO_RECORD_FOUND })
        }
        res.status(200).json(education);
    } catch (error) {
        console.error(message.errors.EDUCATION_FETCHING_ERROR, error);
        return res.status(500).json({ message: message.errors.EDUCATION_FETCHING_ERROR, error: error.message });
    }
}

const updateEducation = async (req, res) => {

    try {
        const { id } = req.params;
        const { degree, branch, grade, collageName, city, passingYear } = req.body;

        if (!degree || !branch || !grade || !collageName || !city || !passingYear) {
            return res.status(400).json({ message: message.ALL_FIELD_REQUIRED });
        }

        const education = { degree, branch, grade, collageName, city, passingYear };
        const result = await updateEducationDoc(id, education);

        if (!result) {
            return res.status(404).json({ message: message.NO_RECORD_FOUND });
        }

        return res.status(200).json({ message: message.success.EDUCATION_UPDATE, result });
    } catch (error) {
        console.error(message.errors.EDUCATION_UPDATE_ERROR, error);
        return res.status(500).json({ message: message.errors.EDUCATION_UPDATE_ERROR, error: error.message });
    }
}

const deleteEducation = async (req, res) => {
    try {
        const projectID = req.params.id;
        const result = await deleteEducationDoc(projectID);
        if (!result) {
            return res.status(404).json({ message: message.NO_RECORD_FOUND });
        }
        return res.status(200).json({ message: message.success.SUCCESSFULLY_DELETE, result });
    } catch (error) {
        console.error(message.errors.EDUCATION_DELETE_ERROR, error); // Log the error details
        return res.status(500).json({ message: message.errors.EDUCATION_DELETE_ERROR, error: error.message });
    }
}

module.exports = {
    createEducation,
    getEducation,
    updateEducation,
    deleteEducation
}