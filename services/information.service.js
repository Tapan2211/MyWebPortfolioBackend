const informationModel = require('../models/information.model');

class informationService {

    create = async (data) => {
        const newInfo = await informationModel(data);
        const result = await newInfo.save();
        return result;
    }

    getInfo = async (data) => { return await informationModel.find(); }

    delete = async (id) => {
        return await informationModel.findOneAndDelete({ _id: id });
    }
}
module.exports = informationService;