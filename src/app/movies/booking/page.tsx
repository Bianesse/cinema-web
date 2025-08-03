// BookingPage.tsx (server component by default)
import { Suspense } from "react";
import SeatSelectionSkeleton from "@/components/skeleton/SeatSelectionSkeleton"; 
import BookingClient from "@/components/booking/BookingPage"; // This uses useSearchParams()

export default function BookingPage() {
  return (
    <Suspense fallback={<SeatSelectionSkeleton />}>
      <BookingClient />
    </Suspense>
  );
}
