import MovieDetail from "./MovieDetails"; // This will be a client component
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/movie/${id}/info`,
        { cache: "no-store" } // ensures fresh data
    );

    if (!res.ok) {
        return notFound(); // handle 404
    }

    const data = await res.json();

    return (
        <section id="movie" className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-start">Film Detail</h1>
            <MovieDetail
                id={id}
                movie={data.movie}
                showdates={data.showdates}
            />
        </section>
    );
}
