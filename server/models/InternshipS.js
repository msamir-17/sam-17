const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema(
    {
        company:{
            type: String,
            required: true
        },
        role:{
            type: String,
            required: true
        },
        duration:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        }
    }
);

// Is blueprint se hum ek Model banayenge
const Internship = mongoose.model('Internship', InternshipSchema);


// Is model ko doosri files mein use karne ke liye export karenge
module.exports = Internship;