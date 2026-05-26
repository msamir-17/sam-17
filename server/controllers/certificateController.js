
const Certificate = require('../models/certificationS.js'); // Sahi model ka naam
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const mongoose = require('mongoose');
const GetCertificate = async (req, res) => {
    try {
        const Certificates = await Certificate.find({});
        // Certificate model se kaho ki database mein jitni bhi internships hain, sab dhoondh kar le aaye
        res.status(200).json(Certificates)
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error in fetching Certificates' });
    }
};


// === GET SINGLE CERTIFICATE BY ID ===
const GetCertificateById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Certificate ID format' });
        }
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
            // Check if Cloudinary is configured
            if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
                console.error("Cloudinary credentials are not configured in environment variables!");
                fs.unlink(req.file.path, () => {});
                return res.status(500).json({ 
                    message: 'Cloudinary configuration is missing on the server. Please define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment.' 
                });
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'General_Certificates',
                resource_type: 'auto'
            });
            certificateLink = result.secure_url;

            // Clean up the temporary file uploaded by multer
            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Failed to delete temp file:", err);
            });
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
        // Clean up the temporary file on failure if it exists
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, () => {});
        }
        res.status(500).json({ message: 'Server Error: Unable to add Certificate' });
    }
};


// Sirf is function ko replace karein

const UpdateCertificate = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            if (req.file && req.file.path) {
                fs.unlink(req.file.path, () => {});
            }
            return res.status(400).json({ message: 'Invalid Certificate ID format' });
        }

        console.log("--- Checking Cloudinary Environment Variables on Render ---");
        const { title, issuedBy, dateEarned, category } = req.body;
        
        const updatedData = { title, issuedBy, dateEarned, category };

        // Check karo ki user ne nayi file upload ki hai ya nahi aur uski path valid hai
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
                folder: 'General_Certificates',
                resource_type: 'auto'
            });
            // Naye URL ko updatedData object mein add kar do
            updatedData.certificateLink = result.secure_url;

            // Clean up the temporary file uploaded by multer
            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Failed to delete temp file:", err);
            });
        }

        const updatedCertificate = await Certificate.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!updatedCertificate) {
            return res.status(404).json({ message: "Certificate not found to update." });
        }

        res.status(200).json(updatedCertificate);

    } catch (err) {
        console.error("--- UPDATE CERTIFICATE FAILED ---", err);
        // Clean up the temporary file on failure if it exists
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, () => {});
        }
        res.status(500).json({ message: 'Server Error: Unable to update Certificate' });
    }
};

const DeleteCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Certificate ID format' });
        }
        await Certificate.findByIdAndDelete(id)

        res.status(200).json({ message: 'Certificate Deleted Successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to delete Certificate' });
    }
}

module.exports = {
    GetCertificate,
    AddCertificate,
    UpdateCertificate,
    DeleteCertificate,
    GetCertificateById
};