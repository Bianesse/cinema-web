'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { UserType } from '@/types'
import { set } from 'zod'
import { id } from 'zod/v4/locales'

interface EditUserModalProps  {
    user: UserType
    fetchUsers: () => void
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, fetchUsers}) => {
    const [users, setUsers] = React.useState({id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, /* password: user.passwordHash */ })
    const {id, name, email, phone, role, /* password */ } = users
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id, name, email, phone, role, /* password  */})
            })
            // Optionally: refresh users list or show success toast

            if (!res.ok) throw new Error('Failed to edit user')
            fetchUsers()
        } catch (err) {
            console.error('Failed to add user:', err)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="p-1 text-amber-600 hover:bg-amber-100 rounded">
                    <Edit className="w-4 h-4" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-amber-900">Edit User</DialogTitle>
                    <DialogDescription>Update the user’s information below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="name" className="text-amber-800">Name</Label>
                            <Input id="name" placeholder="Enter name" value={name} onChange={(e) => setUsers({ ...users, name: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-amber-800">Email</Label>
                            <Input id="email" placeholder="Enter email" value={email} onChange={(e) => setUsers({ ...users, email: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-amber-800">Phone</Label>
                            <Input id="phone" placeholder="Enter phone" value={phone} onChange={(e) => setUsers({ ...users, phone: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-amber-800">Role</Label>
                            <select id="role" className="p-2 border border-amber-600 rounded w-full" value={role} onChange={(e) => setUsers({ ...users, role: e.target.value })}>
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </select>
                        </div>
                        {/* <div className="space-y-2">
                            <Label htmlFor="password" className="text-amber-800">Password</Label>
                            <Input id="password" placeholder="Enter password" value={password} onChange={(e) => setUsers({ ...users, password: e.target.value })} />
                        </div> */}
                    </div>
                    <div className="pt-2 flex justify-end gap-2">
                        <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">Save Changes</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default EditUserModal
