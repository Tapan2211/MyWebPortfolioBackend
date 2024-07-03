const router = require('express').Router();
const multer = require('multer');
const validate = require('../middleware/project.middleware');
const { projectSchema } = require('../validation/project.validation');
const {
    createProject,
    getProjects,
    updateProject,
    deleteProject
} = require('../controller/project.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('projectImage'), validate(projectSchema), createProject);
router.get('/', getProjects);
router.put('/:id', upload.single('projectImage'), updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
