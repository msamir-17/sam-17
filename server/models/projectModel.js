const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true
        
    },
    imageUrl:{
        type: String,
        required: true        
    },
    technologies:{
        type: [String],
        required: true

    },
    githubUrl: { 
        type: String,
        required: true
    },
    liveUrl: { 
        type: String,
        required: false 
    }
},
{
    timestamps: true // Yeh apne aap 'createdAt' aur 'updatedAt' fields add kar dega
});

const project = mongoose.model('Project', projectSchema);

module.exports = project;