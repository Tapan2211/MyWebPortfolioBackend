const {
    createExperienceDoc,
    getExperienceDoc,
    updateExperienceDoc,
    deleteExperienceDoc
} = require('../services/experience.service');

const createExperience = async (req, res) => {
    try {
        const { companyName, position, city, year, currentWorking, startingDate } = req.body;

        if (!companyName || !position || !city || !year || !startingDate) {
            return res.status(400).json({ message: 'All fields are required' });
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
        res.status(201).json({ message: 'Experience created successfully', data: responseData });

    } catch (error) {
        console.error('Error creating experience:', error);
        return res.status(400).json({ message: 'Error creating experience', error: error.message });
    }
}

const getExperience = async (req, res) => {
    try {
        const experiencs = await getExperienceDoc();
        if (!experiencs || experiencs.length === 0) {
            return res.status(400).json({ message: 'No record found' });
        }
        return res.status(200).json(experiencs);
    } catch (error) {
        console.error('Error experience listing:', error);
        return res.status(400).json({ message: 'Error experience listing', error: error.message });
    }
}

const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { companyName, position, city, year, currentWorking, startingDate } = req.body;

        if (!companyName || !position || !city || !year || !currentWorking || !startingDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const exp_data = { companyName, position, city, year, currentWorking, startingDate };
        const result = await updateExperienceDoc(id, exp_data);

        if (!result) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        return res.status(200).json({ message: "Successfully updated Experience", result });
    } catch (error) {
        console.error("Error updating Experience:", error);
        return res.status(500).json({ message: 'Error updating Experience', error: error.message });
    }
}

const deleteExperience = async (req, res) => {

    try {
        const experienceID = req.params.id;
        const result = await deleteExperienceDoc(experienceID);
        return res.status(200).json({ message: 'Successfully deleted', result });
    } catch (error) {
        console.error("Error deleting experience:", error); // Log the error details
        return res.status(500).json({ message: 'Could not delete experience', error: error.message });
    }
}

module.exports = {
    createExperience,
    getExperience,
    updateExperience,
    deleteExperience
}