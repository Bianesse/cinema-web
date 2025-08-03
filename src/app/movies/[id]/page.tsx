'use client'
import { CinemaType, MovieType, ShowDateType } from "@/types";
import { use, useEffect, useState } from "react";
import MovieDetailSkeleton from "@/components/skeleton/MovieDetailSkeleton";
import { ChevronDown, CirclePlay, User } from "lucide-react";
import { toast } from "sonner";
import PlayTrailerModal from "@/components/modal/PlayTrailerModal";
import BookingDialog from "@/components/alert/BookingDialog";

export default function Movie({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [movie, setMovie] = useState<MovieType | null>(null);
    const [cinema, setCinema] = useState<CinemaType[]>([]);
    const [showdates, setShowdates] = useState<ShowDateType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<'Schedule' | 'Detail'>('Schedule');
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const toggleDropdown = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    useEffect(() => {
        const fetchMovieData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/movie/${id}?date=${selectedDate}`);
                if (!res.ok) throw new Error("Failed to fetch data");

                const data = await res.json();
                setMovie(data.movie);
                setCinema(data.cinemas);
                setShowdates(data.showdates);
            } catch (error) {
                console.error("Error fetching movie data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieData();
    }, [selectedDate]);

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
                    <h2 className="text-3xl font-bold text-amber-900">{movie.title}</h2>

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
                    <PlayTrailerModal trailerUrl={movie.trailerUrl} />
                </div>

            </div>


            <div className="mt-6">
                {/* Toggle Buttons */}
                <div className="flex space-x-4">
                    <button
                        className={`text-xl font-bold border-b-2 transition-all ${selected === 'Schedule' ? 'border-black text-black' : 'border-transparent text-gray-400'
                            }`}
                        onClick={() => setSelected('Schedule')}
                    >
                        Schedule
                    </button>
                    <button
                        className={`text-xl font-bold border-b-2 transition-all ${selected === 'Detail' ? 'border-black text-black' : 'border-transparent text-gray-400'
                            }`}
                        onClick={() => setSelected('Detail')}
                    >
                        Detail
                    </button>
                </div>
                <hr />

                {/* Schedule Section */}
                {selected === 'Schedule' && (
                    <div className="mt-4 space-y-2">
                        <div className="flex gap-4 overflow-x-auto py-2 px-1 snap-x snap-mandatory scroll-smooth">
                            {showdates.map((showdate, index) => (
                                <button
                                    key={index}
                                    className={`w-16 h-16 flex-shrink-0 snap-start rounded-lg border flex flex-col items-center justify-center shadow-sm transition-all ${selectedDate === showdate.date
                                        ? "bg-amber-700 text-white border-amber-700"
                                        : "bg-white text-amber-900 border-amber-300 hover:bg-amber-100"
                                        }`}
                                    onClick={() => setSelectedDate(showdate.date)}
                                >
                                    <span className="text-lg font-bold">{showdate.day}</span>
                                    <span className="text-xs">{showdate.month}</span>
                                </button>
                            ))}
                        </div>


                        <div className="flex flex-col gap-4">
                            {cinema.map((cinema, index) => (
                                <div key={index} className="relative">
                                    {/* Card */}
                                    <div
                                        onClick={() => toggleDropdown(index)}
                                        className="p-5 w-full rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-xl font-bold text-amber-900">{cinema.name}</p>
                                                <p className="text-sm text-amber-700">{cinema.location}</p>
                                            </div>
                                            <ChevronDown className={`my-auto transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
                                        </div>
                                    </div>

                                    {/* Dropdown (relative) */}
                                    {openIndex === index && (
                                        <div className="mt-2 ml-2 p-4 rounded-lg border border-amber-100 bg-amber-50 shadow-inner">
                                            <p className="font-semibold text-amber-800 mb-2">Available Halls & Showtimes</p>
                                            {cinema.halls ? (
                                                cinema.halls.map((hall, i) => (
                                                    <div key={i} className="mb-2">
                                                        <div className="flex justify-between">
                                                            <p className="text-sm font-medium text-amber-900">{hall.hallName}</p>
                                                            <p className="text-sm font-medium text-amber-900">Price: {hall.showtimes[0].price}</p>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2 mt-1">
                                                            {hall.showtimes.map((time, j) => (
                                                                <BookingDialog key={j} index={j} time={time} halls={hall} cinema={cinema} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-amber-600 italic">No halls or showtimes yet.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Detail Section */}
                {selected === 'Detail' && (
                    <div className="mt-4">
                        <div className="p-5 w-full rounded-lg bg-white shadow-lg space-y-4">

                            {/* Synopsis */}
                            <div>
                                <h2 className="text-lg font-semibold text-amber-900 mb-1">Synopsis</h2>
                                <p className="text-gray-700">{movie.synopsis}</p>
                            </div>

                            {/* Director */}
                            <div>
                                <h2 className="text-lg font-semibold text-amber-900 mb-1">Director</h2>
                                <p className="text-gray-700">{movie.director}</p>
                            </div>

                            {/* Cast */}
                            <div>
                                <h2 className="text-lg font-semibold text-amber-900 mb-2">Cast</h2>
                                <div className="flex flex-wrap gap-4 p-3">
                                    {movie.cast.map((cast: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center w-24"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-amber-200 flex items-center justify-center mb-2">
                                                <User className="w-8 h-8 text-amber-800" />
                                            </div>
                                            <p className="text-sm text-center text-amber-900 font-medium">{cast}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </section>
    );
}