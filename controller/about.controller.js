// controller/about.controller.js
const { createAboutDoc, getAboutDataDoc } = require('../services/about.service');

const createAbout = async (req, res) => {
    try {
        const about = await createAboutDoc(req.body, req.files);
        res.status(201).json(about);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAbout = async (req, res) => {
    try {
        const about = await getAboutDataDoc();
        if (!about) {
            return res.status(404).json({ message: 'Data not found' });
        }

        const fullAbout = {
            ...about._doc,
            image: `${req.protocol}://${req.get('host')}/${about.image}`,
            pdf: `${req.protocol}://${req.get('host')}/${about.pdf}`
        };

        return res.status(200).json(fullAbout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createAbout,
    getAbout
}
