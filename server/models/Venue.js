// backend/models/Venue.js
const mongoose = require('mongoose');

const labeledLatLngSchema = new mongoose.Schema({
    label: String,
    lat: Number,
    lng: Number
}, { _id: false });

const locationSchema = new mongoose.Schema({
    address: String,
    crossStreet: String,
    lat: Number,
    lng: Number,
    labeledLatLngs: [labeledLatLngSchema],
    postalCode: String,
    cc: String,
    city: String,
    state: String,
    country: String,
    formattedAddress: [String]
}, { _id: false });

const contactSchema = new mongoose.Schema({
    phone: String,
    formattedPhone: String
}, { _id: false });

const venueSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contact: contactSchema,
    location: locationSchema
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add virtual for the MongoDB ID to maintain compatibility
venueSchema.virtual('id').get(function() {
    return this._id;
});

venueSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

venueSchema.set('toObject', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('Venue', venueSchema);