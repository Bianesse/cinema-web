'use client'
import React, { useState, useEffect } from 'react';
import { Play, Calendar, MapPin, Star, Users, Clock, Ticket, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Nav from '@/components/layouts/nav';
import MovieCard from '@/components/movie/MovieCard';
import LocationCard from '@/components/movie/LocationCard';
import MovieCardSkeleton from '@/components/skeleton/MovieCardSkeleton';
import LocationCardSkeleton from '@/components/skeleton/LocationCardSkeleton';
import Footer from '@/components/layouts/footer';
import { CinemaType, MovieType } from '@/types';
import { toast } from 'sonner';

const CinemaLandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredMovies, setFeaturedMovies] = useState<MovieType[]>([]);
  const [locations, setLocations] = useState<CinemaType[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchLanding() {
      const res = await fetch("/api/landing");
      const data = await res.json();
      setFeaturedMovies(data.featuredMovie);
      setLocations(data.location);
      setLoading(false);
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
      <Nav />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-orange-900/60 z-10"></div>
        {featuredMovies.length > 1 && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{
              backgroundImage: `url(${featuredMovies[1].posterUrl})`,
              filter: 'blur(8px)',
              transform: 'scale(1.1)'
            }}
          ></div>
        )}

        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
            Experience Cinema
            <span className="block text-amber-200">Like Never Before</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Premium movie experiences with cutting-edge technology and comfort
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-2xl"
            onClick={() => toast.warning("Fitur ini masih dalam pengembangan")}>
              Book Tickets Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-amber-900 rounded-lg text-lg font-semibold transition-all"
            onClick={() => toast.warning("Fitur ini masih dalam pengembangan")}>
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

          <div className="grid md:grid-cols-4 gap-8">
            {loading
              ?
              Array.from({ length: 3 }).map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))
              :
              featuredMovies.map((movie, index) => (
                <Link href={`/movies/${movie.id}`} key={index} >
                  <MovieCard key={index} index={index} movie={movie} />
                </Link>
              ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/movies" >
              <button className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-2xl">
                View All
              </button>
            </Link>
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
            {loading
              ?
              Array.from({ length: 3 }).map((_, index) => (
                <LocationCardSkeleton key={index} />
              ))
              :
              locations.map((cinema, index) => (
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
            <button className="px-8 py-4 bg-white text-amber-800 rounded-lg text-lg font-semibold hover:bg-amber-50 transition-all transform hover:scale-105"
            onClick={() => toast.warning("Fitur ini masih dalam pengembangan")}>
              Book Tickets
            </button>
            <Link href="/movies" >
            <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-amber-800 rounded-lg text-lg font-semibold transition-all">
              Browse Movies
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CinemaLandingPage;