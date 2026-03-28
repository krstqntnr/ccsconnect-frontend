// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock student user – you can change role to 'company' or 'admin' to test other dashboards
const MOCK_STUDENT = {
  id: 1,
  full_name: 'Test Student',
  email: 'student@example.com',
  role: 'student',      // Change to 'company' or 'admin' to test other dashboards
  department: 'Computer Science',
  year: 3,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Automatically log in as a student (for development)
    setUser(MOCK_STUDENT);
    setProfile(MOCK_STUDENT);
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    setUser(userData || MOCK_STUDENT);
    setProfile(userData || MOCK_STUDENT);
    localStorage.setItem('access_token', token || 'mock-token');
    localStorage.setItem('user_role', userData?.role || 'student');
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
  };

  const value = { user, profile, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};