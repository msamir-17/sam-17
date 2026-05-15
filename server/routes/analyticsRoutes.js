const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');
const {
    trackEvent,
    getStats,
    getVisitorTrend,
    getProjectAnalytics,
    getDeviceBreakdown,
    getRecentActivity,
    getResumeAnalytics
} = require('../controllers/analyticsController.js');

// Public endpoint — called by frontend tracker
router.post('/track', trackEvent);

// Protected admin endpoints
router.get('/stats', protect, getStats);
router.get('/trend', protect, getVisitorTrend);
router.get('/projects', protect, getProjectAnalytics);
router.get('/devices', protect, getDeviceBreakdown);
router.get('/activity', protect, getRecentActivity);
router.get('/resume', protect, getResumeAnalytics);

module.exports = router;
