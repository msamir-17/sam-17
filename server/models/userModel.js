const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Humara Password Locker

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

// Ek special function jo user ke save hone se 'theek pehle' chalega

userSchema.pre('save', async function (next)  {
    // Agar password modify nahi hua hai, toh aage badh jao
    if(!this.isModified('password')) {
        next();
    }

     // Password ko hash karne se pehle 'salt' generate karo
    const salt = await bcrypt.genSalt(10);

     // Ab password ko hash karke uski jagah save kar do
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;