import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const searchParams = req.nextUrl.searchParams;

    const cinemaId = searchParams.get('cinema');
    const hallId = searchParams.get('hall');
    const showtimeId = searchParams.get('showtime');

    const seats = await prisma.seat.findMany({
        where: {
            hallId: Number(hallId),
        },
    });

    const bookedSeats = await prisma.seat.findMany({
        where: {
          bookingSeats: {
            some: {
              booking: {
                showtimeId: Number(showtimeId),
                bookingStatus: {
                  not: "COMPLETED",
                },
              },
            },
          },
        },
        select: {
          id: true,
        },
      });

    const hall = await prisma.hall.findUnique({
        where: {
            id: Number(hallId),
        },
    })

    const cinema = await prisma.cinema.findUnique({
        where: {
            id: Number(cinemaId),
        },
    })

    const showtime = await prisma.showtime.findUnique({
        where: {
            id: Number(showtimeId),
        },
        include: {
            movie: true,
        }
    });


    return NextResponse.json({
        seats,
        bookedSeats,
        cinema,
        showtime,
        hall
    });
}