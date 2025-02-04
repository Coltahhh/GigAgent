import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const checkLoggedIn = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return setLoading(false);

            const res = await axios.get('/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data);
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        const res = await axios.post('/api/auth/register', userData);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
    };

    const login = async (credentials) => {
        const res = await axios.post('/api/auth/login', credentials);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);