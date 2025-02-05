const mongoose = require('mongoose');
const Venue = require('../models/Venue');
const fs = require('fs');
const path = require('path');

const seedVenues = async () => {
    try {
        // Read JSON file
        const filePath = path.join(__dirname, 'data', 'venues.json');
        const venues = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Transform data to match schema
        const transformedVenues = venues.map(venue => ({
            _id: venue.id, // Map JSON 'id' to MongoDB '_id'
            name: venue.name,
            contact: venue.contact,
            location: venue.location
        }));

        // Insert into database
        await Venue.deleteMany();
        await Venue.insertMany(transformedVenues);

        console.log('✅ Venues seeded successfully');
    } catch (error) {
        console.error('❌ Seeding error:', error);
    }
};

module.exports = seedVenues;