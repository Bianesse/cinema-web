'use client'
import { Film, LayoutDashboard, LogOut, MapPin, Play, X, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react"

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}
const Sidebar = ( { sidebarOpen, setSidebarOpen, activeTab, setActiveTab }: SidebarProps) => {
    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'movies', label: 'Movies', icon: <Film className="w-5 h-5" /> },
        { id: 'locations', label: 'Locations', icon: <MapPin className="w-5 h-5" /> },
        { id: 'users', label: 'Users', icon: <User className="w-5 h-5" /> },
      ];

      const {data: session} = useSession();

    return (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-sm border-r border-amber-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="flex items-center justify-between h-16 px-6 border-b border-amber-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-amber-900">Cinemax</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 text-amber-600 hover:bg-amber-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
    
            <nav className="mt-6 px-4">
              <div className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                        : 'text-amber-700 hover:bg-amber-100'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>
    
            {/* Admin Profile */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-amber-200">
              <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">A</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-amber-900">{session?.user?.name}</p>
                  <p className="text-xs text-amber-600">{session?.user?.role}</p>
                </div>
                <button className="p-1 text-amber-600 hover:bg-amber-200 rounded"
                onClick={() => signOut({ callbackUrl: '/' })}>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
    );
};

export default Sidebar;