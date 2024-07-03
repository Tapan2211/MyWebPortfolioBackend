const router = require('express').Router();
const { createUserSchema } = require('../validation/information.validation');
const validate = require('../middleware/information.middleware');
const {
    createInformation,
    getInfo,
    deleteInfo
} = require('../controller/information.controller');

router.post('/create', validate(createUserSchema), createInformation);
router.get('/', getInfo);
router.delete('/:id', deleteInfo);

module.exports = router;