import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get('/api/v1/users/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data.data.user);
            } catch (err) {
                localStorage.removeItem('token');
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const register = async (userData) => {
        const res = await axios.post('/api/v1/auth/register', userData);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.data.user);
    };

    const login = async (credentials) => {
        const res = await axios.post('/api/v1/auth/login', credentials);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.data.user);
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