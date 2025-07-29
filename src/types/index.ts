export interface MovieType {
    id: number;
    title: string;
    genre: string[];
    rating: string;
    duration: number;
    posterUrl: string;
    synopsis: string
    releaseDate: string
}

export interface CinemaType {
    id: string;
    name: string;
    location: string;
    halls: number;
    facilities: string[];
}