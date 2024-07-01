const skillModel = require('../models/skill.model');

class skillService {
    async create(skillData) {
        try {
            const skill = new skillModel(skillData);
            return await skill.save();
        } catch (error) {
            console.error('Error creating Skill:', error);
            throw error;
        }
    }

    async getSkill() {
        try {
            return await skillModel.find();
        } catch (error) {
            console.error('Error fetching Skills:', error);
            throw error;
        }
    }

    async update(id, skillData) {
        try {
            return await skillModel.findByIdAndUpdate(id, skillData, { new: true });
        } catch (error) {
            console.error('Error updating Skill:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            return await skillModel.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error deleting Skill:', error);
            throw error;
        }
    }
}

module.exports = skillService;
