// server/models/Venue.js
const venueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], required: true },
        address: String,
        city: String,
        state: { type: String, default: 'TX' }
    }
});
venueSchema.index({ location: '2dsphere' });