import React, { useState } from 'react';
import axios from 'axios';

const VenueSearch = () => {
    const [venues, setVenues] = useState([]);
    const [searchData, setSearchData] = useState({
        location: '',
        radius: 10,
        genres: []
    });

    const handleSearch = async (e) => {
        e.preventDefault();

        // Get coordinates from location string (you'd use a geocoding service here)
        const { data } = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${searchData.location}&apiKey=${process.env.REACT_APP_GEOCODE_KEY}`);

        if (data.features.length > 0) {
            const [lng, lat] = data.features[0].geometry.coordinates;

            const res = await axios.get('/api/venues/search', {
                params: { lng, lat, radius: searchData.radius * 1609.34 } // Convert miles to meters
            });

            setVenues(res.data);
        }
    };

    return (
        <div>
            {/* Search form */}
            {venues.map(venue => (
                <div key={venue._id}>
                    <h3>{venue.name}</h3>
                    <p>Capacity: {venue.capacity}</p>
                </div>
            ))}
        </div>
    );
};

export default VenueSearch;