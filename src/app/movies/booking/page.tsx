"use client";

import { CinemaType, HallType, SeatType, ShowtimeType } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { User, Monitor, Armchair } from 'lucide-react';
import { toast } from "sonner";
import SeatSelectionSkeleton from "@/components/skeleton/SeatSelectionSkeleton";

interface BookedSeat {
    id: number;
}
const SeatSelection = () => {
    const [seatData, setSeatData] = useState<SeatType[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [bookedSeats, setBookedSeats] = useState<BookedSeat[]>([]);
    const [cinemaData, setCinemaData] = useState<CinemaType | null>(null);
    const [hallData, setHallData] = useState<HallType | null>(null);
    const [showtimeData, setShowtimeData] = useState<ShowtimeType | null>(null);

    const searchParams = useSearchParams();

    const showtime = searchParams.get("showtime");
    const hall = searchParams.get("hall");
    const cinema = searchParams.get("cinema");

    useEffect(() => {
        const fetchSeatData = async () => {
            try {
                const response = await fetch(`/api/booking?showtime=${showtime}&hall=${hall}&cinema=${cinema}`);
                const data = await response.json();
                setSeatData(data.seats);
                setBookedSeats(data.bookedSeats);
                setCinemaData(data.cinema);
                setHallData(data.hall);
                setShowtimeData(data.showtime);
            } catch (error) {
                console.error('Error fetching seat data:', error);
            }
        }

        if (showtime && hall && cinema) {
            fetchSeatData();
        }
    }, []);

    // Group seats by row
    const groupSeatsByRow = (seats: SeatType[]) => {
        return seats.reduce((acc: Record<string, SeatType[]>, seat) => {
            if (!acc[seat.seatRow]) {
                acc[seat.seatRow] = [];
            }
            acc[seat.seatRow].push(seat);
            return acc;
        }, {});
    };

    const handleSeatClick = (seatId: number) => {
        if (bookedSeats.some(booked => booked.id === seatId)) return; // Can't select booked seats

        setSelectedSeats(prev => {
            if (prev.includes(seatId)) {
                return prev.filter(id => id !== seatId);
            } else {
                return [...prev, seatId];
            }
        });
    };

    const getSeatColor = (seat: SeatType) => {
        if (bookedSeats.some(booked => booked.id === seat.id)) {
            return 'bg-red-500 text-white cursor-not-allowed';
        }
        if (selectedSeats.includes(seat.id)) {
            return 'bg-amber-500 text-white shadow-lg transform scale-105';
        }

        switch (seat.seatType) {
            default:
                return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
        }
    };

    const getSeatPrice = (seatType: string) => {
        return 75000;
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(price);
    };

    const calculateTotal = () => {
        return selectedSeats.reduce((total, seatId) => {
            const seat = seatData.find(s => s.id === seatId);
            return total + getSeatPrice(seat?.seatType || '');
        }, 0);
    };

    const groupedSeats = groupSeatsByRow(seatData);
    const rows = Object.keys(groupedSeats).sort();

    if (!cinemaData || !hallData || !showtimeData) return <SeatSelectionSkeleton />

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-amber-900 mb-2">Select Your Seats</h1>
                    <p className="text-amber-700">Hall 39 - Choose your preferred seats</p>
                </div>

                {/* Screen */}
                <div className="mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-r from-amber-200 to-orange-200 rounded-t-full px-20 py-4 shadow-lg">
                            <div className="flex items-center justify-center text-amber-900">
                                <Monitor className="w-6 h-6 mr-2" />
                                <span className="font-semibold">SCREEN</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
                </div>

                {/* Seat Map */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
                    <div className="space-y-4">
                        {rows.map(row => (
                            <div key={row} className="flex items-center justify-center gap-2">
                                {/* Row Label */}
                                <div className="w-8 h-8 flex items-center justify-center font-bold text-amber-900 mr-4">
                                    {row}
                                </div>

                                {/* Seats */}
                                <div className="flex gap-2">
                                    {groupedSeats[row]
                                        .sort((a, b) => a.seatNumber - b.seatNumber)
                                        .map((seat, index) => (
                                            <React.Fragment key={seat.id}>
                                                {/* Add aisle space after seat 7 */}
                                                {index === 7 && <div className="w-4"></div>}

                                                <button
                                                    onClick={() => handleSeatClick(seat.id)}
                                                    disabled={bookedSeats.some(booked => booked.id === seat.id)}
                                                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-semibold transition-all duration-200 ease-in-out ${getSeatColor(seat)}`}
                                                    title={`${row}${seat.seatNumber} - ${seat.seatType} - ${formatPrice(getSeatPrice(seat.seatType))}`}
                                                >
                                                    <Armchair className="w-4 h-4" />
                                                </button>
                                            </React.Fragment>
                                        ))}
                                </div>

                                {/* Row Label (Right) */}
                                <div className="w-8 h-8 flex items-center justify-center font-bold text-amber-900 ml-4">
                                    {row}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-8">
                    <h3 className="text-lg font-semibold text-amber-900 mb-4 text-center">Seat Selection</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Armchair className="w-4 h-4 text-gray-800" />
                            </div>
                            <span className="text-sm text-gray-700">Regular - {formatPrice(showtimeData?.price ?? 0)} </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                                <Armchair className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm text-gray-700">Selected</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                                <Armchair className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm text-gray-700">Booked</span>
                        </div>
                    </div>
                </div>

                {/* Selection Summary */}
                {selectedSeats.length > 0 && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-8">
                        <h3 className="text-lg font-semibold text-amber-900 mb-4">Selected Seats</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {selectedSeats.map(seatId => {
                                const seat = seatData.find(s => s.id === seatId);
                                return (
                                    <div key={seatId} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {seat?.seatRow}{seat?.seatNumber}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-amber-200">
                            <div>
                                <p className="text-sm text-gray-600">{selectedSeats.length} seat(s) selected</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-amber-900">{formatPrice(calculateTotal())}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => setSelectedSeats([])}
                        disabled={selectedSeats.length === 0}
                        className="px-8 py-4 border-2 border-amber-500 text-amber-500 hover:bg-amber-50 rounded-lg text-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Clear Selection
                    </button>
                    <button
                        disabled={selectedSeats.length === 0}
                        className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        onClick={() => toast.warning("Fitur ini masih dalam pengembangan")}
                    >
                        Continue to Payment
                    </button>
                </div>

                {/* Mobile responsiveness note */}
                <div className="mt-8 text-center text-sm text-amber-600">
                    <p>💡 Tip: Tap and hold on mobile to see seat details</p>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
