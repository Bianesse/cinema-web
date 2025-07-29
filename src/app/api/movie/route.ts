import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const status = req.nextUrl.searchParams.get('status') || 'NOW_SHOWING';
    const data = await prisma.movie.findMany({
        where: {
            status: status as 'NOW_SHOWING' | 'COMING_SOON',
        },
    });

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}