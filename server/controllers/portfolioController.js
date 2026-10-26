const Hero = require('../models/heroModel.js');
const Project = require('../models/projectModel.js');
const Internship = require('../models/InternshipS.js');
const Certificate = require('../models/certificationS.js');

// GET /api/portfolio - Unified endpoint returning all portfolio data in one response
const getPortfolioData = async (req, res) => {
    try {
        const [heroData, projects, internships, certificates] = await Promise.all([
            Hero.findOne().lean(),
            Project.find({}).sort({ createdAt: -1 }).lean(),
            Internship.find({}).sort({ createdAt: -1 }).lean(),
            Certificate.find({}).sort({ createdAt: -1 }).lean(),
        ]);

        res.status(200).json({
            hero: heroData || null,
            projects: projects || [],
            internships: internships || [],
            certifications: certificates || []
        });
    } catch (err) {
        console.error('Error fetching unified portfolio data:', err.message);
        res.status(500).json({ 
            message: 'Failed to fetch portfolio data', 
            error: err.message 
        });
    }
};

module.exports = { getPortfolioData };
