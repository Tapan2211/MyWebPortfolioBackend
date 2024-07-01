const skills = require('../services/skill.service');
const skillsInstance = new skills();

const createSkill = async (req, res) => {
    try {
        const { skill } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!skill || !image) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Construct the skill object
        const skillData = {
            skill,
            image,
        };

        const data = await skillsInstance.create(skillData);

        // Modify the response to return the full URL for skillImage
        const skillImageUrl = `${req.protocol}://${req.get('host')}${data.image}`;

        const responseData = {
            skill: data.skill,  // Correct the property name
            image: skillImageUrl, // Use the skillImageUrl instead of data.skillImageUrl
            _id: data._id,
            __v: data.__v
        };
        res.status(201).json({ message: 'Skill created successfully', data: responseData });
    } catch (error) {
        console.error('Error creating Skill:', error);
        return res.status(400).json({ message: 'Error creating Skill', error: error.message });
    }
}

const getSkills = async (req, res) => {
    const skills = await skillsInstance.getSkill();
    if (!skills || skills.length === 0) {
        return res.status(400).json({ message: 'No record found' });
    }

    const skillDetails = skills.map(skills => ({
        ...skills._doc,
        image: `${req.protocol}://${req.get('host')}${skills.image}`
    }));

    return res.status(200).json({ skillDetails });
}

const updateSkills = async (req, res) => {
    const { skill } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Get the uploaded file path if it exists
    const { id } = req.params;

    try {
        const updateData = {
            skill,
            image
        };

        const updatedSkill = await skillsInstance.update(id, updateData);

        if (!updatedSkill) {
            return res.status(404).json({ message: 'Skills not found', data: updatedSkill });
        }

        // Modify the response to return the full URL for projectImage
        const updatedSkillImageUrl = `${req.protocol}://${req.get('host')}${updatedSkill.image}`;

        const updatedResponseData = {
            skill: updatedSkill.skill,
            image: updatedSkillImageUrl,
            _id: updatedSkill._id,
            __v: updatedSkill.__v
        };
        res.status(200).json({ message: 'Skills updated successfully', data: updatedResponseData });
    } catch (error) {
        console.error("Error updating Skill:", error);
        return res.status(500).json({ message: 'Error updating Skills', error: error.message });
    }
}

const deleteSkills = async (req, res) => {
    try {
        const skillID = req.params.id;
        const result = await skillsInstance.delete(skillID);
        return res.status(200).json({ message: 'Successfully deleted', result });
    } catch (error) {
        console.error("Error deleting skill:", error); // Log the error details
        return res.status(500).json({ message: 'Could not delete skill', error: error.message });
    }
}

module.exports = {
    createSkill,
    getSkills,
    updateSkills,
    deleteSkills
}
