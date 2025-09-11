const express = require('express');
const router = express.Router();

const {
    GetProject,
    AddProject,
    UpdateProject,
    DeleteProject,
    GetProjectById
} = require('../controllers/projectController.js');

const { protect } = require('../middleware/authMiddleware.js');

const multer = require('multer'); //  Multer ko setup karo
const upload = multer({ dest: 'uploads/' }); //  Files temporarily 'uploads' folder mein save hongi

// Add Project route ko update kiya. Request ab in steps se guzregi:
// 1. protect (Login check)
// 2. upload.single('image') (File ko handle karo)
// 3. AddProject (Controller function)


router.get('/', GetProject);
router.get('/:id', GetProjectById); 
// router.post('/', protect, upload.single('image'), AddProject);
router.post(
    '/',
    (req, res, next) => {
        console.log('--- Inside Routes File ---');
        next();
    },
    protect,
    (req, res, next) => {
        console.log('--- Passed Protect Middleware ---');
        next();
    },
    upload.single('image'),
    (req, res, next) => {
        console.log('--- Passed Multer Middleware ---');
        next();
    },
    AddProject
);
//
router.put('/:id', protect, upload.single('image'), UpdateProject);
// router.put('/:id', protect, UpdateProject);
//
router.delete('/:id', protect, DeleteProject);   

module.exports = router; 