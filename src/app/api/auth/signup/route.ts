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
        const parsed = RegisterSchema.safeParse(body);

        if (!parsed.success) {
            // parsed.error is of type ZodError
            const zodErrors = parsed.error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message,
            }));

            return new Response(JSON.stringify({ errors: zodErrors }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const { name, email, phone, password } = parsed.data;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new Response(
                JSON.stringify({ error: "Email already registered" }),
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                passwordHash: hashedPassword,
                role: "USER",
            },
        });

        return new Response(
            JSON.stringify({
                message: "User registered successfully",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (err) {
        console.error("Registration error:", err);

        return new Response(
            JSON.stringify({ error: "Something went wrong" }),
            { status: 500 }
        );
    }
}

