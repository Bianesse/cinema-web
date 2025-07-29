'use client'
import React, { useState, useEffect } from 'react';
import { Play, Calendar, MapPin, Star, Users, Clock, Ticket, ChevronDown, Menu, X } from 'lucide-react';
import Nav from '@/components/layouts/nav';
import MovieCard from '@/components/movie/MovieCard';
import LocationCard from '@/components/movie/LocationCard';

interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: string;
  duration: number;
  genre: string[];
  synopsis: string;
}

interface Cinema {
  id: string;
  name: string;
  location: string;
  halls: number;
  facilities: string[];
}


const CinemaLandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [locations, setLocations] = useState<Cinema[]>([]);


  useEffect(() => {
    async function fetchLanding() {
      const res = await fetch("/api/landing");
      const data = await res.json();
      setFeaturedMovies(data.featuredMovie);
      setLocations(data.location);
    }

    fetchLanding();
  }, []);

  const features = [
    {
      icon: <Ticket className="w-8 h-8" />,
      title: "Easy Booking",
      description: "Book your tickets online with just a few clicks"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Multiple Locations",
      description: "Find cinemas near you across the city"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Premium Experience",
      description: "Enjoy IMAX, 4DX, and Dolby Atmos sound systems"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Showtimes",
      description: "Multiple showtimes throughout the day"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">

      {/* Navigation Bar */}
      <Nav></Nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-orange-900/60 z-10"></div>
        {/* <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url(${featuredMovies[currentSlide].posterUrl})`,
            filter: 'blur(8px)',
            transform: 'scale(1.1)'
          }}
        ></div> */}

        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
            Experience Cinema
            <span className="block text-amber-200">Like Never Before</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Premium movie experiences with cutting-edge technology and comfort
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-2xl">
              Book Tickets Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-amber-900 rounded-lg text-lg font-semibold transition-all">
              View Showtimes
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <ChevronDown className="w-8 h-8 text-white animate-bounce" />
        </div>
      </section>

      {/* Featured Movies */}
      <section id="movies" className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Now Showing</h2>
            <p className="text-xl text-amber-700">Discover the latest blockbusters and indie gems</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredMovies.map((movie, index) => (
              <MovieCard key={index} index={index} movie={movie} />
            ))}
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-amber-700">Premium cinema experience with modern amenities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">{feature.title}</h3>
                <p className="text-amber-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cinema Locations */}
      <section id="cinemas" className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Our Locations</h2>
            <p className="text-xl text-amber-700">Find a cinema near you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((cinema, index) => (
              <LocationCard key={index} index={index} cinema={cinema} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-800 to-orange-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for the Ultimate Cinema Experience?</h2>
          <p className="text-xl mb-8 opacity-90">
            Book your tickets now and enjoy premium movie experiences with state-of-the-art technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-amber-800 rounded-lg text-lg font-semibold hover:bg-amber-50 transition-all transform hover:scale-105">
              Book Tickets
            </button>
            <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-amber-800 rounded-lg text-lg font-semibold transition-all">
              Browse Movies
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-amber-900" />
                </div>
                <span className="text-xl font-bold">CinemaMax</span>
              </div>
              <p className="text-amber-300">Premium cinema experience with cutting-edge technology and unmatched comfort.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-amber-300">
                <li><a href="#" className="hover:text-amber-200 transition-colors">Movies</a></li>
                <li><a href="#" className="hover:text-amber-200 transition-colors">Showtimes</a></li>
                <li><a href="#" className="hover:text-amber-200 transition-colors">Locations</a></li>
                <li><a href="#" className="hover:text-amber-200 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-amber-300">
                <li><a href="#" className="hover:text-amber-200 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-amber-200 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-amber-200 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-amber-200 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <p className="text-amber-300 mb-2">Follow us for updates and exclusive offers</p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors cursor-pointer">
                  <span className="text-sm">i</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-300">
            <p>&copy; 2025 CinemaMax. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CinemaLandingPage;