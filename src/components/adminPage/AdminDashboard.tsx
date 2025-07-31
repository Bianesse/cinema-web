'use client'
import { 
  Users, 
  Calendar, 
  DollarSign,
  Film
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { DashboardData, BookingWithTime } from '@/types';
import StatsCard from '@/components/card/StatsCard';
import DashboardSkeleton from '../skeleton/DashboardSkeleton';
import { set } from 'zod';

const DashboardPage = () => {
  const [data, setData] = useState<DashboardData>({
    totalRevenue: "0",
    totalBookings: 0,
    activeMovies: 0,
    totalUsers: 0,
    bookingsWithTime: [],
  });
  const [loading, setLoading] = useState(true);
  
  const stats = [
    { title: 'Total Revenue', value: `Rp${data.totalRevenue}`, change: '', icon: <DollarSign className="w-6 h-6" />, color: 'text-green-600' },
    { title: 'Total Bookings', value: data.totalBookings, change: '', icon: <Calendar className="w-6 h-6" />, color: 'text-blue-600' },
    { title: 'Active Movies', value: data.activeMovies, change: '', icon: <Film className="w-6 h-6" />, color: 'text-purple-600' },
    { title: 'Total Users', value: data.totalUsers, change: '', icon: <Users className="w-6 h-6" />, color: 'text-amber-600' },
  ];

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if(loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} stat={stat} index={index} />
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">Revenue Overview</h3>
          <div className="h-64 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl flex items-center justify-center">
            {/* <p className="text-amber-600">Chart would go here</p> */}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {data.bookingsWithTime.map((booking, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div>
                  <p className="font-medium text-amber-900 text-sm">{booking.showtime.movie.title}</p>
                  <p className="text-xs text-amber-600">{booking.user.name}</p>
                  <p className="text-xs text-amber-500">{booking.timeAgo}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-amber-900">Rp{booking.totalAmount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    booking.bookingStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                    booking.bookingStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    booking.bookingStatus === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.bookingStatus}
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