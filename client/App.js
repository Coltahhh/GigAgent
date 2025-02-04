const [error, setError] = useState(null);

useEffect(() => {
    const fetchVenues = async () => {
        try {
            const response = await axios.get('/api/venues', {
                params: {
                    lng: -97.7431,  // Example Austin coordinates
                    lat: 30.2672,
                    radius: 10
                }
            });
            setVenues(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load venues. Please try again later.');
            console.error('API Error:', err);
        }
    };

    fetchVenues();
}, []);
