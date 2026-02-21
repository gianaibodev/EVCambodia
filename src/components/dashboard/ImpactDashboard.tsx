import { BarChart3, Leaf, Zap, RefreshCw, TrendingUp, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

export function ImpactDashboard({ onGoToMap }: { onGoToMap: () => void }) {
    const stats = [
        { label: "Total Carbon Offset", value: "2,840.5", unit: "KG", trend: "+12.5%", icon: Leaf, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
        { label: "Grid Support", value: "142.8", unit: "MWH", trend: "+8.2%", icon: RefreshCw, color: "text-[#ef233c]", bg: "bg-red-50 dark:bg-red-950/10" },
        { label: "Total Earnings", value: "$1,452.10", unit: "USD", trend: "+$240", icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/10" },
        { label: "Clean Energy", value: "94.2", unit: "%", trend: "+2.1%", icon: Zap, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/10" },
    ]

    return (
        <div className="h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6 md:p-10 space-y-8 pb-24 md:pb-10">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 leading-none">
                            Sustainability Dashboard
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Real-time infrastructure & environmental impact</p>
                    </div>
                    <button onClick={onGoToMap} className="bg-[#ef233c] hover:bg-[#d90429] px-6 py-2.5 rounded-lg text-white font-bold text-sm transition-colors flex items-center gap-2">
                        View Map <BarChart3 className="w-4 h-4" />
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-4", stat.bg, stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</span>
                                <span className="text-xs font-bold text-slate-400 uppercase">{stat.unit}</span>
                            </div>
                            <div className="mt-3 flex items-center gap-1 text-xs font-bold">
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-emerald-500">{stat.trend}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Grid Stability Contribution</h3>
                            <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                                Real-time
                            </div>
                        </div>
                        <div className="h-48 w-full flex items-end gap-3 px-4 border-b border-slate-100 dark:border-slate-800 pb-2 mb-6">
                            {[40, 65, 30, 85, 45, 95, 60, 75, 50, 80, 55, 90, 40, 70].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                                    <div 
                                        className={cn(
                                            "w-full rounded-t-lg transition-all duration-500",
                                            i % 4 === 0 ? "bg-[#ef233c]" : "bg-emerald-500"
                                        )}
                                        style={{ height: `${h}%` }}
                                    />
                                    <span className="text-[8px] font-bold text-slate-300 dark:text-slate-600">H{i+1}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Your vehicle has provided 28.4 MWH of bidirectional energy to the grid this month, directly reducing peak demand in Phnom Penh.</p>
                    </div>

                    <div className="bg-[#ef233c]/5 dark:bg-[#ef233c]/10 rounded-3xl p-8 flex flex-col justify-between border border-[#ef233c]/10 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-[#ef233c] rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#ef233c]/20">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">National Grid Support</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                Your vehicle is now part of Cambodia's decentralized energy infrastructure. You are earning credits while helping stabilize the national power grid.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-xl border border-white/20">
                                    <span className="text-xs font-bold text-slate-500">Offset Reward</span>
                                    <span className="text-xs font-bold text-emerald-500">+$12.50</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-xl border border-white/20">
                                    <span className="text-xs font-bold text-slate-500">Grid Stabilization</span>
                                    <span className="text-xs font-bold text-[#ef233c]">+$42.10</span>
                                </div>
                            </div>
                        </div>
                        <button className="relative z-10 mt-8 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-transform active:scale-[0.98]">
                            View Detailed Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
