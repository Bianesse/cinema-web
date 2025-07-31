import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { MovieFormPayload, MovieType } from "@/types";
import { toast } from "sonner";

export default function AddMovieModal({ fetchMovies }: { fetchMovies: () => void }) {
    const [open, setOpen] = useState(false);
    const [movie, setMovie] = useState({
        title: '',
        genre: '',
        rating: 'G',
        duration: 0,
        synopsis: '',
        posterUrl: '',
        trailerUrl: '',
        releaseDate: '',
        director: '',
        cast: '',
        status: 'COMING_SOON',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setMovie(prev => ({
            ...prev,
            [name]: name === "duration" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...movie,
            genre: movie.genre.split(',').map(genre => genre.trim()),
            cast: movie.cast.split(',').map(name => name.trim())
        };

        try {
            const res = await fetch("/api/admin/movies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to create movie')
            // Optionally: refresh users list or show success toast
            toast.success("Movie created successfully!")
            fetchMovies()
        } catch (err) {
            console.error('Failed to add movie:', err)
            toast.error("Failed to create movie.")
        } finally {
            console.log('Movie added:', payload)
        }
        setOpen(false);
        setMovie({ title: '', genre: '', rating: 'G', duration: 0, synopsis: '', posterUrl: '', trailerUrl: '', releaseDate: '', director: '', cast: '', status: 'COMING_SOON' });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all">
                    <Plus className="w-4 h-4" />
                    <span>Add Movie</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-amber-900">Add New Movie</DialogTitle>
                    <DialogDescription>Fill in the form below to add a new movie.</DialogDescription>
                </DialogHeader>

                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-amber-800">Title</Label>
                            <Input id="title" name="title" value={movie.title} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="genre" className="text-amber-800">Genre (Comma-separated)</Label>
                            <Input id="genre" name="genre" value={movie.genre} onChange={handleChange} placeholder="e.g. Action, Comedy, Drama" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rating" className="text-amber-800">Rating</Label>
                            <select name="rating" id="rating" className='p-2 border border-amber-600 rounded w-full' value={movie.rating} onChange={handleChange} required>
                                <option value="G">G</option>
                                <option value="PG">PG</option>
                                <option value="PG_13">PG-13</option>
                                <option value="R">R</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration" className="text-amber-800">Duration (minutes)</Label>
                            <Input type="number" id="duration" name="duration" value={movie.duration} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="synopsis" className="text-amber-800">Synopsis</Label>
                            <textarea id="synopsis" name="synopsis" value={movie.synopsis} onChange={handleChange} className="w-full border rounded p-2 border-amber-400" rows={3} required></textarea>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="posterUrl" className="text-amber-800">Poster URL</Label>
                            <Input id="posterUrl" name="posterUrl" value={movie.posterUrl} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="trailerUrl" className="text-amber-800">Trailer URL</Label>
                            <Input id="trailerUrl" name="trailerUrl" value={movie.trailerUrl} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="releaseDate" className="text-amber-800">Release Date</Label>
                            <Input type="date" id="releaseDate" name="releaseDate" value={movie.releaseDate} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-amber-800">Status</Label>
                            <select name="status" id="status" value={movie.status} onChange={handleChange} className="w-full p-2 border border-amber-600 rounded" required>
                                <option value="COMING_SOON">COMING SOON</option>
                                <option value="NOW_SHOWING">NOW SHOWING</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="director" className="text-amber-800">Director</Label>
                            <Input id="director" name="director" value={movie.director} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="cast" className="text-amber-800">Cast (comma separated)</Label>
                            <Input id="cast" name="cast" value={movie.cast} onChange={handleChange} placeholder="e.g. John Doe, Jane Doe" required />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                        <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
