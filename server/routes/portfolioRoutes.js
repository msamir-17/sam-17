const express = require('express');
const router = express.Router();
const { getPortfolioData } = require('../controllers/portfolioController.js');

// GET /api/portfolio
router.get('/', getPortfolioData);

module.exports = router;
