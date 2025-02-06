const mongoose = require('mongoose');
const Venue = require('../models/Venue');
const fs = require('fs');
const path = require('path');

const seedVenues = async () => {
    try {
        const filePath = path.join(__dirname, 'data', 'venues.json');
        const venues = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Transform data to match schema
        const transformedVenues = venues.map(venue => ({
            _id: venue.id, // Map JSON id to MongoDB _id
            name: venue.name,
            contact: venue.contact,
            location: venue.location
        }));

        await Venue.deleteMany();
        await Venue.insertMany(transformedVenues);

        console.log(`✅ ${transformedVenues.length} venues seeded successfully`);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    } finally {
        mongoose.disconnect();
    }
};

// Connect to DB and run seeder
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gigagent')
    .then(() => seedVenues())
    .catch(err => console.error('❌ DB connection error:', err));