const axios = require('axios');

async function getTexasMusicVenues() {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
        headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
        params: {
            location: 'Texas, USA',
            categories: 'musicvenues',
            limit: 50,
            sort_by: 'rating'
        }
    });

    return response.data.businesses.map(biz => ({
        name: biz.name,
        location: {
            coordinates: [biz.coordinates.longitude, biz.coordinates.latitude],
            address: biz.location.address1,
            city: biz.location.city,
            state: biz.location.state
        },
        rating: biz.rating,
        capacity: Math.floor(Math.random() * (1000 - 50 + 1) + 50) // Mock capacity
    }));
}