'use client'
import { useState } from 'react';
import { 
  Plus,
  MapPin,
  Edit,
  MoreVertical
} from 'lucide-react';

const LocationsPage = () => {
  const locations = [
    {
      id: 1,
      name: 'CinemaMax Downtown',
      address: '123 Main St, City Center',
      halls: 8,
      totalSeats: 1200,
      facilities: ['IMAX', '4DX', 'Dolby Atmos'],
      status: 'Active',
      occupancy: '85%'
    },
    {
      id: 2,
      name: 'CinemaMax Mall',
      address: '456 Shopping Blvd, Mall District',
      halls: 6,
      totalSeats: 900,
      facilities: ['IMAX', 'Premium Seats'],
      status: 'Active',
      occupancy: '72%'
    },
    {
      id: 3,
      name: 'CinemaMax Park',
      address: '789 Park Ave, Residential Area',
      halls: 4,
      totalSeats: 600,
      facilities: ['Dolby Atmos', 'VIP Lounge'],
      status: 'Maintenance',
      occupancy: '0%'
    },
    {
      id: 4,
      name: 'CinemaMax Plaza',
      address: '321 Commerce St, Business District',
      halls: 5,
      totalSeats: 750,
      facilities: ['IMAX', 'Dolby Atmos', 'VIP Lounge'],
      status: 'Active',
      occupancy: '68%'
    },
    {
      id: 5,
      name: 'CinemaMax Westside',
      address: '654 West Ave, Westside',
      halls: 3,
      totalSeats: 450,
      facilities: ['Premium Seats'],
      status: 'Active',
      occupancy: '91%'
    },
    {
      id: 6,
      name: 'CinemaMax North',
      address: '987 North Blvd, North District',
      halls: 7,
      totalSeats: 1050,
      facilities: ['IMAX', '4DX', 'Dolby Atmos', 'VIP Lounge'],
      status: 'Coming Soon',
      occupancy: '0%'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-amber-900">Cinema Locations</h2>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all">
          <Plus className="w-4 h-4" />
          <span>Add Location</span>
        </button>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {locations.map((location) => (
          <div key={location.id} className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-amber-900">{location.name}</h3>
              <div className="flex items-center space-x-1">
                <button className="p-1 text-amber-600 hover:bg-amber-100 rounded">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-amber-600 hover:bg-amber-100 rounded">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-amber-700">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{location.address}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-amber-600">Halls</p>
                  <p className="font-semibold text-amber-900">{location.halls}</p>
                </div>
                <div>
                  <p className="text-amber-600">Total Seats</p>
                  <p className="font-semibold text-amber-900">{location.totalSeats}</p>
                </div>
              </div>

              <div>
                <p className="text-amber-600 text-sm mb-2">Facilities</p>
                <div className="flex flex-wrap gap-1">
                  {location.facilities.map((facility, i) => (
                    <span key={i} className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-amber-100">
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    location.status === 'Active' ? 'bg-green-100 text-green-800' :
                    location.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    location.status === 'Coming Soon' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {location.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-amber-600 text-xs">Occupancy</p>
                  <p className="font-semibold text-amber-900">{location.occupancy}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;