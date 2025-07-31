import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    //total revenue
    const totalRevenue = await prisma.payment.aggregate({
        _sum: {
            amount: true,
        },
    });

    //total bookings
    const totalBookings = await prisma.booking.count();

    //active movies
    const activeMovies = await prisma.movie.count({
        where: {
            status: "NOW_SHOWING",
        },
    });

    //total users
    const totalUsers = await prisma.user.count();

    //recent booking
    const recentBookings = await prisma.booking.findMany({
        take: 4,
        orderBy: {
            bookingDate: "desc",
        },
        select: {
            id: true,
            totalAmount: true,
            bookingDate: true,
            bookingStatus: true,
            user: {
                select: {
                    name: true,
                },
            },
            showtime: {
                select: {
                    movie: {
                        select: {
                            title: true,
                        },
                    },
                },
            },
        },
    });

    const howLongAgo = (date: Date) => {
        const now = new Date();
        const diff = Math.abs(now.getTime() - date.getTime());
        const minutes = Math.floor(diff / 1000 / 60);
        if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (minutes < 1440) {
            const hours = Math.floor(minutes / 60);
            return `${hours} hours ago`;
        } else {
            const days = Math.floor(minutes / 1440);
            return `${days} days ago`;
        }
    };

    const bookingsWithTime = recentBookings.map((booking) => ({
        ...booking,
        timeAgo: howLongAgo(new Date(booking.bookingDate)),
    }));


    const data = {
        totalRevenue: totalRevenue._sum.amount || 0,
        totalBookings,
        activeMovies,
        totalUsers,
        bookingsWithTime,
    };

    return NextResponse.json(data);
}
