const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const loginUser = async (req, res) => {
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

module.exports = { registerUser, loginUser}