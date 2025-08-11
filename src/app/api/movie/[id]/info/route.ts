import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = parseInt(params.id);
  const searchParams = req.nextUrl.searchParams;

  const date = searchParams.get('date');
  let selectedDate = date;

  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), {
      status: 400,
    });
  }

  if (!selectedDate || isNaN(Date.parse(selectedDate))) {
    const firstDate = await prisma.showtime.findFirst({
      where: {
        movieId: id,
      },
      orderBy: {
        showDate: 'asc',
      },
      select: {
        showDate: true,
      },
    });

    selectedDate = firstDate?.showDate?.toISOString().split('T')[0] ?? new Date().toISOString().split('T')[0];
  }

  const movie = await prisma.movie.findUnique({
    where: {
      id: id,
    },
  });

  const showDatesQuery = await prisma.showtime.findMany({
    where: {
      movieId: id,
    },
    distinct: ['showDate'],
    select: {
      showDate: true,
    },
    orderBy: {
      showDate: 'asc',
    },
  });

  const showdates = showDatesQuery.map(({ showDate }) => {
    const date = new Date(showDate);
    const day = date.getDate(); // 1-31
    const month = date.toLocaleString("en-US", { month: "long" }); // e.g., "August"
    const year = date.getFullYear(); // 2025

    return { date, day, month, year };
  });

  if (!movie) {
    return new Response(JSON.stringify({ error: "Movie not found" }), {
      status: 404,
    });
  }

  return NextResponse.json({
    movie,
    showdates,
  }
  );
}
