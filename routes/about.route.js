const router = require('express').Router();
const { createAbout, getAbout } = require('../controller/about.controller');
const { upload } = require('../middleware/about.middleware');
const validateAbout = require('../validation/about.validation'); // Corrected import here

router.post('/create',
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]),
    (req, res, next) => {
        const { error } = validateAbout(req.body); // Corrected call here
        if (error) return res.status(400).json({ message: error.details[0].message });
        next();
    },
    createAbout
);

router.get('/:id', getAbout);

module.exports = router;
