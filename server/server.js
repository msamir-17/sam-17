
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');


const cloudinary = require('cloudinary').v2;



const internshipRoutes = require('./routes/internshipRoutes.js');
const certificateRoutes = require('./routes/certificateRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const projectRoutes = require('./routes/projectRoutes.js');
const heroRoutes = require('./routes/heroRoutes.js')

dotenv.config();

connectDB();


// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req,res) => {
    res.send("API is running...");
})

app.use('/api/internships', internshipRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes);
app.use('/api/hero', heroRoutes)



app.listen( PORT, () => {   
        console.log(`Server is running on port ${PORT}`);
    }
)

