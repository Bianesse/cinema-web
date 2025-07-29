import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), {
      status: 400,
    });
  }

  const movie = await prisma.movie.findUnique({
    where: {
      id: id,
    },
  });

  const cinemas = await prisma.cinema.findMany({
    where: {
      halls: {
        some: {
          showtimes: {
            some: {
              movieId: id,
            },
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      location: true,
      halls: {
        select: {
          id: true,
          hallName: true,
          showtimes: {
            where: {
              movieId: id,
            },
            select: {
              id: true,
              showDate: true,
              showTime: true,
              price: true,
            },
          },
        },
      },
    },
  });



  if (!movie) {
    return new Response(JSON.stringify({ error: "Movie not found" }), {
      status: 404,
    });
  }

  return NextResponse.json({
    movie,
    cinemas,
  }
  );
}
