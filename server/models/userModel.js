const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Humara Password Locker
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    passwordResetToken: String,
    passwordResetExpires: Date
    
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

userSchema.methods.createPasswordResetToken = function() {
    // 1. Ek random token banayein
    const resetToken = crypto.randomBytes(32).toString('hex');

    // 2. Is token ko hash karke database mein save karein (security ke liye)
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
    // 3. Token ki expiry set karein (10 minutes)
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    // 4. Plain (un-hashed) token ko email mein bhejne ke liye return karein
    return resetToken;
};


const User = mongoose.model('User', userSchema);

module.exports = User;