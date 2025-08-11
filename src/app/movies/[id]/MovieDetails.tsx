"use client";

import { CinemaType, MovieType, ShowDateType } from "@/types";
import { useEffect, useState } from "react";
import MovieDetailSkeleton from "@/components/skeleton/MovieDetailSkeleton";
import { ChevronDown, User } from "lucide-react";
import PlayTrailerModal from "@/components/modal/PlayTrailerModal";
import BookingDialog from "@/components/alert/BookingDialog";

type Props = {
    movie: MovieType;
    id: string;
    showdates: ShowDateType[];
};

export default function MovieDetail({ movie, id, showdates }: Props) {
    const [selected, setSelected] = useState<"Schedule" | "Detail">("Schedule");
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [cinemas, setCinemas] = useState<CinemaType[]>([]);
    const [loading, setLoading] = useState(false);

    const toggleDropdown = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!movie) {
        return <MovieDetailSkeleton />;
    }

    const formattedDate = new Date(movie.releaseDate).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "long", day: "numeric" }
    );

    useEffect(() => {
        if (!selectedDate) return;

        setLoading(true);
        fetch(`/api/movie/${id}?date=${selectedDate}`)
            .then((res) => res.json())
            .then((data) => {
                setCinemas(data.cinemas);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [selectedDate, id]);

    if (!movie) return <MovieDetailSkeleton />;

    return (
        <div>
            {/* Movie Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-lg overflow-hidden">
                <div className="w-full h-full">
                    <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="md:col-span-2 flex flex-col gap-4 p-7">
                    <h2 className="text-3xl font-bold text-amber-900">{movie.title}</h2>
                    <div className="flex flex-wrap gap-2">
                        {movie.genre.map((genre, i) => (
                            <span
                                key={i}
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

            {/* Toggle Buttons */}
            <div className="mt-6">
                <div className="flex space-x-4">
                    <button
                        className={`text-xl font-bold border-b-2 transition-all ${selected === "Schedule"
                            ? "border-black text-black"
                            : "border-transparent text-gray-400"
                            }`}
                        onClick={() => setSelected("Schedule")}
                    >
                        Schedule
                    </button>
                    <button
                        className={`text-xl font-bold border-b-2 transition-all ${selected === "Detail"
                            ? "border-black text-black"
                            : "border-transparent text-gray-400"
                            }`}
                        onClick={() => setSelected("Detail")}
                    >
                        Detail
                    </button>
                </div>
                <hr />

                {selected === "Schedule" && (
                    <div className="mt-4 space-y-2">
                        {/* Date Selector */}
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

                        {/* Cinema List */}
                        <div className="flex flex-col gap-4">
                            {cinemas.map((cinema, index) => (
                                <div key={index} className="relative">
                                    <div
                                        onClick={() => toggleDropdown(index)}
                                        className="p-5 w-full rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-xl font-bold text-amber-900">{cinema.name}</p>
                                                <p className="text-sm text-amber-700">{cinema.location}</p>
                                            </div>
                                            <ChevronDown
                                                className={`my-auto transition-transform ${openIndex === index ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    {openIndex === index && (
                                        <div className="mt-2 ml-2 p-4 rounded-lg border border-amber-100 bg-amber-50 shadow-inner">
                                            <p className="font-semibold text-amber-800 mb-2">
                                                Available Halls & Showtimes
                                            </p>
                                            {cinema.halls ? (
                                                cinema.halls.map((hall, i) => (
                                                    <div key={i} className="mb-2">
                                                        <div className="flex justify-between">
                                                            <p className="text-sm font-medium text-amber-900">{hall.hallName}</p>
                                                            <p className="text-sm font-medium text-amber-900">
                                                                Price: {hall.showtimes[0].price}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2 mt-1">
                                                            {hall.showtimes.map((time, j) => (
                                                                <BookingDialog
                                                                    key={j}
                                                                    index={j}
                                                                    time={time}
                                                                    halls={hall}
                                                                    cinema={cinema}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-amber-600 italic">
                                                    No halls or showtimes yet.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selected === "Detail" && (
                    <div className="mt-4">
                        <div className="p-5 w-full rounded-lg bg-white shadow-lg space-y-4">
                            <div>
                                <h2 className="text-lg font-semibold text-amber-900 mb-1">Synopsis</h2>
                                <p className="text-gray-700">{movie.synopsis}</p>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-amber-900 mb-1">Director</h2>
                                <p className="text-gray-700">{movie.director}</p>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-amber-900 mb-2">Cast</h2>
                                <div className="flex flex-wrap gap-4 p-3">
                                    {movie.cast.map((cast, index) => (
                                        <div key={index} className="flex flex-col items-center w-24">
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
        </div>
    );
}
