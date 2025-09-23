const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
    GetCertificate,
    AddCertificate,
    UpdateCertificate,
    DeleteCertificate,
    GetCertificateById
} = require('../controllers/certificateController.js');


//
router.get('/', GetCertificate);
//
router.get('/:id', GetCertificateById);
//
router.post('/', protect, upload.single('certificateFile'), AddCertificate);
//
router.put('/:id', protect, upload.single('certificateFile'), UpdateCertificate);
//
router.delete('/:id', DeleteCertificate);   

module.exports = router; 