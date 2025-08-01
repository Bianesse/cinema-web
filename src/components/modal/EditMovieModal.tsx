"use client"

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { MovieFormPayload, MovieType } from "@/types";
import { toast } from "sonner";
import { LoadingDialog } from "../alert/LoadingDialog";


export default function EditMovieModal({ movieData, fetchMovies, }: { movieData: MovieType; fetchMovies: () => void; }) {
    const [open, setOpen] = useState(false);
    const [movie, setMovie] = useState(movieData);
    const [processLoading, setProcessLoading] = useState(false);

    useEffect(() => {
        setMovie(movieData);
    }, [movieData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setMovie((prev) => ({
            ...prev,
            [name]: name === "duration" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...movie,
            genre: Array.isArray(movie.genre)
                ? movie.genre.map((genre: string) => genre.trim())
                : (movie.genre as string).split(',').map((genre: string) => genre.trim()),

            cast: Array.isArray(movie.cast)
                ? movie.cast.map((name: string) => name.trim())
                : (movie.cast as string).split(',').map((name: string) => name.trim()),
        };

        try {
            setProcessLoading(true)
            const res = await fetch("/api/admin/movies", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to update movie')
            toast.success("Movie updated successfully!")
            fetchMovies()
        } catch (err) {
            console.error('Failed to update movie:', err)
            toast.error("Failed to update movie.")
        } finally {
            console.log('Movie updated:', payload)
            setProcessLoading(false)
        }
        setOpen(false);
    };

    return (
        <>
        <LoadingDialog open={processLoading} />
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="p-1 text-amber-600 hover:bg-amber-100 rounded">
                    <Edit className="w-4 h-4" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-amber-900">Edit Movie</DialogTitle>
                    <DialogDescription>Update the form below to edit movie data.</DialogDescription>
                </DialogHeader>

                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        {/* SAME FIELDS */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={movie.title} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="genre">Genre</Label>
                            <Input id="genre" name="genre" value={Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rating">Rating</Label>
                            <select name="rating" id="rating" className="p-2 border border-amber-600 rounded w-full" value={movie.rating} onChange={handleChange}>
                                <option value="G">G</option>
                                <option value="PG">PG</option>
                                <option value="PG_13">PG-13</option>
                                <option value="R">R</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input type="number" id="duration" name="duration" value={movie.duration} onChange={handleChange} />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="synopsis">Synopsis</Label>
                            <textarea id="synopsis" name="synopsis" value={movie.synopsis} onChange={handleChange} className="w-full border rounded p-2 border-amber-400" rows={3}></textarea>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="posterUrl">Poster URL</Label>
                            <Input id="posterUrl" name="posterUrl" value={movie.posterUrl} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="trailerUrl">Trailer URL</Label>
                            <Input id="trailerUrl" name="trailerUrl" value={movie.trailerUrl} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="releaseDate">Release Date</Label>
                            <Input type="date" id="releaseDate" name="releaseDate" value={new Date(movie.releaseDate).toISOString().split('T')[0]} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <select name="status" id="status" className="w-full p-2 border border-amber-600 rounded" value={movie.status} onChange={handleChange}>
                                <option value="COMING_SOON">COMING SOON</option>
                                <option value="NOW_SHOWING">NOW SHOWING</option>
                                <option value="ENDED">ENDED</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="director">Director</Label>
                            <Input id="director" name="director" value={movie.director} onChange={handleChange} />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="cast">Cast</Label>
                            <Input id="cast" name="cast" value={Array.isArray(movie.cast) ? movie.cast.join(', ') : movie.cast} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                        <Button type="submit" className="bg-amber-700 hover:bg-amber-800 text-white">
                            Update
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
        </>
    );
}
