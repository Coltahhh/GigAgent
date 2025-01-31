const venueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    capacity: Number,
    amenities: [String],
    genres: [String],
    availability: [Date],
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number]
    }
});

venueSchema.index({ location: '2dsphere' });