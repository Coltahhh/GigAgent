const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid email']
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['musician', 'venue'], required: true },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number]  // [longitude, latitude]
    }
});

userSchema.index({ location: '2dsphere' }); // Geospatial index

module.exports = mongoose.model('User', userSchema);
