import { Play } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-amber-900 text-amber-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-amber-900" />
                </div>
                <span className="text-xl font-bold">Cinemax</span>
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
    );
}