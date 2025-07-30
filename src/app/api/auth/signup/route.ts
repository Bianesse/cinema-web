import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const prisma = new PrismaClient();

// Zod schema for validation
const RegisterSchema = z.object({
    name: z.string().min(3, "Username too short"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Phone number too short"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsed = RegisterSchema.parse(body); // Will throw if invalid

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: parsed.email },
        });

        if (existingUser) {
            return new Response(
                JSON.stringify({ error: "Email already registered" }),
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(parsed.password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                name: parsed.name,
                email: parsed.email,
                phone: parsed.phone,
                passwordHash: hashedPassword,
                role: "USER", // Optional: default role
            },
        });

        return new Response(JSON.stringify({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });

    } catch (err) {

        console.error("Registration error:", err);
        return new Response(
            JSON.stringify({ error: "Something went wrong" }),
            { status: 500 }
        );
    }
}
