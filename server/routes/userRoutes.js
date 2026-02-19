const express = require('express');
const router = express.Router();

const{ registerUser, loginUser} = require('../controllers/userController.js');

const {forgotPassword, resetPassword } = require('../controllers/userController.js');

//
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);   

module.exports = router; 