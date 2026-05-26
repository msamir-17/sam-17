const hero = require('../models/heroModel.js');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const getHero = async (req , res ) => {
    try {
        const heroData = await hero.findOne();
        res.status(200).json(heroData);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

// Sirf is function ko replace karein
// Replace the entire updateHeroData function with this one

const updateHero = async (req, res) => {
    try {
        const { greeting, name, jobtitles, jobTitles, bio } = req.body;
        const actualJobTitles = jobtitles !== undefined ? jobtitles : jobTitles;
        
        // Start with an empty object to hold only the fields we receive
        const updatedData = {};

        // Add fields to the object ONLY if they exist in the request
        if (greeting) updatedData.greeting = greeting;
        if (name) updatedData.name = name;
        if (bio) updatedData.bio = bio;

        // --- THE ROBUST FIX for jobtitles ---
        // Only if jobtitles is a non-empty string, process it
        if (typeof actualJobTitles === 'string' && actualJobTitles.trim() !== '') {
            updatedData.jobtitles = actualJobTitles.split(',').map(title => title.trim());
        }

        // --- THE ROBUST FIX for the resume file ---
        if (req.file && req.file.path && req.file.size > 0) {
            // Check if Cloudinary is configured
            if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
                console.error("Cloudinary credentials are not configured in environment variables!");
                fs.unlink(req.file.path, () => {});
                return res.status(500).json({ 
                    message: 'Cloudinary configuration is missing on the server. Please define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment.' 
                });
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'Portfolio_Resume',
                resource_type: 'raw'
            });
            updatedData.resumeurl = result.secure_url;

            // Clean up the temporary file uploaded by multer
            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Failed to delete temp file:", err);
            });
        }

        // Find the single hero document and update it with the new data
        // upsert: true will create it if it doesn't exist
        const heroData = await hero.findOneAndUpdate(
            {}, // An empty filter targets the first/only document
            { $set: updatedData }, // $set ensures only provided fields are updated
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json(heroData);

    } catch (error) {
        console.error("UPDATE HERO FAILED:", error);
        // Clean up the temporary file on failure if it exists
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, () => {});
        }
        res.status(500).json({ message: "Server Error: Unable to update Hero data" });
    }
};

module.exports = { getHero , updateHero}