import { useEffect, useState } from 'react';
import { fetchVenueDetails } from '../api';

const VenueDetail = ({ venueId }) => {
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const data = await fetchVenueDetails(venueId);
                setVenue(data);
            } catch (error) {
                console.error('Error loading venue details:', error);
            } finally {
                setLoading(false);
            }
        };
        loadDetails();
    }, [venueId]);

    if (loading) return <div>Loading details...</div>;
    if (!venue) return <div>Venue not found</div>;

    return (
        <div className="venue-detail">
            <h2>{venue.name}</h2>
            <p>Phone: {venue.contact.formattedPhone}</p>
            <div className="map-preview">
                <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${venue.location.lat},${venue.location.lng}&zoom=14&size=400x200&markers=color:red%7C${venue.location.lat},${venue.location.lng}&key=YOUR_GOOGLE_MAPS_KEY`}
                    alt="Location map"
                />
            </div>
        </div>
    );
};

export default VenueDetail;