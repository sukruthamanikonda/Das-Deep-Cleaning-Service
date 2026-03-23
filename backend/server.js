require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());

// CORS Configuration
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:5173',
        'https://hygienixdeepcleaning.in',
        'https://www.hygienixdeepcleaning.in',
        'https://dasdeepcleaning.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

app.use(express.json());

const bookingsRoutes = require('./routes/bookings');
const ordersRoutes = require('./routes/orders');
const contactsRoutes = require('./routes/contacts');
const notificationsRoutes = require('./routes/notifications');
const { setTwilioClient } = require('./services/whatsapp');

// Base Path Configuration
// If running in production (or if specifically set), use /backend prefix
const BASE_PATH = process.env.BASE_PATH || (process.env.NODE_ENV === 'production' ? '/backend' : '');

console.log(`Setting up routes with BASE_PATH: '${BASE_PATH}'`);

app.use(`${BASE_PATH}/api/bookings`, bookingsRoutes);
app.use(`${BASE_PATH}/api/orders`, ordersRoutes);
app.use(`${BASE_PATH}/api/contacts`, contactsRoutes);
app.use(`${BASE_PATH}/api/notifications`, notificationsRoutes);

// Base route (Health Check)
app.get(`${BASE_PATH}/`, (req, res) => {
    res.send('Hygienix Backend is running!');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

const os = require('os');
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health Check URL: http://localhost:${PORT}${BASE_PATH}/`);

    // Log LAN IP for user convenience
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                console.log(`LAN Access: http://${iface.address}:${PORT}${BASE_PATH}/`);
            }
        }
    }
});
