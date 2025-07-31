import { PrismaClient } from "@prisma/client";
import { handleClientScriptLoad } from "next/script";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const cinemas = await prisma.cinema.findMany({
        include: {
          halls: {
            select: {
              totalSeats: true,
            },
          },
        },
      });
      
      const cinemasWithTotalSeats = cinemas.map((cinema) => {
        const totalSeats = cinema.halls.reduce((sum, hall) => sum + hall.totalSeats, 0);
        return {
          id: cinema.id,
          name: cinema.name,
          location: cinema.location,
          address: cinema.address,
          totalHalls: cinema.totalHalls,
          facilities: cinema.facilities,
          totalSeats,
        };
      });

    return NextResponse.json(cinemasWithTotalSeats);
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
    } catch (error: unknown) {
        let message = "Unknown error";
    
        if (error instanceof Error) {
            message = error.message;
        }
    
        console.error("Failed to create movie:", error);
        return new Response(JSON.stringify({ error: "Failed to create movie", details: message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}


export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const id = body.id;
    const data = await prisma.movie.delete({
        where: {
            id: id,
        },
    });

    return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const id = body.id;
    const data = await prisma.movie.update({
        where: {
            id: id,
        },
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

    return NextResponse.json(data);
}