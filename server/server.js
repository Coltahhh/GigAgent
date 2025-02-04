require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1); // Exit if DB connection fails
    });

// Routes - Do this ONCE
app.use('/api/users', require('./routes/users'));
app.use('/api/venues', require('./routes/venues'));
app.use('/api/yelp', require('./routes/yelp')); // Added yelp routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/api/test', (req, res) => {
    res.send('Server is working!');
});

const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? 'https://your-production-domain.com'
        : 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions)); // Instead of app.use(cors())

const venuesRouter = require('./routes/venues');
const usersRouter = require('./routes/users');
const yelpRouter = require('./routes/yelp');

app.use('/api/venues', venuesRouter);
app.use('/api/users', usersRouter);
app.use('/api/yelp', yelpRouter);