// client/src/components/VenueList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VenueList = () => {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/venues');
                setVenues(response.data);
            } catch (err) {
                console.error('Error fetching venues:', err);
            }
        };
        fetchVenues();
    }, []);

    return (
        <div>
            {venues.map(venue => (
                <div key={venue._id}>{venue.name}</div>
            ))}
        </div>
    );
};

export default VenueList;
