import { Truck, MapPin, BarChart, Shield, Activity, AlertCircle, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function FleetPortal() {
    const fleetStats = [
        { label: "Active Fleet", value: "84", unit: "VEHICLES", trend: "12 En-route", icon: Truck },
        { label: "Fleet Range", value: "4,210", unit: "KM", trend: "Avg 84% SOC", icon: Activity },
        { label: "Operational Cost", value: "$0.12", unit: "/KM", trend: "-18% vs ICE", icon: BarChart },
        { label: "System Health", value: "99.9", unit: "%", trend: "Stable", icon: Shield },
    ]

    const vehicles = [
        { id: "EV-942", model: "BYD Atto 3", status: "Charging", soc: 42, location: "PTT Chbar Ampov", driver: "Sokha Mean" },
        { id: "EV-102", model: "Tesla Model Y", status: "Active", soc: 88, location: "Total Sihanoukville", driver: "Vannak Long" },
        { id: "EV-554", model: "MG 4 Electric", status: "Idle", soc: 15, location: "EV Energy Tech HQ", driver: "Bopha Chan" },
    ]

    return (
        <div className="h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6 md:p-10 space-y-8 pb-24 md:pb-10">
            <header className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 leading-none">
                    Fleet Management
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Enterprise logistics & charging infrastructure control</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {fleetStats.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-500">
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</span>
                            <span className="text-xs font-bold text-slate-400">{stat.unit}</span>
                        </div>
                        <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-emerald-600">{stat.trend}</p>
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Vehicle Status</h3>
                        <button className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold transition-colors">Add Vehicle</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Unit ID</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Driver</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Battery (SOC)</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Location</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {vehicles.map((v) => (
                                    <tr key={v.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{v.id}</p>
                                            <p className="text-[10px] text-slate-500 font-medium">{v.model}</p>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-medium text-slate-700 dark:text-slate-300">{v.driver}</td>
                                        <td className="px-6 py-5">
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                                v.status === 'Active' ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/50 text-emerald-600" : 
                                                v.status === 'Charging' ? "bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-900/50 text-[#ef233c]" : 
                                                "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500"
                                            )}>
                                                {v.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className={cn("h-full", v.soc < 20 ? "bg-[#ef233c]" : "bg-emerald-500")} style={{ width: `${v.soc}%` }} />
                                                </div>
                                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{v.soc}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-slate-500 font-medium">{v.location}</td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 text-white">
                    <AlertCircle className="w-8 h-8 text-[#ef233c] mb-4" />
                    <h3 className="text-xl font-bold mb-2">Fleet Optimization Warning</h3>
                    <p className="text-slate-400 text-sm font-medium mb-6">3 vehicles are below 15% charge. Rerouting to the nearest fast-charging hubs now.</p>
                    <button className="w-full py-3 bg-[#ef233c] hover:bg-[#d90429] rounded-xl font-bold text-xs uppercase tracking-widest transition-colors">Approve Rerouting</button>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center text-center">
                    <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                        <BarChart className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Sustainability Progress</h3>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">Your fleet saved 12.4 tons of CO2 this month, qualifying for additional energy tax credits.</p>
                </div>
            </div>
        </div>
    )
}
