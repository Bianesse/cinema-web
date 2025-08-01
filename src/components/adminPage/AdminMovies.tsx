'use client'

import { useEffect, useState } from 'react'
import { MovieFormPayload, MovieType } from '@/types'
import MovieTableSkeleton from '../skeleton/MovieTableSkeleton'
import {
  Search,
  Filter,
} from 'lucide-react'
import AddMovieModal from '@/components/modal/AddMovieModal'
import DeleteAlert from '../alert/DeleteAlert'
import EditMovieModal from '../modal/EditMovieModal'
import { toast } from 'sonner'
import { LoadingDialog } from '../alert/LoadingDialog'
import { getMovieColumns } from '../table/MovieColumn'
import DataTable from '../table/DataTable'

const MoviesPage = () => {
  const [movies, setMovies] = useState<MovieType[]>([])
  const [newMovies, setNewMovies] = useState<MovieType[]>([])
  const [loading, setLoading] = useState(true)
  const [processLoading, setProcessLoading] = useState(false)


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

  const handleDelete = async (id: number) => {
    try {
      setProcessLoading(true)
      const response = await fetch(`/api/admin/movies`, {
        method: 'DELETE',
        body: JSON.stringify({ id })
      })
      if (!response.ok) throw new Error('Failed to delete movie')
      toast.success("Movie deleted successfully!")
      fetchMovies()

    } catch (err) {

      toast.error("Failed to delete movie.")
      console.error('Failed to delete movie:', err)

    } finally {
      setProcessLoading(false)
    }
  }

  const columns = getMovieColumns({
    EditMovieModal,
    DeleteAlert,
    handleDelete,
    fetchMovies,
  })

  useEffect(() => {
    fetchMovies()
  }, [])

  if (loading) return <MovieTableSkeleton />

  return (
    <>
      <LoadingDialog open={processLoading} />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-amber-900">Movies Management</h2>
          <AddMovieModal fetchMovies={fetchMovies} />
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


        <DataTable columns={columns} data={movies} />
      </div>

    </>
  )
}

export default MoviesPage
