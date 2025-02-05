require('dotenv').config();
const mongoose = require('mongoose');
const Venue = require('../models/Venue');

// Simple test venue
const sampleVenues = [
    {
        name: "Test Venue",
        location: {
            coordinates: [-97.7431, 30.2672], // Longitude first!
            address: "123 Test St",
            city: "Austin",
            state: "TX"
        },
        capacity: 100,
        genres: ["test"],
        amenities: ["test"]
    }
];

async function seedDatabase() {
    try {
        console.log('Connecting to MongoDB...');

        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected');

        console.log('Clearing existing data...');
        await Venue.deleteMany();

        console.log('Inserting test venue...');
        const result = await Venue.insertMany(sampleVenues);
        console.log('✅ Inserted documents:', result);

        process.exit(0);
    } catch (err) {
        console.error('❌ SEEDING FAILED:', err.message);
        if (err.errors) console.log('Validation errors:', err.errors);
        process.exit(1);
    }
}

seedDatabase();