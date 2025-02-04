import React, { useState } from 'react';
import axios from 'axios';

const SearchForm = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useState({
        city: '',
        lng: '',
        lat: '',
        radius: 10,
        genres: [],
        minCapacity: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:5000/api/venues/search', {
                params: searchParams
            });
            onSearch(response.data);
        } catch (err) {
            console.error('Search error:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div className="form-group">
                <label>City:</label>
                <input
                    type="text"
                    value={searchParams.city}
                    onChange={(e) => setSearchParams({...searchParams, city: e.target.value})}
                />
            </div>

            <div className="form-group">
                <label>Search Radius (miles):</label>
                <input
                    type="range"
                    min="1"
                    max="50"
                    value={searchParams.radius}
                    onChange={(e) => setSearchParams({...searchParams, radius: e.target.value})}
                />
                <span>{searchParams.radius} mi</span>
            </div>

            <div className="form-group">
                <label>Minimum Capacity:</label>
                <input
                    type="number"
                    value={searchParams.minCapacity}
                    onChange={(e) => setSearchParams({...searchParams, minCapacity: e.target.value})}
                />
            </div>

            <div className="form-group">
                <label>Genres:</label>
                <select
                    multiple
                    value={searchParams.genres}
                    onChange={(e) => setSearchParams({
                        ...searchParams,
                        genres: Array.from(e.target.selectedOptions, option => option.value)
                    })}
                >
                    <option value="rock">Rock</option>
                    <option value="jazz">Jazz</option>
                    <option value="country">Country</option>
                    <option value="electronic">Electronic</option>
                </select>
            </div>

            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;