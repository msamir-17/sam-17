const Analytics = require('../models/analyticsModel.js');

// ==========================================
// PUBLIC: Track an analytics event
// ==========================================
const trackEvent = async (req, res) => {
    try {
        const { type, page, projectId, projectTitle, visitorId, sessionId, device, browser, os, referrer } = req.body;

        // Validate required fields
        if (!type || !visitorId || !sessionId) {
            return res.status(400).json({ message: 'Missing required fields: type, visitorId, sessionId' });
        }

        // Anti-spam: For page_view, check if same visitor viewed same page in same session within last 30 min
        if (type === 'page_view') {
            const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000);
            const duplicate = await Analytics.findOne({
                type: 'page_view',
                visitorId,
                page: page || '/',
                sessionId,
                createdAt: { $gte: thirtyMinAgo }
            });

            if (duplicate) {
                return res.status(200).json({ message: 'Duplicate suppressed', tracked: false });
            }
        }

        // Anti-spam: For resume_download, max 1 per visitor per hour
        if (type === 'resume_download') {
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
            const duplicate = await Analytics.findOne({
                type: 'resume_download',
                visitorId,
                createdAt: { $gte: oneHourAgo }
            });

            if (duplicate) {
                return res.status(200).json({ message: 'Duplicate suppressed', tracked: false });
            }
        }

        // Attempt IP-based geolocation (free, no API key needed)
        let country = 'Unknown';
        let city = 'Unknown';
        try {
            const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || '';
            // Skip local/private IPs
            if (clientIp && !clientIp.startsWith('127.') && !clientIp.startsWith('192.168.') && !clientIp.startsWith('::1') && clientIp !== '::ffff:127.0.0.1') {
                const geoRes = await fetch(`http://ip-api.com/json/${clientIp}?fields=country,city`);
                if (geoRes.ok) {
                    const geoData = await geoRes.json();
                    if (geoData.country) country = geoData.country;
                    if (geoData.city) city = geoData.city;
                }
            }
        } catch (geoErr) {
            // Silently fail — geo is optional
        }

        const event = new Analytics({
            type,
            page: page || '/',
            projectId: projectId || null,
            projectTitle: projectTitle || null,
            visitorId,
            sessionId,
            device: device || 'unknown',
            browser: browser || 'unknown',
            os: os || 'unknown',
            country,
            city,
            referrer: referrer || 'direct'
        });

        await event.save();
        res.status(201).json({ message: 'Event tracked', tracked: true });

    } catch (err) {
        console.error('Analytics track error:', err);
        res.status(500).json({ message: 'Server Error tracking event' });
    }
};

// ==========================================
// ADMIN: Get dashboard overview stats
// ==========================================
const getStats = async (req, res) => {
    try {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        // Run all queries in parallel
        const [
            totalPageViews,
            totalUniqueVisitors,
            todayPageViews,
            todayUniqueVisitors,
            weekPageViews,
            weekUniqueVisitors,
            monthPageViews,
            monthUniqueVisitors,
            totalResumeDownloads,
            totalProjectClicks,
            returningVisitors
        ] = await Promise.all([
            Analytics.countDocuments({ type: 'page_view' }),
            Analytics.distinct('visitorId', { type: 'page_view' }).then(ids => ids.length),
            Analytics.countDocuments({ type: 'page_view', createdAt: { $gte: todayStart } }),
            Analytics.distinct('visitorId', { type: 'page_view', createdAt: { $gte: todayStart } }).then(ids => ids.length),
            Analytics.countDocuments({ type: 'page_view', createdAt: { $gte: weekAgo } }),
            Analytics.distinct('visitorId', { type: 'page_view', createdAt: { $gte: weekAgo } }).then(ids => ids.length),
            Analytics.countDocuments({ type: 'page_view', createdAt: { $gte: monthAgo } }),
            Analytics.distinct('visitorId', { type: 'page_view', createdAt: { $gte: monthAgo } }).then(ids => ids.length),
            Analytics.countDocuments({ type: 'resume_download' }),
            Analytics.countDocuments({ type: { $in: ['project_click', 'live_link_click', 'github_click'] } }),
            // Returning visitors: visitors with more than 1 session
            Analytics.aggregate([
                { $match: { type: 'page_view' } },
                { $group: { _id: '$visitorId', sessions: { $addToSet: '$sessionId' } } },
                { $match: { 'sessions.1': { $exists: true } } },
                { $count: 'count' }
            ]).then(result => result[0]?.count || 0)
        ]);

        res.status(200).json({
            total: { pageViews: totalPageViews, uniqueVisitors: totalUniqueVisitors, returningVisitors },
            today: { pageViews: todayPageViews, uniqueVisitors: todayUniqueVisitors },
            week: { pageViews: weekPageViews, uniqueVisitors: weekUniqueVisitors },
            month: { pageViews: monthPageViews, uniqueVisitors: monthUniqueVisitors },
            resumeDownloads: totalResumeDownloads,
            projectClicks: totalProjectClicks
        });

    } catch (err) {
        console.error('Analytics stats error:', err);
        res.status(500).json({ message: 'Server Error fetching stats' });
    }
};

// ==========================================
// ADMIN: Get visitor trend data (last 30 days)
// ==========================================
const getVisitorTrend = async (req, res) => {
    try {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        const trend = await Analytics.aggregate([
            { $match: { type: 'page_view', createdAt: { $gte: thirtyDaysAgo } } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                    },
                    views: { $sum: 1 },
                    visitors: { $addToSet: '$visitorId' }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: '$_id',
                    views: 1,
                    visitors: { $size: '$visitors' }
                }
            },
            { $sort: { date: 1 } }
        ]);

        res.status(200).json(trend);

    } catch (err) {
        console.error('Analytics trend error:', err);
        res.status(500).json({ message: 'Server Error fetching trend' });
    }
};

// ==========================================
// ADMIN: Get project analytics
// ==========================================
const getProjectAnalytics = async (req, res) => {
    try {
        const projectStats = await Analytics.aggregate([
            { $match: { type: { $in: ['project_click', 'live_link_click', 'github_click'] }, projectTitle: { $ne: null } } },
            {
                $group: {
                    _id: '$projectTitle',
                    clicks: { $sum: 1 },
                    lastClicked: { $max: '$createdAt' }
                }
            },
            { $sort: { clicks: -1 } },
            { $limit: 20 }
        ]);

        res.status(200).json(projectStats);

    } catch (err) {
        console.error('Analytics project error:', err);
        res.status(500).json({ message: 'Server Error fetching project analytics' });
    }
};

// ==========================================
// ADMIN: Get device/browser/OS breakdown
// ==========================================
const getDeviceBreakdown = async (req, res) => {
    try {
        const [devices, browsers, operatingSystems, countries] = await Promise.all([
            Analytics.aggregate([
                { $match: { type: 'page_view' } },
                { $group: { _id: '$device', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]),
            Analytics.aggregate([
                { $match: { type: 'page_view' } },
                { $group: { _id: '$browser', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 }
            ]),
            Analytics.aggregate([
                { $match: { type: 'page_view' } },
                { $group: { _id: '$os', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 }
            ]),
            Analytics.aggregate([
                { $match: { type: 'page_view', country: { $ne: 'Unknown' } } },
                { $group: { _id: '$country', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 }
            ])
        ]);

        res.status(200).json({ devices, browsers, operatingSystems, countries });

    } catch (err) {
        console.error('Analytics device error:', err);
        res.status(500).json({ message: 'Server Error fetching device breakdown' });
    }
};

// ==========================================
// ADMIN: Get recent activity feed
// ==========================================
const getRecentActivity = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 20;

        const activity = await Analytics.find()
            .select('type page projectTitle device browser os country city referrer createdAt')
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();

        res.status(200).json(activity);

    } catch (err) {
        console.error('Analytics activity error:', err);
        res.status(500).json({ message: 'Server Error fetching activity' });
    }
};

// ==========================================
// ADMIN: Get resume download analytics
// ==========================================
const getResumeAnalytics = async (req, res) => {
    try {
        const downloads = await Analytics.find({ type: 'resume_download' })
            .select('device browser os country city createdAt')
            .sort({ createdAt: -1 })
            .limit(50)
            .lean();

        const totalDownloads = await Analytics.countDocuments({ type: 'resume_download' });

        res.status(200).json({ totalDownloads, downloads });

    } catch (err) {
        console.error('Analytics resume error:', err);
        res.status(500).json({ message: 'Server Error fetching resume analytics' });
    }
};

module.exports = {
    trackEvent,
    getStats,
    getVisitorTrend,
    getProjectAnalytics,
    getDeviceBreakdown,
    getRecentActivity,
    getResumeAnalytics
};
