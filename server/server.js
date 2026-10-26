
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
const analyticsRoutes = require('./routes/analyticsRoutes.js')
const contactRoutes = require('./routes/contactRoutes.js');

dotenv.config();

connectDB();


// Cloudinary configuration
const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;
if (!isCloudinaryConfigured) {
    console.warn("⚠️  WARNING: Cloudinary is not fully configured in server/.env file. File uploads will fail! Please define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
}
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const app = express();


app.use((req, res, next) => {
    const allowedOrigins = [
        'http://localhost:3000',
        'https://sam-17.vercel.app',
        'https://sam-17-f42l.vercel.app'
    ];
    const origin = req.headers.origin;
    const isAllowedVercel = origin && origin.endsWith('.vercel.app') && (origin.includes('sam-17') || origin.includes('sam17'));
    
    if (allowedOrigins.includes(origin) || isAllowedVercel) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle pre-flight requests for CORS
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});


app.use(express.json());

const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("API is running...");
});

// Health check endpoint for monitoring & keep-alive
app.get('/api/health', (req, res) => {
    const isDbConnected = mongoose.connection.readyState === 1;
    res.status(200).json({
        status: 'ok',
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        database: isDbConnected ? 'connected' : 'disconnected'
    });
});

app.use('/api/internships', internshipRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes);
app.use('/api/hero', heroRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/contact', contactRoutes);



app.listen(PORT, () => {   
    console.log(`Server is running on port ${PORT}`);

    // Keep-Alive Mechanism: Pings the server every 14 minutes to prevent Render free-tier spin down
    const SERVER_URL = process.env.RENDER_EXTERNAL_URL || process.env.SERVER_URL;
    if (SERVER_URL) {
        const KEEP_ALIVE_INTERVAL = 14 * 60 * 1000; // 14 mins
        setInterval(async () => {
            try {
                const response = await fetch(`${SERVER_URL}/api/health`);
                if (response.ok) {
                    console.log(`[Keep-Alive] Pinged ${SERVER_URL}/api/health - Status: ${response.status}`);
                }
            } catch (err) {
                console.warn(`[Keep-Alive] Ping failed: ${err.message}`);
            }
        }, KEEP_ALIVE_INTERVAL);
        console.log(`⏰ Keep-alive active for: ${SERVER_URL}`);
    }
});

