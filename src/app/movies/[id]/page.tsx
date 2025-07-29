'use client'
import { MovieType } from "@/types";
import { use, useEffect, useState } from "react";
export default function Movie({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params) ;
    const [movie, setMovie] = useState<MovieType | null>(null);

    useEffect(() => {
        fetch(`/api/movie/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setMovie(data);
            });
    }, []);

    if (!movie) {
        return <div>Loading...</div>; // or your skeleton
      }
    
    return (
        <section id="movie">
            <h1 className="text-4xl font-bold">Film Detail</h1>
            
        </section>
    );
}