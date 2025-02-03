const express = require('express');
const router = express.Router();
const { searchTexasMusicVenues } = require('../services/yelpService');

// @route   GET /api/yelp/venues
// @desc    Get venues from Yelp
router.get('/venues', async (req, res) => {
    try {
        const venues = await searchTexasMusicVenues();
        res.json(venues);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;