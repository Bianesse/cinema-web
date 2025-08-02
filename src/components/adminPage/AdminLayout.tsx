'use client'
import { useState } from 'react';
import {
    Menu,
    Bell,
    Settings,
    ArrowLeft,
} from 'lucide-react';
import Sidebar from '@/components/layouts/sidebar';
import Link from 'next/link';

interface AdminLayoutProps {
    children: React.ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const AdminLayout = ({ children, activeTab, setActiveTab }: AdminLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
            {/* Mobile menu overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Top Bar */}
                <header className="bg-white/95 backdrop-blur-sm border-b border-amber-200 px-4 lg:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 text-amber-600 hover:bg-amber-100 rounded-lg"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                            <h1 className="text-2xl font-bold text-amber-900 capitalize">{activeTab}</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="flex items-center space-x-1 text-amber-700 hover:text-amber-900 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="text-sm font-medium">Back to main</span>
                            </Link>
                            {/* <button className="p-2 text-amber-600 hover:bg-amber-100 rounded-lg relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="p-2 text-amber-600 hover:bg-amber-100 rounded-lg">
                                <Settings className="w-5 h-5" />
                            </button> */}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;