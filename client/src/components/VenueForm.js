import { useState } from 'react';
import { useAuth } from '../context/authContext';
import axios from 'axios';

const VenueForm = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: 'TX',
        lng: '',
        lat: '',
        capacity: '',
        genres: [],
        amenities: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/venues', {
                ...formData,
                location: {
                    coordinates: [parseFloat(formData.lng), parseFloat(formData.lat)],
                    address: formData.address,
                    city: formData.city,
                    state: formData.state
                },
                owner: user.id
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Venue submitted successfully!');
        } catch (err) {
            console.error('Submission failed:', err.response?.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Add form fields here */}
            <button type="submit">Add Venue</button>
        </form>
    );
};