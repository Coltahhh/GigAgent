const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Venue name is required'],
        trim: true
    },
    location: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point'] // Ensures only Point type is used
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: (value) => value.length === 2,
                message: 'Coordinates must be an array of [longitude, latitude]'
            }
        },
        address: {
            type: String,
            required: [true, 'Address is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        },
        state: {
            type: String,
            required: [true, 'State is required'],
            maxlength: 2
        }
    },
    capacity: {
        type: Number,
        min: [10, 'Minimum capacity is 10'],
        max: [10000, 'Maximum capacity is 10,000']
    },
    genres: [String],
    amenities: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create geospatial index
venueSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Venue', venueSchema);