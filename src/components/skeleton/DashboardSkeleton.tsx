export default function DashboardSkeleton() {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-3">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-8 w-32 bg-gray-300 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="flex justify-end">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
  
        {/* Charts and Recent Activity */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <div className="h-6 w-40 bg-gray-200 rounded" />
            <div className="h-64 w-full rounded-xl bg-gray-100" />
          </div>
  
          {/* Recent Bookings */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4">
            <div className="h-6 w-40 bg-gray-200 rounded" />
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="space-y-1">
                  <div className="h-4 w-28 bg-gray-200 rounded" />
                  <div className="h-3 w-20 bg-gray-100 rounded" />
                  <div className="h-3 w-24 bg-gray-100 rounded" />
                </div>
                <div className="text-right space-y-1">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-100 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  