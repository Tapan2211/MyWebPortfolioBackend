const skillModel = require('../models/skill.model');

class skillService {
    async create(skillData) {
        // Assuming you're using Mongoose for MongoDB
        const skill = new skillModel(skillData);
        return await skill.save();
    }

    async getSkill() {
        return await skillModel.find();
    }

    async update(id, skillData) {
        try {
            return await skillModel.findByIdAndUpdate(id, skillData, { new: true });
        } catch (error) {
            console.error("Error in updateSkill:", error);
            throw error;
        }
    }

    async delete(id) {
        try {
            return await skillModel.findByIdAndDelete({ _id: id });
        } catch (error) {
            console.log("Error in delete skill", error);
            throw error;
        }
    }
}

module.exports = skillService;
