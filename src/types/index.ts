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
    bookings: number;
    revenue: number;
}

export interface CinemaType {
    id: string;
    name: string;
    location: string;
    halls: number;
    facilities: string[];
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