'use client'

import { useState } from "react"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Edit, Pencil } from "lucide-react"
import { CinemaType } from "@/types"


export default function EditCinemaDialog({ cinema, fetchCinemas }: { cinema: CinemaType; fetchCinemas: () => void }) {
    const [open, setOpen] = useState(false)

    const [form, setForm] = useState({
        id: cinema.id,
        name: cinema.name,
        location: cinema.location,
        address: cinema.address || "",
        totalHalls: cinema.totalHalls,
        facilities: cinema.facilities.join(", ")
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: name === "totalHalls" ? Number(value) : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload = {
            ...form,
            facilities: form.facilities.split(",").map(f => f.trim())
        }

        try {
            const res = await fetch(`/api/admin/locations`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            if (!res.ok) throw new Error("Failed to update cinema")

            toast.success("Cinema updated successfully!")
            fetchCinemas()
            setOpen(false)
        } catch (err) {
            console.error("Error:", err)
            toast.error("Failed to update cinema")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="p-1 text-amber-600 hover:bg-amber-100 rounded">
                    <Edit className="w-4 h-4" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-amber-900">Edit Cinema</DialogTitle>
                    <DialogDescription>Update cinema details below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-amber-800">Name</Label>
                        <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-amber-800">Location</Label>
                        <Input id="location" name="location" value={form.location} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address" className="text-amber-800">Address</Label>
                        <Input id="address" name="address" value={form.address} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="totalHalls" className="text-amber-800">Total Halls</Label>
                        <Input id="totalHalls" name="totalHalls" type="number" value={form.totalHalls} onChange={handleChange} min={1} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="facilities" className="text-amber-800">Facilities (comma-separated)</Label>
                        <Input id="facilities" name="facilities" value={form.facilities} onChange={handleChange} />
                    </div>
                    <div className="pt-2 flex justify-end">
                        <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">Update</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
