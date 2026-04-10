// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock user for development (change role as needed)
const MOCK_USER = {
  id: 1,
  full_name: 'Dev Student',
  email: 'dev@student.com',
  role: 'student',
  department: 'Computer Science',
  year: 3,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session (optional)
    const savedUser = localStorage.getItem('mock_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Real login (calls backend)
  const login = async (email, password) => {
    // This is where you would call your actual API
    // For now, we'll mock it
    // But we also want a direct bypass for development
    throw new Error('Real backend not configured yet. Use Google Dev Bypass instead.');
  };

  // Direct mock login – used by the dev bypass button
  const mockLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('mock_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mock_user');
  };

  const value = { user, loading, login, mockLogin, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};