export default function LocationSkeleton() {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-10 w-36 bg-gray-300 rounded" />
        </div>
  
        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4"
            >
              {/* Title and Buttons */}
              <div className="flex justify-between items-start mb-4">
                <div className="h-5 w-32 bg-gray-200 rounded" />
                <div className="flex space-x-2">
                  <div className="h-8 w-8 bg-gray-100 rounded-md" />
                  <div className="h-8 w-8 bg-gray-100 rounded-md" />
                </div>
              </div>
  
              {/* Address */}
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-gray-300 rounded-full" />
                <div className="h-4 w-48 bg-gray-200 rounded" />
              </div>
  
              {/* Halls & Seats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-5 w-12 bg-gray-300 rounded" />
                </div>
                <div className="space-y-1">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-5 w-16 bg-gray-300 rounded" />
                </div>
              </div>
  
              {/* Facilities */}
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, j) => (
                    <div
                      key={j}
                      className="px-3 py-1 bg-gray-100 rounded-full w-20 h-5"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  