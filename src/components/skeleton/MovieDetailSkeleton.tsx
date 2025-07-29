export default function MovieDetailSkeleton() {
    return (
        <section id="movie" className="max-w-3xl mx-auto p-4 animate-pulse">
            <h1 className="text-3xl font-bold mb-6 text-start bg-gray-200 w-40 h-8 rounded"></h1>

            <div className="grid md:grid-cols-3 gap-4 border rounded-lg overflow-hidden">
                {/* Poster Skeleton */}
                <div className="col-span-1 bg-gray-200 h-[300px] w-full"></div>

                {/* Info Skeleton */}
                <div className="col-span-2 flex flex-col justify-start gap-4 p-4">
                    <div className="bg-gray-200 h-6 w-3/4 rounded"></div>
                    <div className="flex flex-wrap gap-2">
                        {Array(3)
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className="px-4 py-2 bg-gray-200 rounded-full w-20 h-6"
                                ></div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="mt-6">
                <div className="flex space-x-4 mb-2">
                    <div className="w-24 h-6 bg-gray-200 rounded"></div>
                    <div className="w-20 h-6 bg-gray-200 rounded"></div>
                </div>
                <hr />

                {/* Cinema Cards Skeleton */}
                <div className="mt-4">
                    <div className="flex flex-row gap-4">
                        {Array(3)
                            .fill(0)
                            .map((_, i) => (
                                <div key={i} className="border p-4 w-full rounded-lg space-y-2">
                                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>

    )

}