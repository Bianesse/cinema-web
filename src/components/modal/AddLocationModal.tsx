'use client'

import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Plus } from "lucide-react"
import { LoadingDialog } from "../alert/LoadingDialog"

export default function AddCinemaDialog({ fetchCinemas }: { fetchCinemas: () => void }) {
    const [cinema, setCinema] = useState({
        name: "",
        location: "",
        address: "",
        totalHalls: 1,
        facilities: ""
    })
    const [open, setOpen] = useState(false)
    const [processLoading, setProcessLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCinema(prev => ({
            ...prev,
            [name]: name === "totalHalls" ? Number(value) : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload = {
            ...cinema,
            facilities: cinema.facilities.split(",").map(f => f.trim())
        }

        try {
            setProcessLoading(true)
            const res = await fetch("/api/admin/locations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            if (!res.ok) throw new Error("Failed to create cinema")

            toast.success("Cinema added successfully!")
            fetchCinemas()
            setCinema({
                name: "",
                location: "",
                address: "",
                totalHalls: 1,
                facilities: ""
            })
            setOpen(false)
        } catch (err) {
            console.error("Error:", err)
            toast.error("Failed to add cinema")
        } finally {
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
                        <span>Add Location</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-amber-900">Add New Cinema</DialogTitle>
                        <DialogDescription>Enter details of the cinema below.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-amber-800">Name</Label>
                            <Input id="name" name="name" value={cinema.name} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-amber-800">Location</Label>
                            <Input id="location" name="location" value={cinema.location} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-amber-800">Address</Label>
                            <Input id="address" name="address" value={cinema.address} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="totalHalls" className="text-amber-800">Total Halls</Label>
                            <Input id="totalHalls" name="totalHalls" type="number" value={cinema.totalHalls} onChange={handleChange} min={1} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="facilities" className="text-amber-800">Facilities (comma-separated)</Label>
                            <Input id="facilities" name="facilities" placeholder="e.g. Parking, Food Court, IMAX" value={cinema.facilities} onChange={handleChange} />
                        </div>
                        <div className="pt-2 flex justify-end">
                            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">Save</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
