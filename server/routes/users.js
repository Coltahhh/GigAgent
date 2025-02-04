const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Example user route
router.post('/', async (req, res) => {
    // User registration logic
});

module.exports = router; // Must export router directly