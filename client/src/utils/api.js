const API_URL = process.env.REACT_APP_API_URL || "https://gigagent.onrender.com";

export const fetchVenues = async () => {
    const response = await fetch(`${API_URL}/api/venues`);
    return response.json();
};
