
const Project = require('../models/projectModel.js'); // Importing the Project model
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const mongoose = require('mongoose');

const GetProject = async (req, res) => {
    
    try{
        const Projects = await Project.find({});           // Project model se kaho ki database mein jitni bhi internships hain, sab dhoondh kar le aaye


        res.status(200).json(Projects)
    }
    catch(err){
        res.status(500).json({message:'Server Error in fetching Projects'});
    }
};

const AddProject = async (req, res) =>{

    // Client (admin panel) se aane waale data ko nikalo (title, description, etc.)
     console.log('--- Inside AddProject Controller ---');
    try{
        const { title, description, technologies, githubUrl, liveUrl } = req.body;

        if(!req.file){
            return res.status(400).json({message:'Project Image file is required'});
        }

        // Check if Cloudinary is configured
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.error("Cloudinary credentials are not configured in environment variables!");
            fs.unlink(req.file.path, () => {});
            return res.status(500).json({ 
                message: 'Cloudinary configuration is missing on the server. Please define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment.' 
                });
        }

        console.log(req.file.path);

        const result = await cloudinary.uploader.upload(req.file.path,{
            folder: 'Projects_Photos',
            resource_type: 'auto'
        });
        console.log(result);

        // Clean up the temporary file uploaded by multer
        fs.unlink(req.file.path, (err) => {
            if (err) console.error("Failed to delete temp file:", err);
        });

        const newProject = new Project({
            title,
            description,
            imageUrl: result.secure_url , // Cloudinary ka secure URL
            technologies: typeof technologies === 'string' ? technologies.split(',').map(tech => tech.trim()) : [], // Safely handle string split
            githubUrl, 
            liveUrl
        });


// Is nayi project ko database mein save kar do
        const saveProject = await newProject.save();

// Client ko confirmation bhej ne k liye ki project save ho gayi hai
        res.status(201).json({message:'New Project Added', Project: saveProject});

    }
    catch(err){
        console.error("--- ADD PROJECT CRASHED ---", err);
        // Clean up the temporary file on failure if it exists
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, () => {});
        }
        res.status(500).json({message:'Server Error: Unable to add Project'});
    };

};


// Is poore function ko replace karein

// Sirf is function ko replace karein

const UpdateProject = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            if (req.file && req.file.path) {
                fs.unlink(req.file.path, () => {});
            }
            return res.status(400).json({ message: 'Invalid Project ID format' });
        }

        const { title, description, technologies, githubUrl, liveUrl } = req.body;
        
        // Yeh data humein form se mil raha hai
        const updatedData = {
            title,
            description,
            githubUrl,
            liveUrl
        };

        // --- SAFE CHECK for Technologies ---
        // Pehle check karo ki 'technologies' string hai aur khaali nahi hai
        if (typeof technologies === 'string' && technologies.length > 0) {
            updatedData.technologies = technologies.split(',').map(tech => tech.trim());
        } else if (Array.isArray(technologies)) {
            // Agar kisi wajah se array aa raha hai, toh use waise hi use karo
            updatedData.technologies = technologies;
        }

        // --- SAFE CHECK for Image ---
        // Check karo ki user ne nayi image upload ki hai ya nahi aur uski path valid hai
        if (req.file && req.file.path && req.file.size > 0) {
            // Check if Cloudinary is configured
            if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
                console.error("Cloudinary credentials are not configured in environment variables!");
                fs.unlink(req.file.path, () => {});
                return res.status(500).json({ 
                    message: 'Cloudinary configuration is missing on the server. Please define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment.' 
                });
            }

            console.log("New image detected, uploading to Cloudinary...");
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'Projects_Photos',
                resource_type: 'auto'
            });
            updatedData.imageUrl = result.secure_url;

            // Clean up the temporary file uploaded by multer
            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Failed to delete temp file:", err);
            });
        } 
        // Agar nayi image nahi hai, toh hum purani image ko nahi chhedenge
        // Isliye 'imageUrl' ko 'updatedData' mein add hi nahi karenge

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            updatedData, // Sirf wahi data update karo jo badla hai
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found to update." });
        }

        res.status(200).json(updatedProject);

    } catch (err) {
        console.error("--- UPDATE PROJECT FAILED ---", err);
        // Clean up the temporary file on failure if it exists
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, () => {});
        }
        res.status(500).json({ message: 'Server Error: Unable to update Project' });
    }
};

const DeleteProject = async (req, res) => {
    try{
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Project ID format' });
        }
        await Project.findByIdAndDelete(id)

        res.status(200).json({message:'Project Deleted Successfully'});
    }
    catch(err){
        res.status(500).json({message:'Server Error: Unable to delete Project'});
    }
}



// === GET SINGLE PROJECT BY ID ===
const GetProjectById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Project ID format' });
        }
        // URL se project ki ID nikalo
        const project = await Project.findById(req.params.id);

        // Agar project mil gaya, toh use client ko bhej do
        if (project) {
            res.status(200).json(project);
        } else {
            // Agar us ID se koi project nahi mila
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        console.error("--- GET PROJECT BY ID FAILED ---", error);
        res.status(500).json({ message: 'Server Error' });
    }
};
module.exports = {
    GetProject,
    AddProject,
    UpdateProject,
    DeleteProject,
    GetProjectById
};