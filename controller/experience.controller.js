const {
    createExperienceDoc,
    getExperienceDoc,
    updateExperienceDoc,
    deleteExperienceDoc
} = require('../services/experience.service');
const message = require('../config/messages');

const createExperience = async (req, res) => {
    try {
        const { companyName, position, city, year, currentWorking, startingDate } = req.body;

        if (!companyName || !position || !city || !year || !startingDate) {
            return res.status(400).json({ message: message.errors.ALL_FIELD_REQUIRED });
        }

        // Construct the project object
        const experience = {
            companyName,
            position,
            city,
            year,
            currentWorking,
            startingDate
        };

        const data = await createExperienceDoc(experience);

        const responseData = {
            companyName: data.companyName,
            position: data.position,
            city: data.city,
            year: data.year,
            currentWorking: data.currentWorking,
            startingDate: data.startingDate,
            _id: data._id,
            __v: data.__v
        };
        res.status(201).json({ message: message.success.SUCCESSFULLY_CREATE, data: responseData });

    } catch (error) {
        console.error(message.errors.EXP_CREATE_ERROR, error);
        return res.status(400).json({ message: message.errors.EXP_CREATE_ERROR, error: error.message });
    }
}

const getExperience = async (req, res) => {
    try {
        const experiencs = await getExperienceDoc();
        if (!experiencs || experiencs.length === 0) {
            return res.status(400).json({ message: message.NO_RECORD_FOUND });
        }
        return res.status(200).json(experiencs);
    } catch (error) {
        console.error(message.errors.EXP_FETCHING_ERROR, error);
        return res.status(400).json({ message: message.errors.EXP_FETCHING_ERROR, error: error.message });
    }
}

const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { companyName, position, city, year, currentWorking, startingDate } = req.body;

        if (!companyName || !position || !city || !year || !currentWorking || !startingDate) {
            return res.status(400).json({ message: message.errors.ALL_FIELD_REQUIRED });
        }

        const exp_data = { companyName, position, city, year, currentWorking, startingDate };
        const result = await updateExperienceDoc(id, exp_data);

        if (!result) {
            return res.status(404).json({ message: message.NO_RECORD_FOUND });
        }

        return res.status(200).json({ message: message.success.SUCCESSFULLY_UPDATED, result });
    } catch (error) {
        console.error(message.errors.EXP_UPDATE_ERROR, error);
        return res.status(500).json({ message: message.errors.EXP_UPDATE_ERROR, error: error.message });
    }
}

const deleteExperience = async (req, res) => {

    try {
        const experienceID = req.params.id;
        const result = await deleteExperienceDoc(experienceID);
        return res.status(200).json({ message: message.success.SUCCESSFULLY_DELETE, result });
    } catch (error) {
        console.error(message.errors.EXP_DELETE_ERROR, error); // Log the error details
        return res.status(500).json({ message: message.errors.EXP_DELETE_ERROR, error: error.message });
    }
}

module.exports = {
    createExperience,
    getExperience,
    updateExperience,
    deleteExperience
}