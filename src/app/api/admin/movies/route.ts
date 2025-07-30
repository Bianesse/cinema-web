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

export async function POST(req: NextRequest) {
    const body = await req.json();
    const data = await prisma.movie.create({
        data: body,
    });

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
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