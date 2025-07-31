export default function LocationCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-amber-200 rounded-full" />
                <div className="h-6 bg-amber-200 rounded w-1/2" />
            </div>

            <div className="h-4 bg-amber-100 rounded w-2/3 mb-3" />
            <div className="h-3 bg-amber-100 rounded w-1/3 mb-4" />

            <div className="flex flex-wrap gap-2 mb-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-6 w-20 bg-amber-100 rounded-full" />
                ))}
            </div>

            <div className="w-full h-10 bg-amber-100 rounded-lg" />
        </div>
    );
}
