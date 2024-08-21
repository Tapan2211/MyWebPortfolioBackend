
const skills = require('../services/skill.service');
const message = require('../config/messages');
const skillsInstance = new skills();

const createSkill = async (req, res) => {
    try {
        const { skill } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!skill || !image) {
            return res.status(400).json({ message: message.errors.ALL_FIELD_REQUIRED });
        }

        const skillData = {
            skill,
            image,
        };

        const data = await skillsInstance.create(skillData);
        console.log("DATA_SKILL", data);
        // Modify the response to return the full URL for skillImage
        const skillImageUrl = `${req.protocol}://${req.get('host')}${data.image}`;

        const responseData = {
            skill: data.skill,
            image: skillImageUrl,
            _id: data._id,
            __v: data.__v
        };
        res.status(201).json({ message: message.success.SUCCESSFULLY_CREATE, data: responseData });
    } catch (error) {
        console.error(message.errors.SKILL_CREATED_ERROR, error);
        return res.status(400).json({ message: message.errors.SKILL_CREATED_ERROR, error: error.message });
    }
};

const getSkills = async (req, res) => {
    try {
        const skills = await skillsInstance.getSkill();
        if (!skills || skills.length === 0) {
            return res.status(404).json({ message: message.NO_RECORD_FOUND });
        }

        const skillDetails = skills.map(skill => ({
            ...skill._doc,
            image: `${req.protocol}://${req.get('host')}${skill.image}`
        }));

        return res.status(200).json({ skillDetails });
    } catch (error) {
        console.error(message.errors.SKILL_FETCHING_ERROR, error);
        return res.status(500).json({ message: message.errors.SKILL_FETCHING_ERROR, error: error.message });
    }
};

const updateSkills = async (req, res) => {
    try {
        const { skill } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;
        const { id } = req.params;

        const updateData = {
            skill,
            image
        };

        const updatedSkill = await skillsInstance.update(id, updateData);

        if (!updatedSkill) {
            return res.status(404).json({ message: message.NO_RECORD_FOUND });
        }

        // Modify the response to return the full URL for skill image
        const updatedSkillImageUrl = `${req.protocol}://${req.get('host')}${updatedSkill.image}`;

        const updatedResponseData = {
            skill: updatedSkill.skill,
            image: updatedSkillImageUrl,
            _id: updatedSkill._id,
            __v: updatedSkill.__v
        };
        res.status(200).json({ message: message.success.SUCCESSFULLY_UPDATED, data: updatedResponseData });
    } catch (error) {
        console.error(message.errors.SKILL_UPDATE_ERROR, error);
        return res.status(500).json({ message: message.errors.SKILL_UPDATE_ERROR, error: error.message });
    }
};

const deleteSkills = async (req, res) => {
    try {
        const skillID = req.params.id;
        const result = await skillsInstance.delete(skillID);
        if (!result) {
            return res.status(404).json({ message: message.NO_RECORD_FOUND });
        }
        return res.status(200).json({ message: message.success.SUCCESSFULLY_DELETE, result });
    } catch (error) {
        console.error(message.errors.SKILL_DELETE_ERROR, error);
        return res.status(500).json({ message: message.errors.SKILL_DELETE_ERROR, error: error.message });
    }
};

module.exports = {
    createSkill,
    getSkills,
    updateSkills,
    deleteSkills
};
