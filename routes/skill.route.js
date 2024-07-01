const router = require('express').Router();
const multer = require('multer');
const {
    createSkill,
    getSkills,
    updateSkills,
    deleteSkills
} = require('../controller/skill.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), createSkill);
router.get('/', getSkills);
router.put('/:id', upload.single('image'), updateSkills);
router.delete('/:id', deleteSkills);


module.exports = router;