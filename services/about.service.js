// services/about.service.js
const aboutModel = require('../models/about.model');

const createAboutDoc = async (data, files) => {
    const datas = new aboutModel({
        info: data.info,
        image: `uploads/${files.image[0].filename}`,
        pdf: `uploads/${files.pdf[0].filename}`
    });
    const result = await datas.save();
    return result;
}

const getAboutDataDoc = async () => {
    const result = await aboutModel.findOne(); // Fetch the first document
    return result;
}

module.exports = {
    createAboutDoc,
    getAboutDataDoc
}