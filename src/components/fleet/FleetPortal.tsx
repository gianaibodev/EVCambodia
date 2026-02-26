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
        <div className="h-full overflow-y-auto bg-slate-50 dark:bg-[#050505] p-6 md:p-10 space-y-10 pb-24 md:pb-10">
            <header className="max-w-7xl mx-auto pt-10 md:pt-0">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs font-black text-accent uppercase tracking-[0.3em]">Enterprise Command</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 leading-none text-glow">
                    Fleet <span className="text-accent">OS</span>
                </h1>
                <p className="text-slate-500 dark:text-zinc-400 font-bold uppercase tracking-[0.3em] text-xs">Unified logistics intelligence & infrastructure control</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {fleetStats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white dark:bg-white/5 rounded-[2rem] p-8 border border-black/5 dark:border-white/10 shadow-sm"
                    >
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 text-slate-500 dark:text-white">
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter">{stat.value}</span>
                            <span className="text-xs font-bold text-slate-400 uppercase">{stat.unit}</span>
                        </div>
                        <p className="mt-4 text-xs font-black uppercase tracking-widest text-emerald-500">{stat.trend}</p>
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="bg-white dark:bg-white/5 rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Live Fleet Status</h3>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => alert("Enterprise vehicle registration system active. Data syncing with MEF database.")}
                                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                            >
                                Add Vehicle
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-black/5 dark:border-white/5">
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Unit ID</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Driver</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Energy (SOC)</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Current Node</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5 dark:divide-white/5">
                                {vehicles.map((v) => (
                                    <tr key={v.id} className="group hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-black text-slate-900 dark:text-white">{v.id}</p>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">{v.model}</p>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-bold text-slate-700 dark:text-zinc-300">{v.driver}</td>
                                        <td className="px-8 py-6">
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border",
                                                v.status === 'Active' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : 
                                                v.status === 'Charging' ? "bg-accent/10 border-accent/20 text-accent" : 
                                                "bg-slate-100 dark:bg-white/10 border-black/5 dark:border-white/10 text-slate-500"
                                            )}>
                                                {v.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                                    <div className={cn("h-full transition-all duration-1000", v.soc < 20 ? "bg-accent" : "bg-emerald-500")} style={{ width: `${v.soc}%` }} />
                                                </div>
                                                <span className="text-xs font-black text-slate-900 dark:text-white">{v.soc}%</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-slate-600 dark:text-zinc-400">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span className="text-xs font-bold">{v.location}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button 
                                                aria-label={`View details for ${v.id}`} 
                                                className="p-2 rounded-lg bg-black/5 dark:bg-white/5 text-slate-400 hover:text-accent hover:bg-accent/10 transition-colors"
                                            >
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
                <div className="bg-slate-900 dark:bg-zinc-100 rounded-[2.5rem] p-10 text-white dark:text-slate-950 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <AlertCircle className="w-10 h-10 text-accent dark:text-white mb-6" />
                        <h3 className="text-2xl font-black tracking-tight uppercase mb-4 leading-none">Urgent: Low Range Warning</h3>
                        <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-8">3 vehicles in the Chbar Ampov district are below 15% SOC. Rerouting to nearest 120kW Supercharger nodes now.</p>
                        <button 
                            onClick={() => alert("Fleet optimization algorithms confirmed. Rerouting active.")}
                            className="w-full py-4 bg-accent text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95"
                        >
                            Confirm Optimization
                        </button>
                    </div>
                </div>
                <div className="bg-white dark:bg-white/5 rounded-[2.5rem] p-10 border border-black/5 dark:border-white/10 flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-6 shadow-xl">
                        <BarChart className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight leading-none">Fleet Efficiency</h3>
                    <p className="text-slate-500 dark:text-zinc-400 text-sm max-w-xs mx-auto font-medium">Your fleet has reduced CO2 emissions by 12.4 Tons this month, exceeding national environmental targets.</p>
                </div>
            </div>
        </div>
    )
}
