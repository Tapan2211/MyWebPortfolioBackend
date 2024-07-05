const information = require('../services/information.service');
const message = require('../config/messages');
const informationInstance = new information();

const createInformation = async (req, res) => {
    try {
        const { fullname, email, mobile, address } = req.body;
        const data = await informationInstance.create(req.body);
        res.status(201).json({ message: message.success.SUCCESSFULLY_DELETE, data });
    } catch (error) {
        console.error(message.errors.INFORMATION_CREATE_ERROR, error);
        return res.status(400).json({ message: message.errors.INFORMATION_CREATE_ERROR, error: error.message });
    }
}

const getInfo = async (req, res) => {
    try {
        const info = await informationInstance.getInfo();
        if (!info || info.length === 0) {
            return res.status(400).json({ message: message.NO_RECORD_FOUND });
        }
        return res.status(200).json(info);
    } catch (error) {
        console.error(message.errors.INFORMATION_FETCHING_ERROR, error);
        return res.status(500).json({ message: message.errors.INFORMATION_FETCHING_ERROR, error: error.message });
    }
}

const deleteInfo = async (req, res) => {
    try {
        const infoID = req.params.id;
        const result = await informationInstance.delete(infoID);
        return res.status(200).json({ message: message.success.SUCCESSFULLY_DELETE, result });
    } catch (error) {
        console.error(message.errors.INFORMATION_DELETE_ERROR, error); // Log the error details
        return res.status(500).json({ message: message.errors.INFORMATION_DELETE_ERROR, error: error.message });
    }
}
module.exports = {
    createInformation,
    getInfo,
    deleteInfo
}