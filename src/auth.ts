import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import google from "next-auth/providers/google";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        },
      }
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const schema = z.object({
          email: z.email(),
          password: z.string().min(6),
        });

        const { email, password } = schema.parse(credentials);

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) throw new Error("No user found");
        if (!user.passwordHash) throw new Error("No password set for user");
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) throw new Error("Invalid password");

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),

  ],
  callbacks: {
    async session({ session, token, user }) {
      // Attach role to session
      if (token?.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      // On first login
      if (user && account?.provider === "google") {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email || "" },
        });

        // If not, create them
        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              name: user.name || "Unnamed",
              email: user.email || "",
              role: "USER", // or "ADMIN" based on logic
              passwordHash: "", // Since no password for OAuth
            },
          });
          token.role = newUser.role;
        } else {
          token.role = existingUser.role;
        }
      }

      // For credentials login, role already set
      if (user && account?.provider === "credentials") {
        token.role = user.role;
      }

      return token;
    }

  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
