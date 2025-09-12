const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
    GetInternships,
    AddInternships,
    UpdateInternships,
    DeleteInternships,
    GetIntershipById
} = require('../controllers/internController.js');





//
router.get('/', GetInternships);
router.get('/:id', GetIntershipById); 

// Request pehle 'protect' middleware se guzregi, phir controller ke paas jaayegi.

router.post('/', protect, upload.single('certificate'), AddInternships); // 'certificate' naam se file aayegi
// 
router.put('/:id', protect, upload.single('certificate'), UpdateInternships);
//
router.delete('/:id', protect, DeleteInternships);   

module.exports = router; 