import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { AuthCallback } from './AuthCallback';
import { Home } from './Home';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { NoticeBoard } from './NoticeBoard';
import { OpportunityCarousel } from './OpportunityCarousel';
import { OpportunityDetail } from './OpportunityDetail';
import { Companies } from './Companies';
import { AnalyticsSnapshot } from './AnalyticsSnapshot';

const Layout = ({ children }) => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {user && <Navigation />}
      <main className="relative">{children}</main>
      {user && <Footer />}
    </div>
  );
};

const OpportunitiesPage = () => (
  <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">Internship & Placement Opportunities</h1>
      <div className="text-center text-gray-600 dark:text-gray-400 mb-16"><p className="text-xl">Find your perfect internship or placement opportunity</p></div>
      <OpportunityCarousel />
    </div>
  </div>
);

const ProfilePageRouter = () => {
  const { profile } = useAuth();
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">My Profile</h1>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">{profile?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{profile?.full_name || 'User'}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{profile?.department && profile?.year ? `${profile.department} • Year ${profile.year}` : profile?.role || 'Student'}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div><div className="text-2xl font-bold text-gray-700 dark:text-gray-300">8.5</div><div className="text-gray-600 dark:text-gray-400">CGPA</div></div>
                <div><div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</div><div className="text-gray-600 dark:text-gray-400">Applications</div></div>
                <div><div className="text-2xl font-bold text-green-600 dark:text-green-400">3</div><div className="text-gray-600 dark:text-gray-400">Interviews</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => (
  <div className="pt-24 min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">Analytics Dashboard</h1>
      <AnalyticsSnapshot />
    </div>
  </div>
);

const NoticesPage = () => (
  <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">Campus Notices</h1>
      <NoticeBoard />
    </div>
  </div>
);

const UnauthorizedPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Access Denied</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">You don't have permission to access this page.</p>
      <button onClick={() => window.history.back()} className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 py-3 rounded-lg">Go Back</button>
    </div>
  </div>
);

export const AppRouter = () => (
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
        <Route path="/opportunities" element={<ProtectedRoute><Layout><OpportunitiesPage /></Layout></ProtectedRoute>} />
        <Route path="/opportunities/:id" element={<ProtectedRoute><Layout><OpportunityDetail /></Layout></ProtectedRoute>} />
        <Route path="/companies" element={<ProtectedRoute><Layout><Companies /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Layout><ProfilePageRouter /></Layout></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Layout><DashboardPage /></Layout></ProtectedRoute>} />
        <Route path="/notices" element={<ProtectedRoute><Layout><NoticesPage /></Layout></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  </Router>
);