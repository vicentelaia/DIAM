import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // Get token
      const tokenResponse = await api.post('/api/auth/login/', { username, password });
      const token = tokenResponse.data.token;
      
      // Get user data
      const userResponse = await api.get('/api/auth/user/', {
        headers: { 'Authorization': `Token ${token}` }
      });
      
      // Store data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userResponse.data));
      
      // Set up API headers
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
      
      setUser(userResponse.data);
      return userResponse.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 