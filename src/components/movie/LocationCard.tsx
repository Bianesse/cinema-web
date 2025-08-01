import { MapPin } from "lucide-react";
import { toast } from "sonner";

interface Cinema {
  name: string;
  location: string;
  halls: number;
  facilities: string[];
}

interface LocationCardProps {
  index: number;
  cinema: Cinema;
}

export default function LocationCard({ index, cinema }: LocationCardProps) {
  return (
    <div key={index} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <MapPin className="w-6 h-6 text-amber-600" />
        <h3 className="text-xl font-bold text-amber-900">{cinema.name}</h3>
      </div>
      <p className="text-amber-700 mb-3">{cinema.location}</p>
      <p className="text-sm text-amber-600 mb-4">{cinema.halls} Halls Available</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {cinema.facilities.map((facility: string, i: number) => (
          <span key={i} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
            {facility}
          </span>
        ))}
      </div>
      <button className="w-full py-2 border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white rounded-lg transition-all"
      onClick={() => toast.warning("Fitur ini masih dalam pengembangan")}>
        View Showtimes
      </button>
    </div>
  );
}
