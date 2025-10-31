// backend/src/server.js (UPDATED VERSION)

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('../models'); // Import sequelize instance
const authRoutes = require('./routes/authRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const consigneeRoutes = require('./routes/consigneeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/consignee', consigneeRoutes);

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Sync database and start server
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }) // Use { force: true } to drop tables (only in dev!)
    .then(() => {
        console.log('✅ Database synced successfully');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Database sync failed:', err);
    });
