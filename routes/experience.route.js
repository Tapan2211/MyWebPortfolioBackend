const router = require('express').Router();
const validate = require('../middleware/exepience.middleware');
const { experienceSchema } = require('../validation/experience.validation')

const {
    createExperience,
    getExperience,
    updateExperience,
    deleteExperience
} = require('../controller/experience.controller');

router.post('/create', validate(experienceSchema), createExperience);
router.get('/', getExperience);
router.put('/:id', updateExperience);
router.delete('/:id', deleteExperience);

module.exports = router;
