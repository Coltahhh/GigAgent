const API_URL = process.env.REACT_APP_API_URL || "https://gigagent.onrender.com";

export const searchVenues = async (query) => {
    const response = await fetch(`${API_URL}/api/venues/search?q=${query}`);
    return response.json();
};