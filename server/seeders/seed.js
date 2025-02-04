// server/seeders/seed.js
const mongoose = require('mongoose');
const Venue = require('../models/Venue');
require('dotenv').config();

const sampleVenues = [
    {
        name: "The Continental Club",
        location: {
            coordinates: [-97.7431, 30.2672],
            address: "1315 S Congress Ave",
            city: "Austin",
            state: "TX"
        },
        capacity: 300,
        genres: ["rock", "blues"]
    },
    {
        name: "Antone's Nightclub",
        location: {
            coordinates: [-97.7405, 30.2664],
            address: "305 E 5th St",
            city: "Austin",
            state: "TX"
        },
        capacity: 650,
        genres: ["blues", "soul"]
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding');

        // Clear existing data
        await Venue.deleteMany();
        console.log('Cleared existing venues');

        // Insert sample data
        await Venue.insertMany(sampleVenues);
        console.log('Added sample venues');

        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seedDatabase();