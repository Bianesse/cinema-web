import { Play, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Nav() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        < nav className="bg-amber-900/95 backdrop-blur-sm text-amber-50 sticky top-0 z-50 shadow-lg" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                            <Play className="w-4 h-4 text-amber-900" />
                        </div>
                        <span className="text-xl font-bold">CinemaMax</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <a href="#home" className="hover:text-amber-200 transition-colors">Home</a>
                        <a href="#movies" className="hover:text-amber-200 transition-colors">Movies</a>
                        <a href="#cinemas" className="hover:text-amber-200 transition-colors">Cinemas</a>
                        <a href="#about" className="hover:text-amber-200 transition-colors">About</a>
                    </div>

                    <div className="hidden md:flex space-x-4">
                        <button className="px-4 py-2 border border-amber-200 rounded-lg hover:bg-amber-200 hover:text-amber-900 transition-all">
                            Sign In
                        </button>
                        <button className="px-4 py-2 bg-amber-200 text-amber-900 rounded-lg hover:bg-amber-300 transition-all font-medium">
                            Book Now
                        </button>
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
                            <div className="flex flex-col space-y-2 pt-2">
                                <button className="px-4 py-2 border border-amber-200 rounded-lg hover:bg-amber-200 hover:text-amber-900 transition-all">
                                    Sign In
                                </button>
                                <button className="px-4 py-2 bg-amber-200 text-amber-900 rounded-lg hover:bg-amber-300 transition-all font-medium">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}