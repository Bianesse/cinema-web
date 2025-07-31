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

const UsersPage = () => {
    const [users, setUsers] = useState<UserType[]>([])
    const [loading, setLoading] = useState(true)

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
            const response = await fetch(`/api/admin/users`, {
                method: 'DELETE',
                body: JSON.stringify({ id })
            })
            if (!response.ok) throw new Error('Failed to delete user')
            fetchUsers()
        } catch (err) {
            console.error('Failed to delete user:', err)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if (loading) return <MovieTableSkeleton />

    return (
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
            <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-amber-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Role</th>
                                {/* <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Bookings</th> */}
                                <th className="px-6 py-4 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-amber-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-amber-900">{user.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-amber-900">{user.email}</td>
                                    <td className="px-6 py-4 text-amber-900">{user.phone}</td>
                                    <td className="px-6 py-4 text-amber-900">{user.role}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <EditUserModal user={user} fetchUsers={fetchUsers} />
                                            <DeleteAlert handleDelete={() => handleDelete(user.id)} />
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

export default UsersPage
