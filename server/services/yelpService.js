const axios = require('axios');

const yelpClient = axios.create({
    baseURL: 'https://api.yelp.com/v3',
    headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
});

async function searchTexasMusicVenues() {
    try {
        const response = await yelpClient.get('/businesses/search', {
            params: {
                location: 'Texas, USA',
                categories: 'musicvenues',
                limit: 50,
                sort_by: 'rating'
            }
        });

        return response.data.businesses.map(biz => ({
            name: biz.name,
            address: biz.location.address1,
            city: biz.location.city,
            state: biz.location.state,
            coordinates: [
                biz.coordinates.longitude,
                biz.coordinates.latitude
            ],
            rating: biz.rating,
            url: biz.url
        }));

    } catch (err) {
        console.error('Yelp API Error:', err.response?.data || err.message);
        return [];
    }
}

module.exports = { searchTexasMusicVenues };