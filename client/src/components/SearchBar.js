import { useEffect, useState } from 'react';
import { fetchVenues } from '../api';

const VenueList = () => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadVenues = async () => {
            try {
                const data = await fetchVenues();
                setVenues(data);
            } catch (error) {
                console.error('Error loading venues:', error);
            } finally {
                setLoading(false);
            }
        };
        loadVenues();
    }, []);

    if (loading) return <div>Loading venues...</div>;

    return (
        <div className="venue-list">
            {venues.map(venue => (
                <div key={venue._id} className="venue-card">
                    <h3>{venue.name}</h3>
                    <p>{venue.location.address}</p>
                    <p>{venue.location.city}, {venue.location.state}</p>
                    <button onClick={() => handleViewDetails(venue._id)}>View Details</button>
                </div>
            ))}
        </div>
    );
};

export default VenueList;