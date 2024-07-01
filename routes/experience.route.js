const router = require('express').Router();

const {
    createExperience,
    getExperience,
    updateExperience,
    deleteExperience
} = require('../controller/experience.controller');

router.post('/create', createExperience);
router.get('/', getExperience);
router.put('/:id', updateExperience);
router.delete('/:id', deleteExperience);

module.exports = router;
