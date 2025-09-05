const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const protect = async (req , res , next ) => {
    let token ;
// Check karo ki request ke headers mein token hai aur woh 'Bearer' se shuru ho raha hai
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Step 2: Header se token ko nikalo ('Bearer ' waale hisse ko hata kar)
            token = req.headers.authorization.split(' ')[1];

            
            // Step 3: Token ko verify karo (Secret Key ka istemaal karke)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            
            // Step 4: Token ke andar se user ki ID nikalo aur us ID se user ko database mein dhoondho
            // Hum password nahi chahte, isliye '-password' likha hai
            req.user = await User.findById(decoded.id).select('-password');

            // Step 5: Agar sab kuch theek hai, toh agle middleware ya route handler pe jao
            next();
        }
        catch(error){
            console.error(error);
            res.status(401).json({message: 'Not authorized, token failed'});
        }
    }
    if(!token){
        res.status(401).json({message: 'Not authorized, no token'});
    }
};

module.exports = { protect };