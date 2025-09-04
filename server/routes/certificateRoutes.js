const express = require('express');
const router = express.Router();

const {
    GetCertificate,
    AddCertificate,
    UpdateCertificate,
    DeleteCertificate
} = require('../controllers/certificateController.js');


//
router.get('/', GetCertificate);
//
router.post('/', AddCertificate);
//
router.put('/:id', UpdateCertificate);
//
router.delete('/:id', DeleteCertificate);   

module.exports = router; 