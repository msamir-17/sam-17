const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/contactController.js');

// Public route to send contact email
router.post('/', sendContactEmail);

module.exports = router;
