// client/src/components/VenueSearch.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VenueSearch = () => {
    const [venues, setVenues] = useState([]);
    const [search, setSearch] = useState({
        location: '30.2672,-97.7431', // Default to Austin, TX
        radius: 10,
        genres: ''
    });

    const fetchVenues = async () => {
        try {
            const res = await axios.get('/api/venues', {
                params: search
            });
            setVenues(res.data);
        } catch (err) {
            console.error('Error fetching venues:', err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchVenues();
    }, []); // Empty dependency array for initial load

    return (
        <div>
            <input
                type="text"
                placeholder="Latitude,Longitude"
                value={search.location}
                onChange={e => setSearch({...search, location: e.target.value})}
            />
            <input
                type="number"
                value={search.radius}
                onChange={e => setSearch({...search, radius: e.target.value})}
            />
            <button onClick={fetchVenues}>Search</button>

            {venues.map(venue => (
                <div key={venue._id}>
                    <h3>{venue.name}</h3>
                    <p>{venue.location.address}</p>
                </div>
            ))}
        </div>
    );
};

export default VenueSearch;