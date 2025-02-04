// client/src/components/VenueList.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const VenueList = () => {
    const [venues, setVenues] = useState([]);

    return (
        <div>
            <SearchForm onSearch={setVenues} />

            <div className="results">
                {venues.length > 0 ? (
                    venues.map(venue => (
                        <VenueCard key={venue._id} venue={venue} />
                    ))
                ) : (
                    <p>No venues found matching your criteria</p>
                )}
            </div>
        </div>
    );
};