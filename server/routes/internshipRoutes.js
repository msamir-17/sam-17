const express = require('express');
const router = express.Router();

const {
    GetInternships,
    AddInternships,
    UpdateInternships,
    DeleteInternships
} = require('../controllers/internController.js');



const { protect } = require('../middleware/authMiddleware.js');


//
router.get('/', GetInternships);


// Request pehle 'protect' middleware se guzregi, phir controller ke paas jaayegi.
//
router.post('/', protect, AddInternships);
//
router.put('/:id', protect, UpdateInternships);
//
router.delete('/:id', protect, DeleteInternships);   

module.exports = router; 