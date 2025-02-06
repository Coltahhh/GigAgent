// backend/routes/venues.js
const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');

// GET all venues with pagination
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const venues = await Venue.find()
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Venue.countDocuments();

        res.json({
            data: venues,
            meta: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching venues:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET single venue by ID
router.get('/:id', async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id);
        if (!venue) {
            return res.status(404).json({ error: 'Venue not found' });
        }
        res.json(venue);
    } catch (error) {
        console.error('Error fetching venue:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST create new venue
router.post('/', async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.name || !req.body.location?.city) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create venue with either provided ID or generated ID
        const venueData = {
            _id: req.body.id || new mongoose.Types.ObjectId(),
            name: req.body.name,
            contact: req.body.contact || {},
            location: {
                address: req.body.location?.address || '',
                crossStreet: req.body.location?.crossStreet || '',
                lat: req.body.location?.lat || 0,
                lng: req.body.location?.lng || 0,
                postalCode: req.body.location?.postalCode || '',
                cc: req.body.location?.cc || 'US',
                city: req.body.location.city,
                state: req.body.location?.state || '',
                country: req.body.location?.country || 'United States'
            }
        };

        const newVenue = new Venue(venueData);
        const savedVenue = await newVenue.save();

        res.status(201).json(savedVenue);
    } catch (error) {
        console.error('Error creating venue:', error);
        res.status(400).json({ error: 'Bad request' });
    }
});

// Search venues
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ error: 'Missing search query' });
        }

        const results = await Venue.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { 'location.address': { $regex: query, $options: 'i' } },
                { 'location.city': { $regex: query, $options: 'i' } }
            ]
        }).limit(10);

        res.json(results);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;