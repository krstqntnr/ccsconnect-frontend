import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Hero } from './components/Hero';
import { QuickAccess } from './components/QuickAccess';
import { OpportunityCarousel } from './components/OpportunityCarousel';
import { AnalyticsSnapshot } from './components/AnalyticsSnapshot';
import { NoticeBoard } from './components/NoticeBoard';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { Login } from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import { RoleDashboards } from './components/RoleDashboards';
import { EnhancedOpportunities } from './components/EnhancedOpportunities';
import { ChatMessaging } from './components/ChatMessaging';
import { EventCalendar } from './components/EventCalendar';
import { ResourceLibrary } from './components/ResourceLibrary';
import { OfferVault } from './components/OfferVault';
import { Toaster } from './components/ui/sonner';
import { ProfilePage } from './components/ProfilePage';
import { SharedDataProvider } from './contexts/SharedDataContext';
import { SettingsPage } from './components/SettingsPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { Interns } from "./components/Interns";

function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function MainApp({ userRole, onRoleChange, onLogout }) {
  const [currentPage, setCurrentPage] = useState('home');

  // Redirect admin and company from home to dashboard
  useEffect(() => {
    if ((userRole === 'admin' || userRole === 'company') && currentPage === 'home') {
      setCurrentPage('dashboard');
    }
  }, [userRole, currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'opportunities':
        return (
          <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <EnhancedOpportunities />
          </div>
        );
        case 'interns':
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Interns userRole={userRole} />
    </div>
  );
      case 'profile':
        return <ProfilePage userRole={userRole} />;
      case 'dashboard':
        return (
          <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <RoleDashboards userRole={userRole} />
          </div>
        );
      case 'notices':
        return (
          <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-20">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">Campus Notices</h1>
              <NoticeBoard />
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <EventCalendar />
          </div>
        );
      case 'resources':
        return (
          <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <ResourceLibrary />
          </div>
        );
      case 'offers':
        return (
          <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <OfferVault />
          </div>
        );
      case 'settings':
        return (
          <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <SettingsPage />
          </div>
        );
      default:
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 py-20">
              <div className="lg:col-span-2">
                <QuickAccess onNavigate={setCurrentPage} />
              </div>
              <div className="lg:col-span-1">
                <NoticeBoard isHomePage={true} />
              </div>
            </div>
            <OpportunityCarousel />
            <AnalyticsSnapshot />
          </>
        );
    }
  };

  return (
    <SharedDataProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onLogout={onLogout}
          userRole={userRole}
          onRoleChange={onRoleChange}
        />
        <main className="relative">{renderPage()}</main>
        <ChatMessaging />
        <Footer onNavigate={setCurrentPage} />
        <Toaster />
      </div>
    </SharedDataProvider>
  );
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('student');
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    if (role) setUserRole(role);
    if (role === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('student');
    navigate('/login');
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <MainApp
              userRole={userRole}
              onRoleChange={setUserRole}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}