const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['page_view', 'project_click', 'resume_download', 'live_link_click', 'github_click'],
        index: true
    },
    page: {
        type: String,
        default: '/'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        default: null
    },
    projectTitle: {
        type: String,
        default: null
    },
    // Visitor identification (privacy-safe fingerprint)
    visitorId: {
        type: String,
        required: true,
        index: true
    },
    sessionId: {
        type: String,
        required: true
    },
    // Device & Browser info
    device: {
        type: String,
        default: 'unknown' // mobile, tablet, desktop
    },
    browser: {
        type: String,
        default: 'unknown'
    },
    os: {
        type: String,
        default: 'unknown'
    },
    // Geo info (from IP — no raw IP stored)
    country: {
        type: String,
        default: 'Unknown'
    },
    city: {
        type: String,
        default: 'Unknown'
    },
    // Traffic source
    referrer: {
        type: String,
        default: 'direct'
    }
}, {
    timestamps: true // createdAt + updatedAt
});

// Compound index for deduplication queries
analyticsSchema.index({ visitorId: 1, page: 1, sessionId: 1, type: 1 });
// Index for time-based aggregation
analyticsSchema.index({ createdAt: -1 });
// Index for project analytics
analyticsSchema.index({ type: 1, projectId: 1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
