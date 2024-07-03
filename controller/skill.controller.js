const skills = require('../services/skill.service');
const skillsInstance = new skills();

const createSkill = async (req, res) => {
    try {
        const { skill } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!skill || !image) {
            return res.status(400).json({ message: 'Skill and image are required' });
        }

        const skillData = {
            skill,
            image,
        };

        const data = await skillsInstance.create(skillData);

        // Modify the response to return the full URL for skillImage
        const skillImageUrl = `${req.protocol}://${req.get('host')}${data.image}`;

        const responseData = {
            skill: data.skill,
            image: skillImageUrl,
            _id: data._id,
            __v: data.__v
        };
        res.status(201).json({ message: 'Skill created successfully', data: responseData });
    } catch (error) {
        console.error('Error creating Skill:', error);
        return res.status(400).json({ message: 'Error creating Skill', error: error.message });
    }
};

const getSkills = async (req, res) => {
    try {
        const skills = await skillsInstance.getSkill();
        if (!skills || skills.length === 0) {
            return res.status(404).json({ message: 'No record found' });
        }

        const skillDetails = skills.map(skill => ({
            ...skill._doc,
            image: `${req.protocol}://${req.get('host')}${skill.image}`
        }));

        return res.status(200).json({ skillDetails });
    } catch (error) {
        console.error('Error fetching Skills:', error);
        return res.status(500).json({ message: 'Error fetching Skills', error: error.message });
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
            return res.status(404).json({ message: 'Skill not found' });
        }

        // Modify the response to return the full URL for skill image
        const updatedSkillImageUrl = `${req.protocol}://${req.get('host')}${updatedSkill.image}`;

        const updatedResponseData = {
            skill: updatedSkill.skill,
            image: updatedSkillImageUrl,
            _id: updatedSkill._id,
            __v: updatedSkill.__v
        };
        res.status(200).json({ message: 'Skill updated successfully', data: updatedResponseData });
    } catch (error) {
        console.error('Error updating Skill:', error);
        return res.status(500).json({ message: 'Error updating Skill', error: error.message });
    }
};

const deleteSkills = async (req, res) => {
    try {
        const skillID = req.params.id;
        const result = await skillsInstance.delete(skillID);
        if (!result) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        return res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
        console.error('Error deleting Skill:', error);
        return res.status(500).json({ message: 'Error deleting Skill', error: error.message });
    }
};

module.exports = {
    createSkill,
    getSkills,
    updateSkills,
    deleteSkills
};
