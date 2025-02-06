import { useState } from 'react';
import { createVenue } from '../api';

const AddVenueForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        phone: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createVenue(formData);
            alert('Venue added successfully!');
            setFormData({ name: '', address: '', city: '', phone: '' });
        } catch (error) {
            alert('Error adding venue');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Venue Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
            />
            <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
            />
            <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                required
            />
            <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
            />
            <button type="submit">Add Venue</button>
        </form>
    );
};

export default AddVenueForm;