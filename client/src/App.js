import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VenueList from './components/VenueList';
import VenueDetail from './components/VenueDetail';
import AddVenueForm from './components/AddVenueForm';
import SearchBar from './components/SearchBar';

function App() {
    return (
        <Router>
            <div className="App">
                <SearchBar />
                <Routes>
                    <Route path="/" element={<VenueList />} />
                    <Route path="/venues/:id" element={<VenueDetail />} />
                    <Route path="/add-venue" element={<AddVenueForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;