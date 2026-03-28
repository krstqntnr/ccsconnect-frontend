import React from 'react';
import { StudentDashboard } from './StudentDashboard';
import { AdminDashboard } from './AdminDashboard';
import { CompanyDashboard } from './CompanyDashboard';

export const RoleDashboards = ({ userRole }) => {
  if (userRole === 'admin') return <AdminDashboard />;
  if (userRole === 'company') return <CompanyDashboard />;
  if (userRole === 'student') return <StudentDashboard />;

  // Fallback for other roles (college, alumni)
  const getDashboardTitle = () => {
    switch (userRole) {
      case 'college': return 'College Dashboard';
      case 'alumni': return 'Alumni Dashboard';
      default: return 'Dashboard';
    }
  };

  const getDashboardDescription = () => {
    switch (userRole) {
      case 'college': return 'Monitor student placements and manage institutional partnerships';
      case 'alumni': return 'Stay connected and share your experiences with current students';
      default: return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{getDashboardTitle()}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{getDashboardDescription()}</p>
      </div>
      <div className="text-center text-gray-500">Dashboard content coming soon.</div>
    </div>
  );
};