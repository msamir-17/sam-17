
const Certificate = require('../models/certificationS.js'); // Sahi model ka naam
const cloudinary = require('cloudinary').v2;
const GetCertificate = async (req, res) => {
    try{
        const Certificates = await Certificate.find({});  
         // Certificate model se kaho ki database mein jitni bhi internships hain, sab dhoondh kar le aaye
        res.status(200).json(Certificates)
    }
    catch(err){
        res.status(500).json({message:'Server Error in fetching Certificates'});
    }
};


// === GET SINGLE CERTIFICATE BY ID ===
const GetCertificateById = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);

        if (certificate) {
            res.status(200).json(certificate);
        } else {
            res.status(404).json({ message: 'Certificate not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
// ... Get, Update, Delete functions ...

const AddCertificate = async (req, res) => {
    try {
        const { title, issuedBy, dateEarned, category } = req.body;
        let certificateLink = ''; // Shuru mein khaali

        // Check karo ki file upload hui hai ya nahi
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'General_Certificates'
            });
            certificateLink = result.secure_url;
        } else {
            // Agar file nahi hai, toh error bhejo
            return res.status(400).json({ message: 'Certificate file is required.' });
        }

        const newCertificate = new Certificate({
            title,
            issuedBy,
            dateEarned,
            category,
            certificateLink
        });

        const savedCertificate = await newCertificate.save();
        res.status(201).json(savedCertificate);

    } catch (err) {
        console.error("ADD CERTIFICATE FAILED:", err);
        res.status(500).json({ message: 'Server Error: Unable to add Certificate' });
    }
};


const UpdateCertificate = async (req, res) => {
    try {
        // Step 1: URL se us internship ki ID nikalo jise update karna hai
        const { id } = req.params;

        // console.log(id);
        // console.log(req.body);

        // Step 2: Client (admin panel) se aane waale naye data ko nikalo
        const { title, issuedBy, dateEarned, category } = req.body;

        // Step 3: Database mein us ID ko dhoondho aur naye data se update kar do
        const updatedcertificate = await Certificate.findByIdAndUpdate(
            id,
            { title, issuedBy, dateEarned, category },
            {new: true} 
            // Yeh option ensure karta hai ki updated document return ho
        );
        res.status(200).json(updatedcertificate);
    }
    catch(err){
        res.status(500).json({message:'Server Error: Unable to update Certificate'});
    }
}

const DeleteCertificate = async (req, res) => {
    try{
        const { id } = req.params;
        await Certificate.findByIdAndDelete(id)

        res.status(200).json({message:'Certificate Deleted Successfully'});
    }
    catch(err){
        res.status(500).json({message:'Server Error: Unable to delete Certificate'});
    }
}

module.exports = {
    GetCertificate,
    AddCertificate,
    UpdateCertificate,
    DeleteCertificate,
    GetCertificateById
};