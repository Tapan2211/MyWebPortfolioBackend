const router = require('express').Router();

const {
    createEducation,
    getEducation,
    updateEducation,
    deleteEducation
} = require('../controller/education.controller');

router.post('/create', createEducation);
router.get('/', getEducation);
router.put('/:id', updateEducation);
router.delete('/:id', deleteEducation);

module.exports = router;