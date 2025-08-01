'use client'

import { useEffect, useState } from 'react'
import { UserType } from '@/types'
import MovieTableSkeleton from '../skeleton/MovieTableSkeleton'
import AddUserModal from '@/components/modal/AddUserModal'
import EditUserModal from '@/components/modal/EditUserModal'
import DeleteAlert from '../alert/DeleteAlert'
import {
    Plus,
    Search,
    Filter,
    Eye,
    Edit,
    Trash2
} from 'lucide-react'
import { toast } from 'sonner'
import { LoadingDialog } from '../alert/LoadingDialog'
import DataTable from '../table/DataTable'
import getUsersColumns from '../table/UsersColumn'

const UsersPage = () => {
    const [users, setUsers] = useState<UserType[]>([])
    const [loading, setLoading] = useState(true)
    const [processLoading, setProcessLoading] = useState(false)

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/admin/users')
            const data = await response.json()
            setUsers(data)
        } catch (err) {
            console.error('Failed to fetch users:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            setProcessLoading(true)
            const response = await fetch(`/api/admin/users`, {
                method: 'DELETE',
                body: JSON.stringify({ id })
            })
            if (!response.ok) throw new Error('Failed to delete user')
            toast.success("User deleted successfully!")
            fetchUsers()
        } catch (err) {
            console.error('Failed to delete user:', err)
            toast.error("Failed to delete user.")
        } finally {
            setProcessLoading(false)
        }
    }

    const columns = getUsersColumns({
        EditUserModal,
        DeleteAlert,
        handleDelete,
        fetchUsers
    })

    useEffect(() => {
        fetchUsers()
    }, [])

    if (loading) return <MovieTableSkeleton />

    return (
        <>
            <LoadingDialog open={processLoading} />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-2xl font-bold text-amber-900">Users Management</h2>
                    <AddUserModal fetchUsers={fetchUsers} />
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                    </div>
                    <button className="flex items-center space-x-2 border border-amber-200 px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                </div>

                {/* Movies Table */}
                <DataTable columns={columns} data={users} />
            </div>
        </>
    )
}

export default UsersPage
