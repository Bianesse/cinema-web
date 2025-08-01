import { ColumnDef } from "@tanstack/react-table";
import { MovieType } from "@/types";
import { Eye } from "lucide-react";
import React from "react";
import { FC } from 'react';

export function getMovieColumns({
  EditMovieModal,
  DeleteAlert,
  handleDelete,
  fetchMovies,
}: {
  EditMovieModal: FC<{movieData: MovieType; fetchMovies: () => void}>;
  DeleteAlert: FC<{handleDelete: () => void}>;
  handleDelete: (id: number) => void;
  fetchMovies: () => void;
}): ColumnDef<MovieType>[] {
  return [
    {
      header: "Movie",
      accessorKey: "title",
      cell: ({ row }) => {
        const movie = row.original;
        return (
          <div>
            <p className="font-medium text-amber-900">{movie.title}</p>
            <p className="text-sm text-amber-600">{movie.rating}</p>
          </div>
        );
      },
    },
    {
      header: "Genre",
      accessorKey: "genre",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.genre.map((g: string, i: number) => (
            <span
              key={i}
              className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs"
            >
              {g}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "Duration",
      accessorKey: "duration",
      cell: ({ getValue }) => (
        <span className="text-amber-900">{getValue<number>()} min</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue<string>();
        const statusStyle =
          status === "Now Showing"
            ? "bg-green-100 text-green-800"
            : status === "Coming Soon"
            ? "bg-blue-100 text-blue-800"
            : "bg-gray-100 text-gray-800";

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs ${statusStyle}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Bookings",
      accessorKey: "bookings",
      cell: ({ getValue }) => (
        <span className="text-amber-900">{getValue<number>()}</span>
      ),
    },
    {
      header: "Revenue",
      accessorKey: "revenue",
      cell: ({ getValue }) => (
        <span className="font-medium text-amber-900">{getValue<number>()}</span>
      ),
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const movie = row.original;
        return (
          <div className="flex items-center space-x-2">
            <button className="p-1 text-amber-600 hover:bg-amber-100 rounded">
              <Eye className="w-4 h-4" />
            </button>
            <EditMovieModal movieData={movie} fetchMovies={fetchMovies} />
            <DeleteAlert handleDelete={() => handleDelete(movie.id)} />
          </div>
        );
      },
    },
  ];
}
