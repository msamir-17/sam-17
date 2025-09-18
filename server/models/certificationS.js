// In server/models/certificateModel.js

const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    issuedBy: {
        type: String,
        required: true
    },
    dateEarned: {
        type: String,
        required: true
    },
    // FIX #1: Field ka naam theek kiya
    certificateLink: {
        type: String,
        required: true
    },
    // FIX #2: Nayi 'category' field add ki
    category: {
        type: String,
        required: true,
        // Hum yahan kuch common categories define kar sakte hain
        enum: ['Course', 'Participation', 'Hackathon', 'Workshop', 'Competition', 'Sports', 'Other']
    }
}, { timestamps: true });

const Certificate = mongoose.model('Certificate', CertificationSchema);
module.exports = Certificate;