'use client'
import { useState } from 'react'
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
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { LoadingDialog } from '../alert/LoadingDialog'

const AddUserModal = ({ fetchUsers }: { fetchUsers: () => void }) => {
    const [user, setUser] = useState({ name: '', email: '', phone: '', role: 'USER', password: '' })
    const { name, email, phone, role, password } = user
    const [open, setOpen] = useState(false)
    const [processLoading, setProcessLoading] = useState(false)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setProcessLoading(true)
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, role, password })
            })

            if (!res.ok) throw new Error('Failed to create user')

            toast.success("User created successfully!")
            fetchUsers()
            setOpen(false) // ✅ close the dialog
        } catch (err) {
            console.error('Failed to add user:', err)
            toast.error("Failed to create user.")
        } finally {
            setUser({ name: '', email: '', phone: '', role: '', password: '' })
            setProcessLoading(false)
        }
    }

    return (
        <>
        <LoadingDialog open={processLoading} />
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all">
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-amber-900">Add New User</DialogTitle>
                    <DialogDescription>Fill in the form below to add a new user.</DialogDescription>
                </DialogHeader>
                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="name" className="text-amber-800">Name</Label>
                            <Input id="name" placeholder="Enter name" value={name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-amber-800">Email</Label>
                            <Input id="email" placeholder="Enter email" value={email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-amber-800">Phone</Label>
                            <Input id="phone" placeholder="Enter phone" value={phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-amber-800">Role</Label>
                            <select name="role" id="role" className='p-2 border border-amber-600 rounded w-full' value={role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-amber-800">Password</Label>
                            <Input type='password' id="password" placeholder="Enter password" value={password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        </div>
                    </div>
                    <div className="pt-2 flex justify-end gap-2">
                        <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default AddUserModal
