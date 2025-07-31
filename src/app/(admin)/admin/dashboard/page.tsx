'use client'
import React, { useState } from 'react';
import AdminLayout from '@/components/adminPage/AdminLayout';
import AdminDashboard from '@/components/adminPage/AdminDashboard';
import AdminMovies from '@/components/adminPage/AdminMovies';
import AdminLocation from '@/components/adminPage/AdminLocation';
import AdminUsers from '@/components/adminPage/AdminUsers';

const AdminMain = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'movies':
        return <AdminMovies />;
      case 'locations':
        return <AdminLocation />;
      case 'users':
        return <AdminUsers />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminMain;