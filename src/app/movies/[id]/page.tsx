'use client'
import { CinemaType, MovieType } from "@/types";
import { use, useEffect, useState } from "react";
import MovieDetailSkeleton from "@/components/skeleton/MovieDetailSkeleton";
import { ChevronDown, CirclePlay } from "lucide-react";

export default function Movie({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [movie, setMovie] = useState<MovieType | null>(null);
    const [cinema, setCinema] = useState<CinemaType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState('Schedule');

    useEffect(() => {
        fetch(`/api/movie/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setMovie(data.movie);
                setCinema(data.cinemas);
                setLoading(false);
            });
    }, []);

    if (!movie) {
        return <MovieDetailSkeleton />; // or your skeleton
    }

    const formattedDate = new Date(movie.releaseDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      

    return (
        <section id="movie" className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-start">Film Detail</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-lg overflow-hidden">
                {/* Poster */}
                <div className="w-full h-full">
                    <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Info */}
                <div className="md:col-span-2 flex flex-col justify-start gap-4 p-7">
                    {/* Title */}
                    <h2 className="text-3xl font-bold text-amber-900">{movie.title}</h2>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2">
                        {movie.genre.map((genre: string, index: number) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>

                    {/* Info Group */}
                    <div className="space-y-2">
                        <p className="text-base text-gray-700">
                            <span className="font-semibold">Rating:</span> {movie.rating}
                        </p>
                        <p className="text-base text-gray-700">
                            <span className="font-semibold">Duration:</span> {movie.duration} minutes
                        </p>
                        <p className="text-base text-gray-700">
                            <span className="font-semibold">Release Date:</span> {formattedDate}
                        </p>
                    </div>

                    {/* Play Trailer */}
                    <button className="flex items-center gap-2 text-amber-700 font-semibold hover:underline w-fit">
                        <CirclePlay className="text-xl" />
                        Play Trailer
                    </button>
                </div>

            </div>


            <div className="mt-6">
                <div className="flex space-x-4">
                    <button className="text-xl font-bold border-b-2 border-black">Schedule</button>
                    <button className="">Detail</button>
                </div>
                <hr />

                <div className="mt-4">
                    <div className="flex flex-col gap-4">
                        {cinema.map((cinema: CinemaType, index: number) => (
                            <div key={index} className="p-5 w-full rounded-lg bg-white shadow-lg">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xl font-bold text-amber-900">{cinema.name}</p>
                                        <p className="text-sm text-amber-700">{cinema.location}</p>
                                    </div>

                                    <ChevronDown className="my-auto" />
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
}