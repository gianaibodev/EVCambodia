import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight, Github, Sparkles, Zap, Map as MapIcon, BarChart3, Users, Leaf, RefreshCw, ShieldCheck, Globe, CreditCard } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"
import { MapView } from "@/components/map-view"
import { ImpactDashboard } from "@/components/dashboard/ImpactDashboard"
import { FleetPortal } from "@/components/fleet/FleetPortal"
import { NexaWallet } from "@/components/wallet/NexaWallet"

function StartupLanding({ onStart }: { onStart: () => void }) {
    return (
        <div className="bg-background text-text-primary transition-colors duration-500 min-h-screen relative overflow-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-white to-white dark:from-[#1a0505] dark:to-black"></div>
                <div className="absolute top-0 left-0 w-[1px] h-[1px] bg-transparent stars-1 animate-[animStar_50s_linear_infinite] hidden dark:block"></div>
                <div className="absolute top-0 left-0 w-[2px] h-[2px] bg-transparent stars-2 animate-[animStar_80s_linear_infinite] hidden dark:block"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-accent/10 dark:bg-accent/5 rounded-full blur-[140px]"></div>
                <div className="absolute inset-0 bg-grid-black opacity-40 dark:hidden [mask-image:radial-gradient(circle_at_center,black_40%,transparent_80%)]"></div>
                <div className="absolute inset-0 bg-grid-white opacity-30 hidden dark:block [mask-image:radial-gradient(circle_at_center,black_40%,transparent_80%)]"></div>
            </div>

            <header className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/75 dark:bg-black/45 backdrop-blur-xl">
                <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 font-black text-2xl tracking-tight text-slate-950 dark:text-white cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-5 h-5 bg-accent rounded-sm rotate-45"></div>
                        EV.KH
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-zinc-300">
                        <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Infrastructure</a>
                        <a href="#sustainability" className="hover:text-slate-900 dark:hover:text-white transition-colors">Carbon & V2G</a>
                        <a href="#enterprise" className="hover:text-slate-900 dark:hover:text-white transition-colors">Enterprise</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Log In</a>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={onStart} className="shiny-cta group px-5 py-2 rounded-full text-sm font-semibold text-white">
                            <span className="relative z-10 flex items-center gap-2">
                                Launch Map
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                        </button>
                        <ModeToggle />
                    </div>
                </nav>
            </header>

            <main className="relative z-10 pt-28">
                <section className="min-h-[85vh] px-6 py-16 flex flex-col items-center justify-center text-center">
                    <div className="max-w-5xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-black/30 border border-black/10 dark:border-white/20 backdrop-blur-md mb-8">
                            <Sparkles className="h-3 w-3 text-accent" />
                            <span className="text-xs font-medium text-red-700 dark:text-red-100/90 tracking-wide">
                                EV Intelligence 2.0 is now live
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[1] mb-6 text-slate-950 dark:text-white">
                            Charging Intelligence
                            <span className="block text-accent text-glow">for the Future</span>
                        </h1>

                        <p className="text-lg md:text-2xl text-slate-700 dark:text-zinc-200 max-w-3xl mx-auto leading-relaxed mb-10">
                            EV.KH blends real-time infrastructure data with intuitive design to power your journey across Cambodia. One map, every network.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button onClick={onStart} className="shiny-cta group px-10 py-4 rounded-full text-lg font-semibold text-white">
                                <span className="relative z-10 flex items-center gap-2">
                                    Start Exploring
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                            <button className="px-8 py-4 rounded-full border border-black/15 dark:border-white/15 bg-white/80 dark:bg-white/5 text-slate-900 dark:text-zinc-100 hover:bg-white dark:hover:bg-white/10 transition-colors flex items-center gap-2">
                                <Github className="h-5 w-5" />
                                View on GitHub
                            </button>
                        </div>

                        <div className="mt-20">
                            <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-zinc-400 mb-6">
                                Integrated Infrastructure
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 text-sm md:text-base font-semibold text-slate-700 dark:text-zinc-200">
                                <span>PTT</span>
                                <span>TotalEnergies</span>
                                <span>Charge+</span>
                                <span>EV Energy Tech</span>
                                <span>BYD</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="px-6 py-24">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-14">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-950 dark:text-white mb-4 tracking-tighter">
                                The Unified OS for <span className="text-accent">EV Infrastructure</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-zinc-300">
                                Connecting fragmented charging networks, corporate fleets, and the grid into a single, intelligent platform.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-8 group hover:border-accent/30 transition-colors">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-3">Smart Forecasting</h3>
                                <p className="text-slate-600 dark:text-zinc-300 mb-6 text-sm">Historical usage patterns and real-time telemetry predict charger availability before you arrive.</p>
                                <span className="text-[10px] font-black tracking-widest uppercase text-accent inline-flex items-center gap-2">
                                    View Data <ArrowRight className="w-3 h-3" />
                                </span>
                            </div>
                            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-8 group hover:border-accent/30 transition-colors">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-3">Cross-Border Roaming</h3>
                                <p className="text-slate-600 dark:text-zinc-300 mb-6 text-sm">Seamless charging across Thailand, Vietnam, and Cambodia through our unified OCPI integration.</p>
                                <span className="text-[10px] font-black tracking-widest uppercase text-accent inline-flex items-center gap-2">
                                    Supported Networks <ArrowRight className="w-3 h-3" />
                                </span>
                            </div>
                            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-8 group hover:border-accent/30 transition-colors">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-3">Enterprise Reliability</h3>
                                <p className="text-slate-600 dark:text-zinc-300 mb-6 text-sm">SOC2 Type II compliant infrastructure with end-to-end encryption for payment routing and data.</p>
                                <span className="text-[10px] font-black tracking-widest uppercase text-accent inline-flex items-center gap-2">
                                    Security Specs <ArrowRight className="w-3 h-3" />
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="sustainability" className="px-6 py-24 border-y border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-white/2">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                                <Leaf className="h-3 w-3 text-emerald-500" />
                                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em]">Sustainability Data</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-slate-950 dark:text-white mb-8 tracking-tighter">
                                Drive Corporate <span className="text-emerald-500 text-glow">Sustainability</span>
                            </h2>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 shadow-xl border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0">
                                        <BarChart3 className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Automated ESG Reporting</h4>
                                        <p className="text-slate-600 dark:text-zinc-300 text-sm">Convert your fleet's EV mileage into verified carbon offset data to meet strict corporate ESG compliance requirements.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 shadow-xl border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0">
                                        <RefreshCw className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Grid Load Balancing (V2G)</h4>
                                        <p className="text-slate-600 dark:text-zinc-300 text-sm">Support the national grid during peak hours. Our platform enables bidirectional charging to reduce infrastructure strain and earn energy credits.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-tr from-emerald-500/20 via-accent/5 to-transparent rounded-full absolute -inset-10 blur-3xl opacity-50"></div>
                            <div className="relative bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden p-8">
                                <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/5 dark:border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                            <Leaf className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fleet Offset</p>
                                            <p className="text-xl font-black text-slate-900 dark:text-white">12,420.5 <span className="text-sm font-medium text-slate-400">KG CO2</span></p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Energy Credits</p>
                                        <p className="text-xl font-black text-slate-900 dark:text-white">$1,452.12</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-4/5 bg-emerald-500"></div>
                                    </div>
                                    <p className="text-[10px] font-medium text-slate-500 text-center uppercase tracking-widest">Quarterly ESG Target: 80% Achieved</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="enterprise" className="px-6 py-24">
                    <div className="max-w-7xl mx-auto flex flex-col items-center">
                        <div className="text-center mb-16 max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
                                <ShieldCheck className="h-3 w-3 text-accent" />
                                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">Enterprise Tools</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-slate-950 dark:text-white mb-6 tracking-tighter">
                                Scale Your <span className="text-accent">EV Operations</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-zinc-300">
                                The unified dashboard for logistics companies and corporate fleets. Manage vehicle assignments, charging costs, and analytics from a single interface.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                            <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-black/5 dark:border-white/10 hover:border-accent/20 transition-all">
                                <Users className="w-8 h-8 text-accent mb-6" />
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Fleet Management</h4>
                                <p className="text-slate-600 dark:text-zinc-300 text-sm">Centralized location tracking, state-of-charge monitoring, and automated driver assignments.</p>
                            </div>
                            <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-black/5 dark:border-white/10 hover:border-accent/20 transition-all">
                                <BarChart3 className="w-8 h-8 text-accent mb-6" />
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Cost Optimization</h4>
                                <p className="text-slate-600 dark:text-zinc-300 text-sm">Smart routing that prioritizes the most affordable energy rates and minimizes charging downtime.</p>
                            </div>
                            <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-black/5 dark:border-white/10 hover:border-accent/20 transition-all">
                                <ShieldCheck className="w-8 h-8 text-accent mb-6" />
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Unified Billing</h4>
                                <p className="text-slate-600 dark:text-zinc-300 text-sm">One monthly invoice for all charging networks. We handle the multi-operator settlements automatically.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 py-20 bg-accent/10 dark:bg-accent/20 border-y border-black/10 dark:border-white/10">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-2xl md:text-4xl font-semibold text-slate-950 dark:text-white leading-tight mb-6 text-glow">
                            "EV.KH has completely transformed how I travel across Cambodia. Finding a charger used to be a gamble, now it's a certainty."
                        </p>
                        <p className="text-slate-700 dark:text-zinc-200 font-semibold text-lg">Alex Morgan</p>
                        <p className="text-slate-600 dark:text-zinc-300 text-sm font-medium uppercase tracking-widest">Early Adopter • Tesla Model Y</p>
                    </div>
                </section>

                <section className="px-6 py-24">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-6xl font-bold text-slate-950 dark:text-white mb-6">
                            Ready to <span className="text-accent text-glow">Build the Future?</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-zinc-300 mb-10">
                            Join the network today and get early access to upcoming predictive charging features.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 justify-center" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full sm:flex-1 sm:max-w-md px-5 py-3 rounded-full bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/15 text-slate-900 dark:text-white outline-none focus:border-accent"
                            />
                            <button className="px-8 py-3 rounded-full bg-accent hover:bg-red-600 text-white font-semibold transition-colors">
                                Join Now
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="relative z-10 border-t border-black/10 dark:border-white/10 px-6 py-16 bg-white/60 dark:bg-black/40 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <div className="flex items-center gap-3 font-black text-2xl tracking-tight text-slate-950 dark:text-white mb-4">
                            <div className="w-5 h-5 bg-accent rounded-sm rotate-45"></div>
                            EV.KH
                        </div>
                        <p className="text-slate-600 dark:text-zinc-300 max-w-sm">
                            Pioneering the future of digital mobility in Cambodia with artificial intelligence.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">Platform</h4>
                        <ul className="space-y-3 text-slate-700 dark:text-zinc-300 text-sm">
                            <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Map Dashboard</a></li>
                            <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Public Data API</a></li>
                            <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">Company</h4>
                        <ul className="space-y-3 text-slate-700 dark:text-zinc-300 text-sm">
                            <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Legal</a></li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col md:row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                    <p>&copy; {new Date().getFullYear()} EV Cambodia AI Inc.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function AppContent() {
    const [view, setView] = useState<"hero" | "dashboard" | "map" | "fleet" | "wallet">("hero")

    if (view === "hero") {
        return <StartupLanding onStart={() => setView("dashboard")} />
    }

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: BarChart3 },
        { id: "map", label: "Network Map", icon: MapIcon },
        { id: "fleet", label: "Fleet Admin", icon: Users },
        { id: "wallet", label: "Energy Rewards", icon: CreditCard },
    ]

    return (
        <div className="h-screen w-screen flex bg-background text-text-primary transition-colors duration-200 overflow-hidden">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 border-r border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/40 backdrop-blur-3xl z-50">
                <div className="p-6">
                    <div className="flex items-center gap-3 font-black text-2xl tracking-tighter text-slate-950 dark:text-white cursor-pointer" onClick={() => setView("hero")}>
                        <div className="w-5 h-5 bg-accent rounded-sm rotate-45"></div>
                        EV.KH
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id as any)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group",
                                view === item.id
                                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                                    : "text-slate-500 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", view === item.id ? "text-white" : "text-slate-400 group-hover:text-accent")} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 mt-auto border-t border-black/10 dark:border-white/10">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Leaf className="h-4 w-4 text-emerald-500" />
                            <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Sustainability Tier 3</span>
                        </div>
                        <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-emerald-500"></div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between px-2">
                        <ModeToggle />
                        <button 
                            onClick={() => setView("hero")}
                            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-accent transition-colors"
                        >
                            Exit
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-t border-black/10 dark:border-white/10 z-[6000] px-6 py-3 flex items-center justify-between pb-safe">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id as any)}
                        className={cn(
                            "flex flex-col items-center gap-1 transition-all",
                            view === item.id ? "text-accent" : "text-slate-400"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="text-[8px] font-black uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
                    </button>
                ))}
            </div>

            <main className="flex-1 relative overflow-hidden h-full">
                {/* Mobile Header */}
                <header className="md:hidden absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-50 bg-white/50 dark:bg-black/50 backdrop-blur-xl border-b border-black/10 dark:border-white/10">
                    <div className="flex items-center gap-2 font-black tracking-tighter text-xl text-slate-950 dark:text-white" onClick={() => setView("hero")}>
                        <div className="w-4 h-4 bg-accent rounded-sm rotate-45"></div>
                        EV.KH
                    </div>
                    <ModeToggle />
                </header>

                <div className="h-full w-full pt-0 md:pt-0">
                    {view === "map" && <MapView />}
                    {view === "dashboard" && <ImpactDashboard onGoToMap={() => setView("map")} />}
                    {view === "fleet" && <FleetPortal />}
                    {view === "wallet" && <NexaWallet />}
                </div>
            </main>
        </div>
    )
}

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    )
}

export default App
