import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const featuredMovie = await prisma.movie.findMany({
        where: {
            status: 'NOW_SHOWING'
        },

    });

    const location = await prisma.cinema.findMany({});

    return NextResponse.json({
        featuredMovie,
        location,
    });
}