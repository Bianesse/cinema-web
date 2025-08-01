"use client"

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog"
import { CirclePlay } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

function convertToEmbedUrl(url: string): string {
    try {
        const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        const videoId = videoIdMatch?.[1];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    } catch {
        return "";
    }
}

export default function PlayTrailerModal({ trailerUrl }: { trailerUrl: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 text-amber-700 font-semibold hover:underline w-fit">
                    <CirclePlay className="text-xl" />
                    Play Trailer
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl aspect-video p-0 overflow-hidden">
                <VisuallyHidden>
                    <DialogTitle>Movie Trailer</DialogTitle>
                </VisuallyHidden>

                <iframe
                    src={convertToEmbedUrl(trailerUrl)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />

            </DialogContent>
        </Dialog>
    )
}
