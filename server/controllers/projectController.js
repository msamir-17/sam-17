
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


const UpdateProject = async (req, res) => {
    try {
        // Step 1: URL se us project ki ID nikalo jise update karna hai
        const { id } = req.params;

        // console.log(id);
        // console.log(req.body);

        // Step 2: Client (admin panel) se aane waale naye data ko nikalo
        const {title , description, imageUrl, technologies, githubUrl, liveUrl} = req.body;

        // Step 3: Database mein us ID ko dhoondho aur naye data se update kar do
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { title, description, imageUrl, technologies, githubUrl, liveUrl },
            {new: true} // Yeh option ensure karta hai ki updated document return ho
        );

        res.status(200).json(updatedProject);


    }
    catch(err){
        res.status(500).json({message:'Server Error: Unable to update Project'});
    }
}


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

module.exports = {
    GetProject,
    AddProject,
    UpdateProject,
    DeleteProject
};