const mongoose= require('mongoose');

const HeroSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    resumeurl:{
        type: String,
        required: true
    },
    greeting:{
        type: String,
        default:"Hi I'm"
    },
    bio:{
        type: String,
        required: true
    },
    jobtitles: {
        type: [String], // Yeh titles ki list hogi
        required: true
    }
});

const Hero = mongoose.model('Hero', HeroSchema);

module.exports = Hero;