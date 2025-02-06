import express from 'express';
import Venue from '../models/Venue.js';

const router = express.Router();

// Get all venues
router.get('/', async (req, res) => {
    try {
        const venues = await Venue.find();
        res.json(venues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search venues
router.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        const venues = await Venue.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { 'location.address': { $regex: query, $options: 'i' } },
                { 'location.city': { $regex: query, $options: 'i' } }
            ]
        });
        res.json(venues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new venue
router.post('/', async (req, res) => {
    const venue = new Venue({
        _id: generateCustomId(), // You'll need an ID generator
        ...req.body
    });

    try {
        const newVenue = await venue.save();
        res.status(201).json(newVenue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;