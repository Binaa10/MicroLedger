import React, { createContext, useState, useContext, useEffect } from 'react';
import { getDB } from '../database/db';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (username, password) => {
        setIsLoading(true);
        try {
            const db = getDB();
            const result = db.getAllSync(
                'SELECT * FROM users WHERE username = ? AND password = ?',
                [username, password]
            );

            if (result.length > 0) {
                setUser(result[0]);
                return { success: true };
            } else {
                return { success: false, message: 'Invalid credentials' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'An error occurred' };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
