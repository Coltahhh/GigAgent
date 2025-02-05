require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://your-production-domain.com/'
        : 'http://localhost:3000/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Add after other middleware
const authRoutes = require('./routes/auth');
app.use('/api/v1/auth', authRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1); // Exit if DB connection fails
    });

// Routes
const venuesRouter = require('./routes/venues');
const usersRouter = require('./routes/users');
const yelpRouter = require('./routes/yelp');

app.use('/api/venues', venuesRouter);
app.use('/api/users', usersRouter);
app.use('/api/yelp', yelpRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('🚀 Server running on port ${PORT}');
})
    .on('error', (err) => {
        console.error('Server startup error:', err.message);
        process.exit(1);
    });
