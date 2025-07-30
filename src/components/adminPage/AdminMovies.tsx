'use client'
import React from 'react';
import { 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const MoviesPage = () => {
  const movies = [
    { 
      id: 1, 
      title: 'Epic Adventure', 
      genre: ['Action', 'Adventure'], 
      duration: 142, 
      rating: 'PG-13',
      status: 'Now Showing',
      bookings: 245,
      revenue: '$6,125'
    },
    { 
      id: 2, 
      title: 'Romantic Nights', 
      genre: ['Romance', 'Drama'], 
      duration: 118, 
      rating: 'PG',
      status: 'Now Showing',
      bookings: 189,
      revenue: '$5,670'
    },
    { 
      id: 3, 
      title: 'Space Odyssey', 
      genre: ['Sci-Fi', 'Thriller'], 
      duration: 156, 
      rating: 'PG-13',
      status: 'Coming Soon',
      bookings: 0,
      revenue: '$0'
    },
    { 
      id: 4, 
      title: 'Comedy Gold', 
      genre: ['Comedy'], 
      duration: 95, 
      rating: 'PG',
      status: 'Now Showing',
      bookings: 156,
      revenue: '$3,900'
    },
    { 
      id: 5, 
      title: 'Horror Night', 
      genre: ['Horror', 'Thriller'], 
      duration: 108, 
      rating: 'R',
      status: 'Ended',
      bookings: 89,
      revenue: '$2,225'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-amber-900">Movies Management</h2>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all">
          <Plus className="w-4 h-4" />
          <span>Add Movie</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 border border-amber-200 px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Movies Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Movie</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Genre</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Bookings</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {movies.map((movie) => (
                <tr key={movie.id} className="hover:bg-amber-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-amber-900">{movie.title}</p>
                      <p className="text-sm text-amber-600">{movie.rating}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {movie.genre.map((g, i) => (
                        <span key={i} className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                          {g}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-amber-900">{movie.duration} min</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      movie.status === 'Now Showing' ? 'bg-green-100 text-green-800' :
                      movie.status === 'Coming Soon' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {movie.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-amber-900">{movie.bookings}</td>
                  <td className="px-6 py-4 font-medium text-amber-900">{movie.revenue}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-amber-600 hover:bg-amber-100 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-amber-600 hover:bg-amber-100 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;