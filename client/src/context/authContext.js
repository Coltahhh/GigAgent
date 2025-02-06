import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const { data } = await axios.get('/api/auth/me', { withCredentials: true });
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (credentials) => {
        const { data } = await axios.post('/api/auth/login', credentials, {
            withCredentials: true
        });
        setUser(data.user);
    };

    const register = async (credentials) => {
        await axios.post('/api/auth/register', credentials, {
            withCredentials: true
        });
    };

    const logout = async () => {
        await axios.post('/api/auth/logout', {}, {
            withCredentials: true
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);