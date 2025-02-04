const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Venue name is required'],
        trim: true,
        unique: true
    },
    location: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point'] // Ensures only Point type is used
        },
        coordinates: {
            type: [Number],
            required: [true, 'Coordinates are required'],
            validate: {
                validator: function(value) {
                    return value.length === 2 &&
                        value[0] >= -180 && value[0] <= 180 && // Longitude validation
                        value[1] >= -90 && value[1] <= 90;    // Latitude validation
                },
                message: 'Coordinates must be valid [longitude, latitude] pair (-180 to 180 for longitude, -90 to 90 for latitude)'
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
            uppercase: true,
            minlength: 2,
            maxlength: 2,
            enum: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
        }
    },
    capacity: {
        type: Number,
        required: [true, 'Capacity is required'],
        min: [10, 'Minimum capacity is 10'],
        max: [10000, 'Maximum capacity is 10,000']
    },
    genres: {
        type: [String],
        required: [true, 'At least one genre is required'],
        enum: ['rock', 'jazz', 'country', 'electronic', 'blues', 'folk', 'hiphop', 'classical']
    },
    amenities: {
        type: [String],
        enum: ['parking', 'stage', 'lighting', 'sound', 'bar', 'food', 'wheelchair']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Venue owner is required']
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Geospatial index for location-based queries
venueSchema.index({ location: '2dsphere' });

// Text index for search
venueSchema.index({
    name: 'text',
    'location.city': 'text',
    genres: 'text'
});

module.exports = mongoose.model('Venue', venueSchema);