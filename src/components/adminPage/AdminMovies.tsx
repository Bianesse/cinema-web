'use client'

import { useEffect, useState } from 'react'
import { MovieFormPayload, MovieType } from '@/types'
import MovieTableSkeleton from '../skeleton/MovieTableSkeleton'
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import AddMovieModal from '@/components/modal/AddMovieModal'
import DeleteAlert from '../alert/DeleteAlert'
import EditMovieModal from '../modal/EditMovieModal'

const MoviesPage = () => {
  const [movies, setMovies] = useState<MovieType[]>([])
  const [newMovies, setNewMovies] = useState<MovieType[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/admin/movies')
      const data = await response.json()
      setMovies(data)
    } catch (err) {
      console.error('Failed to fetch movies:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSubmit = async (newMovie: MovieFormPayload) => {
    try {
      const res = await fetch("/api/admin/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (!res.ok) throw new Error('Failed to create movie')
      // Optionally: refresh users list or show success toast
      fetchMovies()
    } catch (err) {
      console.error('Failed to add movie:', err)
    } finally {
      /* console.log('Movie added:', newMovie) */
    }
    fetchMovies()
  }

  const handleEditSubmit = async (updatedMovie: MovieFormPayload) => {
    try {
      const res = await fetch("/api/admin/movies", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMovie),
      });

      if (!res.ok) throw new Error('Failed to update movie')
      // Optionally: refresh users list or show success toast
      fetchMovies()
    } catch (err) {
      console.error('Failed to update movie:', err)
    } finally {
      /* console.log('Movie updated:', updatedMovie) */
    }
    fetchMovies()
  }

  const handleDelete = async (id: number) => {
    try {
        const response = await fetch(`/api/admin/movies`, {
            method: 'DELETE',
            body: JSON.stringify({ id })
        })
        if (!response.ok) throw new Error('Failed to delete movie')
        fetchMovies()
    } catch (err) {
        console.error('Failed to delete movie:', err)
    }
}

  useEffect(() => {
    fetchMovies()
  }, [])

  if (loading) return <MovieTableSkeleton />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-amber-900">Movies Management</h2>
        <AddMovieModal onSubmit={handleAddSubmit} />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 border border-amber-200 px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Movies Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Movie</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Genre</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Bookings</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {movies.map((movie) => (
                <tr key={movie.id} className="hover:bg-amber-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-amber-900">{movie.title}</p>
                      <p className="text-sm text-amber-600">{movie.rating}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {movie.genre.map((g, i) => (
                        <span key={i} className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                          {g}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-amber-900">{movie.duration} min</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${movie.status === 'Now Showing' ? 'bg-green-100 text-green-800' :
                      movie.status === 'Coming Soon' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                      {movie.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-amber-900">{movie.bookings}</td>
                  <td className="px-6 py-4 font-medium text-amber-900">{movie.revenue}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-amber-600 hover:bg-amber-100 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <EditMovieModal movieData={movie} onSubmit={handleEditSubmit} />
                      <DeleteAlert handleDelete={() => { handleDelete(movie.id) }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MoviesPage
