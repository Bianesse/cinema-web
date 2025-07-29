'use client'
import { useState, useEffect } from "react";
import MovieCard from "@/components/movie/MovieCard";
import MovieCardSkeleton from "@/components/skeleton/MovieCardSkeleton";
import { MovieType } from "@/types";

export default function Movies() {
    const [loading, setLoading] = useState(true);
    const [movieStatus, setMovieStatus] = useState<"NOW_SHOWING" | "COMING_SOON">("NOW_SHOWING");
    const [featuredMovies, setFeaturedMovies] = useState<MovieType[]>([]);

    useEffect(() => {
        fetch(`/api/movie?status=${movieStatus}`)
            .then((res) => res.json())
            .then((data) => {
                setFeaturedMovies(data);
                setLoading(false);
            });
    }, [movieStatus]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
            <section id="movies" className="py-20 bg-amber-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold">Movies</h1>

                    <div className="flex flex-row items-center space-x-4 my-5">
                        <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-all"
                            onClick={() => setMovieStatus("NOW_SHOWING")}>
                            Now Showing
                        </button>
                        <button className="bg-amber-100 text-amber-600 px-4 py-2 rounded-lg hover:bg-amber-200 transition-all"
                            onClick={() => setMovieStatus("COMING_SOON")}>
                            Coming Soon
                        </button>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {loading
                            ?
                            Array.from({ length: 3 }).map((_, index) => (
                                <MovieCardSkeleton key={index} />
                            ))
                            :
                            featuredMovies.map((movie, index) => (
                                <MovieCard key={index} index={index} movie={movie} />
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
}