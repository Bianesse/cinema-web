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
}

export interface CinemaType {
    id: string;
    name: string;
    location: string;
    halls: number;
    facilities: string[];
}