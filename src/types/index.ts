export interface MovieType {
  id: number;
  title: string;
  genre: string[];
  rating: string;
  duration: number;
  posterUrl: string;
  synopsis: string;
  releaseDate: string;
  director: string;
  cast: string[];
  status: string;
  bookings?: number;
  revenue?: number;
  trailerUrl: string;

}
export type MovieFormPayload = Omit<MovieType, "id">;

export interface CinemaType {
  id: number;
  name: string;
  location: string;
  address?: string | null;
  totalHalls: number;
  facilities: string[];
  createdAt: Date;
  halls: HallType[];
  totalSeats?: number;
}


export interface ShowDateType {
  date: string;
  day: string;
  month: string;
  year: string;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  passwordHash: string;
}

export interface HallType {
  id: number;
  cinemaId: number;
  hallNumber: number;
  hallName?: string | null;
  totalSeats: number;
  hallType: HallTypeEnum;
  cinema: CinemaType;
  seats: SeatType[];
  showtimes: ShowtimeType[];
}

export interface SeatType {
  id: number;
  hallId: number;
  seatRow: string;
  seatNumber: number;
  seatType: SeatTypeEnum;
  hall: HallType;
  bookingSeats: BookingSeatType[];
}

export interface ShowtimeType {
  id: number;
  movieId: number;
  hallId: number;
  showDate: Date;
  showTime: Date;
  price: number;
  availableSeats: number;
  createdAt: Date;
  movie: MovieType;
  hall: HallType;
  bookings: BookingType[];
}

export interface BookingType {
  id: number;
  userId?: number | null;
  showtimeId: number;
  bookingCode: string;
  totalAmount: number;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string | null;
  bookingDate: Date;
  createdAt: Date;
  user?: UserType | null;
  showtime: ShowtimeType;
  bookingSeats: BookingSeatType[];
  payments: PaymentType[];
}

export interface BookingSeatType {
  id: number;
  bookingId: number;
  seatId: number;
  booking: BookingType;
  seat: SeatType;
}

export interface PaymentType {
  id: number;
  bookingId: number;
  paymentMethod: string;
  amount: number;
  transactionId?: string | null;
  status: PaymentStatus;
  paymentDate?: Date | null;
  createdAt: Date;
  booking: BookingType;
}


export interface DashboardData {
  totalRevenue: string;
  totalBookings: number;
  activeMovies: number;
  totalUsers: number;
  bookingsWithTime: BookingWithTime[];
}

export interface BookingWithTime {
  id: number;
  totalAmount: string;
  bookingDate: string; // ISO string, bisa juga Date jika kamu parsing
  bookingStatus: string; // atau string biasa jika tidak strict
  user: {
    name: string;
  };
  showtime: {
    movie: {
      title: string;
    };
  };
  timeAgo: string;
}

export type Role = "USER" | "ADMIN";
export type MovieRating = "G" | "PG" | "PG_13" | "R";
export type MovieStatus = "COMING_SOON" | "NOW_SHOWING" | "ENDED";
export type HallTypeEnum = "REGULAR" | "IMAX" | "FOUR_DX" | "DOLBY_ATMOS";
export type SeatTypeEnum = "REGULAR" | "PREMIUM" | "VIP";
export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";


