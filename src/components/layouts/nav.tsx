'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react";
import { Play, Menu, X, User, ChevronDown, Settings, Calendar, Shield, LogOut } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react"
import { Button } from "../ui/button";

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { data: session } = useSession();

    const handleSignOut = () => {
        setIsProfileOpen(false);
        signOut();
    };

    // Get user initials for avatar
    const getUserInitials = (name: string): string => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <nav className="bg-amber-900/95 backdrop-blur-sm text-amber-50 sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                            <Play className="w-4 h-4 text-amber-900" />
                        </div>
                        <Link href="/">
                            <span className="text-xl font-bold">Cinemax</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <a href="#home" className="hover:text-amber-200 transition-colors">Home</a>
                        <a href="#movies" className="hover:text-amber-200 transition-colors">Movies</a>
                        <a href="#cinemas" className="hover:text-amber-200 transition-colors">Cinemas</a>
                        <a href="#about" className="hover:text-amber-200 transition-colors">About</a>
                    </div>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {session ? (
                            <div className="relative">
                                {/* Profile Dropdown */}
                                <DropdownMenu onOpenChange={setIsProfileOpen}>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-amber-800/50 transition-colors"
                                        >
                                            <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                                                <span className="text-amber-900 font-semibold text-sm">
                                                    {getUserInitials(session?.user?.name || '')}
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium">{session.user?.name}</span>
                                            <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end" className="w-56 mt-1 border-amber-200">
                                        <DropdownMenuLabel className="text-amber-900">
                                            <div className="text-sm font-medium">{session.user?.name}</div>
                                            <div className="text-xs text-amber-600">{session.user?.email}</div>
                                            {session.user?.role && (
                                                <span className="inline-block mt-1 px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                                                    {session.user.role}
                                                </span>
                                            )}
                                        </DropdownMenuLabel>

                                        <DropdownMenuSeparator className="bg-amber-100" />

                                        <Link href="/profile" passHref>
                                            <DropdownMenuItem className="text-amber-700 focus:bg-amber-50">
                                                <User className="w-4 h-4 mr-2" />
                                                My Profile
                                            </DropdownMenuItem>
                                        </Link>

                                        <Link href="/bookings" passHref>
                                            <DropdownMenuItem className="text-amber-700 focus:bg-amber-50">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                My Bookings
                                            </DropdownMenuItem>
                                        </Link>

                                        <DropdownMenuItem className="text-amber-700 focus:bg-amber-50">
                                            <Settings className="w-4 h-4 mr-2" />
                                            Settings
                                        </DropdownMenuItem>

                                        {session.user?.role === "ADMIN" && (
                                            <>
                                                <DropdownMenuSeparator className="bg-amber-100" />
                                                <Link href="/admin/dashboard" passHref>
                                                    <DropdownMenuItem className="text-amber-700 focus:bg-amber-50">
                                                        <Shield className="w-4 h-4 mr-2" />
                                                        Admin Dashboard
                                                    </DropdownMenuItem>
                                                </Link>
                                            </>
                                        )}

                                        <DropdownMenuSeparator className="bg-amber-100" />

                                        <DropdownMenuItem
                                            onClick={() => signOut()}
                                            className="text-red-600 focus:bg-red-50"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign Out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <button className="px-4 py-2 border border-amber-200 rounded-lg hover:bg-amber-200 hover:text-amber-900 transition-all">
                                        Sign In
                                    </button>
                                </Link>
                                <Link href="/signup">
                                    <button className="px-4 py-2 bg-amber-200 text-amber-900 rounded-lg hover:bg-amber-300 transition-all font-medium">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-amber-800">
                        <div className="flex flex-col space-y-4">
                            <a href="#home" className="hover:text-amber-200 transition-colors">Home</a>
                            <a href="#movies" className="hover:text-amber-200 transition-colors">Movies</a>
                            <a href="#cinemas" className="hover:text-amber-200 transition-colors">Cinemas</a>
                            <a href="#about" className="hover:text-amber-200 transition-colors">About</a>

                            {session ? (
                                <div className="flex flex-col space-y-2 pt-2 border-t border-amber-800">
                                    <div className="flex items-center space-x-2 px-2 py-2">
                                        <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                                            <span className="text-amber-900 font-semibold text-sm">
                                                {getUserInitials(session?.user?.name || '')}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{session.user?.name}</p>
                                            <p className="text-xs text-amber-300">{session.user?.email}</p>
                                        </div>
                                    </div>

                                    <Link href="/profile">
                                        <button className="w-full flex items-center space-x-2 px-4 py-2 border border-amber-200 rounded-lg hover:bg-amber-200 hover:text-amber-900 transition-all text-left">
                                            <User className="w-4 h-4" />
                                            <span>My Profile</span>
                                        </button>
                                    </Link>

                                    <Link href="/bookings">
                                        <button className="w-full flex items-center space-x-2 px-4 py-2 border border-amber-200 rounded-lg hover:bg-amber-200 hover:text-amber-900 transition-all text-left">
                                            <Calendar className="w-4 h-4" />
                                            <span>My Bookings</span>
                                        </button>
                                    </Link>

                                    {/* Admin Dashboard Link for Mobile - Only show if user is ADMIN */}
                                    {session.user?.role === 'ADMIN' && (
                                        <Link href="/admin/dashboard">
                                            <button className="w-full flex items-center space-x-2 px-4 py-2 border border-amber-200 rounded-lg hover:bg-amber-200 hover:text-amber-900 transition-all text-left">
                                                <Shield className="w-4 h-4" />
                                                <span>Admin Dashboard</span>
                                            </button>
                                        </Link>
                                    )}

                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-300 rounded-lg hover:bg-red-100 hover:text-red-700 transition-all text-left"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col space-y-2 pt-2 border-t border-amber-800">
                                    <Link href="/login">
                                        <button className="w-full px-4 py-2 border border-amber-200 rounded-lg hover:bg-amber-200 hover:text-amber-900 transition-all">
                                            Sign In
                                        </button>
                                    </Link>
                                    <Link href="/signup">
                                        <button className="w-full px-4 py-2 bg-amber-200 text-amber-900 rounded-lg hover:bg-amber-300 transition-all font-medium">
                                            Sign Up
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}