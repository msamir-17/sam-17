const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    
    issuedBy:{
        type: String,
        required: true
    },

    dateEarned:{
        type: String,
        required: true
    },

    link:{
        type: String,
        required: true
    }
});

const certificate = mongoose.model('Certification', CertificationSchema);

module.exports = certificate