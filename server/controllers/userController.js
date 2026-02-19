const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
// Ek helper function jo ID ke aadhar par Token banayega
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// === Admin User ko Register karna ===

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check karna ki username exits karte hain ya nahi
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Naya User create karna
        const user = await User.create({
            username,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


// ===  Admin User ko Login karna ===

const   loginUser = async (req, res) => {
    try{
        const { username, password } = req.body;

        // Check karna ki user exist karta hai ya nahi
        const user  = await User.findOne({ username });

        // Agar user mil jata hai to password ko compare karna
        if(user && (await bcrypt.compare(password, user.password))){
            res.json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else{
            res.status(401).json({ message: "Invalid username or password" });
        }

    }
    catch(err){
        res.status(500).json({ message: "Server Error" });
    }
};


const forgotPassword = async (req, res) => {
    // 1. Username ke aadhar par user ko dhoondho
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // 2. User ke liye ek naya reset token banayein
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3. User ko email bhejein
    const resetURL = `${req.protocol}://${req.get('host')}/admin/reset-password/${resetToken}`;
    const message = `Forgot your password? Submit a PUT request with your new password to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: 'Your Portfolio Admin <your-email@gmail.com>',
            to: process.env.EMAIL_USER, // Hum admin ko hi email bhej rahe hain
            subject: 'Password Reset Token',
            text: message
        });

        res.status(200).json({ message: 'Token sent to email!' });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(500).json({ message: 'Error sending email. Try again later.' });
    }
};

const resetPassword = async (req, res) => {
    // ... (Next step mein banayenge)
};

module.exports = { registerUser, loginUser,forgotPassword , resetPassword}