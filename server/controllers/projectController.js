
const Project = require('../models/projectModel.js'); // Importing the Project model
const cloudinary = require('cloudinary').v2;

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

        console.log(req.file.path);

        const result = await cloudinary.uploader.upload(req.file.path,{
            folder: 'Projects_Photos',
            resource_type: 'image'
        });
        console.log(result);
        const newProject = new Project({
            title,
            description,
            imageUrl: result.secure_url , // Cloudinary ka secure URL
            technologies: technologies.split(',').map(tech => tech.trim()), // Comma-separated string ko array mein badlo 
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
        res.status(500).json({message:'Server Error: Unable to add Project'});
    };

};


// Is poore function ko replace karein

// Sirf is function ko replace karein

const UpdateProject = async (req, res) => {
    try {
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
        // Check karo ki user ne nayi image upload ki hai ya nahi
        if (req.file) {
            console.log("New image detected, uploading to Cloudinary...");
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'Projects_Photos',
                resource_type: 'image'
            });
            updatedData.imageUrl = result.secure_url;
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
        res.status(500).json({ message: 'Server Error: Unable to update Project' });
    }
};

const DeleteProject = async (req, res) => {
    try{
        const { id } = req.params;
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