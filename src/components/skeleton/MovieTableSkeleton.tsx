export default function MovieTableSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="h-8 w-48 bg-amber-100 rounded"></div>
                <div className="h-10 w-36 bg-amber-200 rounded-lg"></div>
            </div>

            {/* Search & Filter Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full h-10 bg-amber-100 rounded-lg"></div>
                <div className="w-32 h-10 bg-amber-100 rounded-lg"></div>
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-amber-50">
                            <tr>
                                {["Movie", "Genre", "Duration", "Status", "Bookings", "Revenue", "Actions"].map((title, i) => (
                                    <th key={i} className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                                        {title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-100">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index} className="hover:bg-amber-50 transition-colors">
                                    {/* Movie */}
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="h-4 w-28 bg-amber-100 rounded"></div>
                                            <div className="h-3 w-16 bg-amber-100 rounded"></div>
                                        </div>
                                    </td>

                                    {/* Genre */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            <div className="h-5 w-10 bg-amber-100 rounded-full"></div>
                                            <div className="h-5 w-12 bg-amber-100 rounded-full"></div>
                                        </div>
                                    </td>

                                    {/* Duration */}
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-10 bg-amber-100 rounded"></div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <div className="h-5 w-20 bg-amber-100 rounded-full"></div>
                                    </td>

                                    {/* Bookings */}
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-12 bg-amber-100 rounded"></div>
                                    </td>

                                    {/* Revenue */}
                                    <td className="px-6 py-4">
                                        <div className="h-4 w-16 bg-amber-100 rounded"></div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <div className="h-6 w-6 bg-amber-100 rounded"></div>
                                            <div className="h-6 w-6 bg-amber-100 rounded"></div>
                                            <div className="h-6 w-6 bg-red-100 rounded"></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}