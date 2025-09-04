
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

const internshipRoutes = require('./routes/internshipRoutes.js');
const certificateRoutes = require('./routes/certificateRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

dotenv.config();

connectDB();


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
app.listen( PORT, () => {   
        console.log(`Server is running on port ${PORT}`);
    }
)