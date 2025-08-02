import { DashboardData } from "@/types";
interface Stat {
    title: string;
    value: string | number;
    change: string;
    icon: React.ReactNode;
    color: string;
}

export default function StatsCard({ stat, index }: { stat: Stat; index: number }) {
    return (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-amber-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-amber-900 mt-2">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full bg-amber-50 ${stat.color}`}>
                    {stat.icon}
                </div>
            </div>
        </div>
    )
}
