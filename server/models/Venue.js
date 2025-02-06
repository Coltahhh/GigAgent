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
    _id: String, // Use the original ID from JSON as MongoDB _id
    name: {
        type: String,
        required: true
    },
    contact: contactSchema,
    location: locationSchema
}, {
    timestamps: true,
    // Remove virtuals to simplify seeding
    toJSON: {
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Venue', venueSchema);