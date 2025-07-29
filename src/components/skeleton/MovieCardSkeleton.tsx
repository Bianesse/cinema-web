export default function MovieCardSkeleton() {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
        <div className="relative">
          <div className="w-full h-80 bg-gray-200" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 space-x-2 flex">
            <div className="w-12 h-6 bg-gray-300 rounded" />
            <div className="w-20 h-6 bg-gray-300 rounded" />
          </div>
        </div>
        <div className="p-6">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4" />
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
            <div className="h-5 w-14 bg-gray-200 rounded-full" />
            <div className="h-5 w-20 bg-gray-200 rounded-full" />
          </div>
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
          <div className="h-10 bg-gray-300 rounded-lg" />
        </div>
      </div>
    );
  }
  