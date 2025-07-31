import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const movies = await prisma.movie.findMany();

    const payments = await prisma.payment.findMany({
        where: {
            status: "PAID",
        },
        include: {
            booking: {
                include: {
                    showtime: {
                        include: {
                            movie: true,
                        },
                    },
                },
            },
        },
    });

    const bookingSeats = await prisma.bookingSeat.findMany({
        include: {
            booking: {
                include: {
                    showtime: {
                        include: {
                            movie: true,
                        },
                    },
                },
            },
        },
    });

    const revenueMap: Record<number, number> = {};
    const bookedMap: Record<number, number> = {};

    for (const payment of payments) {
        const movie = payment.booking?.showtime?.movie;
        if (!movie) continue;

        revenueMap[movie.id] = (revenueMap[movie.id] || 0) + Number(payment.amount);
    }

    for (const seat of bookingSeats) {
        const movie = seat.booking?.showtime?.movie;
        if (!movie) continue;

        bookedMap[movie.id] = (bookedMap[movie.id] || 0) + 1;
    }

    const movieWithStats = movies.map((movie) => ({
        ...movie,
        revenue: revenueMap[movie.id] ?? 0,
        bookings: bookedMap[movie.id] ?? 0,
    }));

    return new Response(JSON.stringify(movieWithStats), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Incoming movie data:", body);

        const data = await prisma.movie.create({
            data: {
                title: body.title,
                genre: body.genre,
                rating: body.rating,
                duration: Number(body.duration),
                synopsis: body.synopsis,
                posterUrl: body.posterUrl,
                trailerUrl: body.trailerUrl,
                releaseDate: new Date(body.releaseDate),
                director: body.director,
                cast: {
                    set: body.cast,
                },
                status: body.status,
            },
        });

        return new Response(JSON.stringify(data), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Failed to create movie:", error);
        return new Response(JSON.stringify({ error: "Failed to create movie", details: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}


export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');
    const data = await prisma.movie.delete({
        where: {
            id: parseInt(id as string),
        },
    });

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const id = req.nextUrl.searchParams.get('id');
    const data = await prisma.movie.update({
        where: {
            id: parseInt(id as string),
        },
        data: body,
    });

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}