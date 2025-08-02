import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const data = await prisma.user.findMany({});
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const passwordHash = await bcrypt.hash(body.password, 10);
    const data = await prisma.user.create({ data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        passwordHash: passwordHash,
        role: body.role
    } });
    return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const id = body.id;
    const data = await prisma.user.delete({ where: { id: id } });
    return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const id = body.id;
    const data = await prisma.user.update({ where: { id: id}, data: body });
    return NextResponse.json(data);
}