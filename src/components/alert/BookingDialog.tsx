import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CinemaType, HallType, ShowDateType, ShowtimeType } from "@/types";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Props {
    index: number;
    time: ShowDateType;
    halls: CinemaType;
}

export default function BookingDialog({ index, time, halls, cinema }: { index: number, time: ShowtimeType, halls: HallType, cinema: CinemaType }) {
    const { data: session } = useSession();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!session) {
            e.preventDefault(); // Stop navigation
            toast.error("Please login first to proceed");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span
                    key={index}
                    className="w-32 h-10 text-xs bg-white border border-amber-200 text-amber-700 rounded flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all cursor-pointer"
                >
                    {new Date(time.showTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl p-6 border border-amber-200 shadow-xl bg-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-amber-900">Confirm Showtime</DialogTitle>
                    <DialogDescription className="text-sm text-amber-600">
                        Please review your selection
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-1">
                    <h3 className="text-lg font-bold text-amber-900">{cinema.name}</h3>
                    <p className="text-sm text-amber-700">{halls.hallName}</p>
                    <p className="text-sm text-amber-600">
                        {new Date(time.showDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                    <p className="text-sm text-amber-600">
                        Time:{" "}
                        <span className="font-semibold text-amber-900">
                            {new Date(time.showTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                            })}
                        </span>
                    </p>
                    <p className="text-sm text-amber-600">
                        Price:{" "}
                        <span className="font-semibold text-amber-900">Rp {time.price.toLocaleString()}</span>
                    </p>
                </div>

                <div className="mt-2">
                    <Link href={`booking?showtime=${time.id}&hall=${halls.id}&cinema=${cinema.id}`}>
                        <button
                            className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-all"
                            onClick={handleClick}
                        >
                            Proceed to seat selection
                        </button>
                    </Link>
                </div>
            </DialogContent>
        </Dialog>

    )
}