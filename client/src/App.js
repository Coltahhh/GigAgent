import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Venues from './pages/Venues';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import './styles/main.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/venues" element={<Venues />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;