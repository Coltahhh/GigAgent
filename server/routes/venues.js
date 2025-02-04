const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');

// GET all venues
router.get('/', async (req, res) => {
    try {
        const venues = await Venue.find();
        res.json(venues);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; // Single router export

// GET search venues with filters
router.get('/search', async (req, res) => {
    try {
        const { lng, lat, radius, genres, minCapacity, city } = req.query;
        const query = {};

        // Location-based search
        if (lng && lat) {
            query.location = {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: parseInt(radius) * 1609 || 16093 // Default 10 miles
                }
            };
        }

        // Text-based search
        if (city) {
            query['location.city'] = new RegExp(city, 'i'); // Case-insensitive search
        }

        // Numeric filters
        if (minCapacity) {
            query.capacity = { $gte: parseInt(minCapacity) };
        }

        // Array filters
        if (genres) {
            query.genres = { $in: genres.split(',') };
        }

        const venues = await Venue.find(query);
        res.json(venues);

    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ error: 'Search failed' });
    }
});