const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Venue = require('../models/Venue');

// @route   GET /api/venues/search
// @desc    Search venues
router.get('/search', async (req, res) => {
    try {
        const { lng, lat, radius, genres } = req.query;

        const venues = await Venue.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: parseInt(radius) || 10000 // Default 10km
                }
            },
            genres: { $in: genres ? genres.split(',') : [] }
        }).populate('owner', 'name email');

        res.json(venues);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});