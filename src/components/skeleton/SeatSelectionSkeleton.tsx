export default function SeatSelectionSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 animate-pulse">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="h-8 w-64 mx-auto bg-amber-200 rounded mb-2" />
                    <div className="h-4 w-40 mx-auto bg-amber-100 rounded" />
                </div>

                {/* Screen */}
                <div className="mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="bg-amber-100 rounded-t-full px-20 py-4 shadow-lg w-1/2 h-10" />
                    </div>
                    <div className="h-1 bg-amber-200 w-full" />
                </div>

                {/* Seat Map */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8 space-y-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center justify-center gap-2">
                            <div className="w-8 h-8 bg-amber-100 rounded" />
                            <div className="flex gap-2">
                                {[...Array(14)].map((_, j) => (
                                    <div
                                        key={j}
                                        className="w-10 h-10 bg-amber-100 rounded-lg"
                                    />
                                ))}
                            </div>
                            <div className="w-8 h-8 bg-amber-100 rounded" />
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-8">
                    <div className="h-6 w-40 bg-amber-200 rounded mb-4 mx-auto" />
                    <div className="flex justify-center gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-amber-200 rounded" />
                                <div className="h-4 w-20 bg-amber-100 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-8">
                    <div className="h-5 w-40 bg-amber-200 rounded mb-4" />
                    <div className="flex flex-wrap gap-2 mb-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-6 w-16 bg-amber-100 rounded-full" />
                        ))}
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-amber-200">
                        <div className="h-4 w-32 bg-amber-100 rounded" />
                        <div className="h-6 w-24 bg-amber-200 rounded" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="px-8 py-4 bg-amber-200 rounded-lg w-40 h-12" />
                    <div className="px-8 py-4 bg-amber-300 rounded-lg w-40 h-12" />
                </div>

                <div className="mt-8 text-center text-sm text-amber-600 h-4 w-64 mx-auto bg-amber-100 rounded" />
            </div>
        </div>
    );
}