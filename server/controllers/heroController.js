const hero = require('../models/heroModel.js');
const cloudinary = require('cloudinary').v2;

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
        const { greeting, name, jobtitles, bio } = req.body;
        
        // Start with an empty object to hold only the fields we receive
        const updatedData = {};

        // Add fields to the object ONLY if they exist in the request
        if (greeting) updatedData.greeting = greeting;
        if (name) updatedData.name = name;
        if (bio) updatedData.bio = bio;

        // --- THE ROBUST FIX for jobtitles ---
        // Only if jobtitles is a non-empty string, process it
        if (typeof jobtitles === 'string' && jobtitles.trim() !== '') {
            updatedData.jobtitles = jobtitles.split(',').map(title => title.trim());
        }

        // --- THE ROBUST FIX for the resume file ---
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'Portfolio_Resume',
                resource_type: 'raw'
            });
            updatedData.resumeurl = result.secure_url;
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
        res.status(500).json({ message: "Server Error: Unable to update Hero data" });
    }
};

module.exports = { getHero , updateHero}