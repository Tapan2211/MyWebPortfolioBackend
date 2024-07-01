const information = require('../services/information.service');
const informationInstance = new information();

const createInformation = async (req, res) => {
    try {
        const { fullname, email, mobile, address } = req.body;
        console.log("fullname", fullname)
        const data = await informationInstance.create(req.body);
        console.log("Information", data)
        res.status(201).json({ message: 'Information create successfully', data });
    } catch (error) {
        console.error('Error creating Information:', error);
        return res.status(400).json({ message: 'Error creating Information', error: error.message });
    }
}

const getInfo = async (req, res) => {
    try {
        const info = await informationInstance.getInfo();
        console.log("INFORMATION", info);
        if (!info || info.length === 0) {
            return res.status(400).json({ message: 'No record found' });
        }
        return res.status(200).json(info);
    } catch (error) {
        console.error("Error fetching inforamtion:", error);
        return res.status(500).json({ message: 'Error fetching inforamtion list', error: error.message });
    }
}

const deleteInfo = async (req, res) => {
    try {
        const infoID = req.params.id;
        const result = await informationInstance.delete(infoID);
        return res.status(200).json({ message: 'Successfully deleted', result });
    } catch (error) {
        console.error("Error deleting information:", error); // Log the error details
        return res.status(500).json({ message: 'Could not delete information', error: error.message });
    }
}
module.exports = {
    createInformation,
    getInfo,
    deleteInfo
}