// middleware/about.middleware.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG and PDF are allowed!'), false);
    }
    // if (file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf') {
    //     cb(null, true);
    // } else {
    //     cb(new Error('Invalid file type, only JPEG and PDF is allowed!'), false);
    // }
};

const upload = multer({ storage, fileFilter });

module.exports = { upload };
