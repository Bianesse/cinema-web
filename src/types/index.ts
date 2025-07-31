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
    id: string;
    name: string;
    location: string;
    halls: number;
    totalHalls: number;
    facilities: string[];
    address: string;
    totalSeats?: number;
}

export interface UserType{
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    password: string;
    passwordHash: string;
}