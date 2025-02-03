// server/routes/venues.js
const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');

// GET venues with filters
router.get('/', async (req, res) => {
    try {
        const { location, radius, genres } = req.query;
        const [lng, lat] = location.split(',').map(parseFloat);

        const venues = await Venue.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [lng, lat] },
                    $maxDistance: radius * 1609 // Convert miles to meters
                }
            },
            genres: genres ? { $in: genres.split(',') } : { $exists: true }
        });

        res.json(venues);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/', async (req, res) => {
    const venues = await Venue.find(); // Requires MongoDB
    res.json(venues);
});
