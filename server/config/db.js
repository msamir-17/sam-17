const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, );

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`❌ Error: ${err.message}`);
        process.exit(1); // Server ko band kar dega agar DB connect na ho
    }
};

module.exports = connectDB;



// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try{
//         const conn = await mongoose.connect(process.env.MONGO_URI)
//     }
//     catch(err){
//         console.error(err.message);
//     }
// } 


// module.exports = connectDB;