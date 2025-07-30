'use client'
import React from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign,
  Film
} from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    { title: 'Total Revenue', value: '$124,580', change: '+12.5%', icon: <DollarSign className="w-6 h-6" />, color: 'text-green-600' },
    { title: 'Total Bookings', value: '2,847', change: '+8.2%', icon: <Calendar className="w-6 h-6" />, color: 'text-blue-600' },
    { title: 'Active Movies', value: '24', change: '+3', icon: <Film className="w-6 h-6" />, color: 'text-purple-600' },
    { title: 'Total Users', value: '12,389', change: '+15.3%', icon: <Users className="w-6 h-6" />, color: 'text-amber-600' },
  ];

  const recentBookings = [
    { id: 'BK001', movie: 'Epic Adventure', user: 'John Doe', amount: '$25.00', status: 'Confirmed', time: '2 hours ago' },
    { id: 'BK002', movie: 'Romantic Nights', user: 'Jane Smith', amount: '$30.00', status: 'Pending', time: '3 hours ago' },
    { id: 'BK003', movie: 'Space Odyssey', user: 'Mike Johnson', amount: '$35.00', status: 'Confirmed', time: '5 hours ago' },
    { id: 'BK004', movie: 'Action Hero', user: 'Sarah Wilson', amount: '$25.00', status: 'Cancelled', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600">{stat.title}</p>
                <p className="text-2xl font-bold text-amber-900 mt-2">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full bg-amber-50 ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">Revenue Overview</h3>
          <div className="h-64 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl flex items-center justify-center">
            <p className="text-amber-600">Chart would go here</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {recentBookings.map((booking, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div>
                  <p className="font-medium text-amber-900 text-sm">{booking.movie}</p>
                  <p className="text-xs text-amber-600">{booking.user}</p>
                  <p className="text-xs text-amber-500">{booking.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-amber-900">{booking.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;