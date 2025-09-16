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

const updateHero = async (req , res) => {
    try {
        const {name , greeting , bio , jobtitles } = req.body;
        let updateData = {
            name,
            greeting,
            bio,
            jobtitles: jobtitles.split(',').map(title => title.trim())
        };
        if(req.file){
            const result =await cloudinary.uploader.upload(req.file.path,{
                folder: 'Portfolio_Resume',
                resource_type: 'raw' // PDF ke liye 'raw' use karna accha hai

            });
            updateData.resumeurl = result.secure_url
        }

        const heroData = await hero.findOneAndUpdate({}, updateData, {new: true, upsert: true});
        res.status(200).json(heroData);


    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = { getHero , updateHero}