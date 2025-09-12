
const Internship = require('../models/InternshipS.js'); // Importing the Internship model
const cloudinary = require('cloudinary').v2;

const GetInternships = async (req, res) => {
    try {
        const Internships = await Internship.find({});           // Internship model se kaho ki database mein jitni bhi internships hain, sab dhoondh kar le aaye


        res.status(200).json(Internships)
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error in fetching Internships' });
    }
};

const AddInternships = async (req, res) => {
    // Client (admin panel) se aane waale data ko nikalo (company, role, etc.)
    const { company, role, duration, description } = req.body;
    let certificateUrl = '';

     if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'Internship_Certificates'
            });
            certificateUrl = result.secure_url;
        }


    try {
        const newIntern = new Internship({
            company,
            role,
            duration,
            description,
            certificateUrl// Cloudinary ka secure URL
        });


        // Is nayi internship ko database mein save kar do
        const saveintern = await newIntern.save();

        // Client ko confirmation bhej ne k liye ki internship save ho gayi hai
        res.status(201).json({ message: 'New Internship Added', internship: saveintern });

    }
    catch (err) {
        console.error("ADD INTERNSHIP FAILED:", err);
        res.status(500).json({ message: 'Server Error: Unable to add Internship' });
    };

};


const UpdateInternships = async (req, res) => {
    try {
        // Step 1: URL se us internship ki ID nikalo jise update karna hai

        // Step 2: Client (admin panel) se aane waale naye data ko nikalo
        const { company, role, duration, description } = req.body;
        const updatedData = { company, role, duration, description };

        // Step 3: Database mein us ID ko dhoondho aur naye data se update kar do


        if (req.file) {
            console.log("New image detected, uploading to Cloudinary...");
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'Internship_Certificates'
            });
            updatedData.certificateUrl = result.secure_url;
        }

        const updatedIntern = await Internship.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        res.status(200).json(updatedIntern);


    }
    catch (err) {
        
        console.error("UPDATE INTERNSHIP FAILED:", err);
        res.status(500).json({ message: 'Server Error: Unable to update Internship' });
    }
}

const GetIntershipById = async (req, res) => {
    try {
        // URL se internship ki ID nikalo
        const internship = await Internship.findById(req.params.id);

        // Agar project mil gaya, toh use client ko bhej do
        if (internship) {
            res.status(200).json(internship);
        } else {
            // Agar us ID se koi internship nahi mila
            res.status(404).json({ message: 'internship not found' });
        }
    } catch (error) {
        console.error("--- GET internship BY ID FAILED ---", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const DeleteInternships = async (req, res) => {
    try {
        const { id } = req.params;
        await Internship.findByIdAndDelete(id)

        res.status(200).json({ message: 'Internship Deleted Successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to delete Internship' });
    }
}

module.exports = {
    GetInternships,
    AddInternships,
    UpdateInternships,
    DeleteInternships,
    GetIntershipById
};