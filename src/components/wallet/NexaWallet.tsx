import { CreditCard, ArrowDown, ArrowUp, Zap, Leaf, RefreshCw, Smartphone, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export function NexaWallet() {
    const transactions = [
        { id: "TX-9402", type: "V2G Reward", amount: "+42.10", token: "$NXA", date: "Today, 2:14 PM", status: "Confirmed", icon: RefreshCw, color: "text-[#ef233c]" },
        { id: "TX-9391", type: "Carbon Offset", amount: "+12.50", token: "$NXA", date: "Today, 10:45 AM", status: "Confirmed", icon: Leaf, color: "text-emerald-500" },
        { id: "TX-9382", type: "Charging Session", amount: "-18.20", token: "$NXA", date: "Yesterday, 6:30 PM", status: "Confirmed", icon: Zap, color: "text-amber-500" },
    ]

    return (
        <div className="h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6 md:p-10 space-y-8 pb-24 md:pb-10">
            <header className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 leading-none text-glow">
                    NEXA Wallet
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-[0.2em] text-[10px]">Secure energy & carbon credit marketplace</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <div className="lg:col-span-2 space-y-8">
                    {/* Main Card */}
                    <div className="bg-slate-900 dark:bg-white rounded-[2rem] p-8 text-white dark:text-slate-950 shadow-xl relative overflow-hidden h-[240px] flex flex-col justify-between">
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-1">Total Balance</p>
                                <h2 className="text-5xl font-bold tracking-tighter leading-none">$1,452.10</h2>
                            </div>
                            <div className="w-12 h-12 bg-white/10 dark:bg-black/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                                <CreditCard className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="relative z-10 flex items-center gap-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.1em] opacity-40 mb-1">Staked Credits</p>
                                <p className="text-lg font-bold">2,400 <span className="text-[10px] opacity-40 uppercase tracking-widest">$NXA</span></p>
                            </div>
                            <div className="w-[1px] h-6 bg-white/10 dark:bg-black/10" />
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.1em] opacity-40 mb-1">Impact Rank</p>
                                <p className="text-lg font-bold">Elite Tier 3</p>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Zap className="w-48 h-48 -rotate-12 translate-x-12 -translate-y-12" />
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Send", icon: ArrowUp },
                            { label: "Receive", icon: ArrowDown },
                            { label: "Swap", icon: RefreshCw },
                            { label: "Mobile Pay", icon: Smartphone },
                        ].map((btn) => (
                            <button key={btn.label} className="flex flex-col items-center justify-center gap-3 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#ef233c]/30 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-[#ef233c] transition-colors">
                                    <btn.icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{btn.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Transactions */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8">Recent Transactions</h3>
                        <div className="space-y-4">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center", tx.color)}>
                                            <tx.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white uppercase leading-none mb-1">{tx.type}</p>
                                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{tx.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={cn("text-sm font-bold tracking-tight mb-1", tx.amount.startsWith('+') ? "text-emerald-500" : "text-slate-900 dark:text-white")}>
                                            {tx.amount} <span className="text-[10px] opacity-40">$NXA</span>
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tx.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Security Badge */}
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl p-8 text-center shadow-sm">
                        <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto mb-6" />
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-2">Enterprise Security</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Financial transactions and energy settlements are fully encrypted and backed by national grid compliance.</p>
                    </div>

                    {/* Offset Card */}
                    <div className="bg-[#ef233c]/5 rounded-3xl p-8 border border-[#ef233c]/10 shadow-sm relative overflow-hidden">
                        <Leaf className="w-8 h-8 text-[#ef233c] mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">ESG Verification</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-8">Download your quarterly carbon offset report for corporate environmental compliance.</p>
                        <button className="w-full py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-colors hover:bg-black">Download Certificate</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
