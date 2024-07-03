const router = require('express').Router();
const validate = require('../middleware/education.middleware');
const { educationSchema } = require('../validation/education.validation');
const {
    createEducation,
    getEducation,
    updateEducation,
    deleteEducation
} = require('../controller/education.controller');

router.post('/create', validate(educationSchema), createEducation);
router.get('/', getEducation);
router.put('/:id', validate(educationSchema), updateEducation); // You may want to validate update requests too
router.delete('/:id', deleteEducation);

module.exports = router;
