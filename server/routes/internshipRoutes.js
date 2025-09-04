const express = require('express');
const router = express.Router();

const {
    GetInternships,
    AddInternships,
    UpdateInternships,
    DeleteInternships
} = require('../controllers/internController.js');


//
router.get('/', GetInternships);
//
router.post('/', AddInternships);
//
router.put('/:id', UpdateInternships);
//
router.delete('/:id', DeleteInternships);   

module.exports = router; 