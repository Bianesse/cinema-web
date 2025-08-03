import { MovieType } from "@/types";
import { Clock } from "lucide-react";

interface MovieCardProps {
    index: number
    movie: MovieType
}

export default function MovieCard({ index, movie, }: MovieCardProps) {
    return (
        <div key={index} className="bg-white flex flex-col rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
            <div className="relative">
                <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-amber-500 rounded text-sm font-medium">{movie.rating}</span>
                        <span className="flex items-center space-x-1 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{movie.duration} min</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between">
                <h3 className="text-2xl font-bold text-amber-900 mb-2">{movie.title}</h3>
                <div className="flex flex-wrap gap-1 mb-3">
                    {movie.genre.map((genre: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                            {genre}
                        </span>
                    ))}
                </div>

                {/* <p className="text-amber-700 line-clamp-3">{movie.synopsis}</p> */}
                <button className="w-full py-2 border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white rounded-lg transition-all mt-4">
                    Book Tickets
                </button>
            </div>
        </div>
    );
}