import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight, Github, Zap, Map as MapIcon, Users, Leaf, ShieldCheck, Globe } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"
import { MapView } from "@/components/map-view"
import { DataIntelligence } from "@/components/data-intelligence"
import { FleetPortal } from "@/components/fleet/FleetPortal"

function StartupLanding({ onStart }: { onStart: () => void }) {
    return (
        <div className="bg-background text-text-primary transition-colors duration-500 min-h-screen relative overflow-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-white to-white dark:from-background dark:to-background"></div>
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
                        <a href="#data" className="hover:text-slate-900 dark:hover:text-white transition-colors">Open Data</a>
                        <a href="#enterprise" className="hover:text-slate-900 dark:hover:text-white transition-colors">Enterprise</a>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={onStart} className="shiny-cta group px-5 py-2 rounded-full text-sm font-semibold">
                            <span className="relative z-10 flex items-center gap-2 text-foreground">
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
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-red-700 dark:text-red-100/90 tracking-wide">
                                Smart Mobility OS is now live
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-6 text-slate-950 dark:text-white">
                            Infrastructure Grade Data
                            <span className="block text-accent dark:text-white">for the Kingdom</span>
                        </h1>

                        <p className="text-lg md:text-2xl text-slate-700 dark:text-zinc-200 max-w-3xl mx-auto leading-relaxed mb-10">
                            EV.KH connects every charging station and fleet into one simple platform. We provide the tools to power Cambodia's energy transition.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button onClick={onStart} className="shiny-cta group px-10 py-4 rounded-full text-lg font-semibold">
                                <span className="relative z-10 flex items-center gap-2 text-foreground">
                                    Open Live Map
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </span>
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
                                Everything in <span className="text-accent dark:text-white">One Place</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-zinc-300">
                                Connecting charging networks, corporate fleets, and the grid into a single, easy-to-use platform.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-8 group hover:border-accent/30 transition-colors">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent dark:text-white">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-3">Network Discovery</h3>
                                <p className="text-slate-600 dark:text-zinc-300 mb-6 text-sm">Real-time access to every government-registered and private charging node in Cambodia.</p>
                                <span className="text-xs font-black tracking-widest uppercase text-accent dark:text-white inline-flex items-center gap-2 cursor-pointer" onClick={onStart}>
                                    Open Network Map <ArrowRight className="w-3 h-3" />
                                </span>
                            </div>
                            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-8 group hover:border-accent/30 transition-colors">
                                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent dark:text-white">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-3">Data Intelligence</h3>
                                <p className="text-slate-600 dark:text-zinc-300 mb-6 text-sm">Verified energy statistics and infrastructure growth metrics from World Bank and MEF records.</p>
                                <a href="#data" className="text-xs font-black tracking-widest uppercase text-accent dark:text-white inline-flex items-center gap-2">
                                    Explore Observatory <ArrowRight className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Proof Numbers Bar */}
                <section className="px-6 py-12 border-y border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                    <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-12 md:gap-24 text-center">
                        <div className="group">
                            <p className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter group-hover:scale-110 transition-transform">104</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mt-2">Verified Stations (2025)</p>
                        </div>
                        <div className="group">
                            <p className="text-4xl md:text-5xl font-black text-emerald-500 tracking-tighter group-hover:scale-110 transition-transform">56.4%</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mt-2">Renewable Grid Mix (WB)</p>
                        </div>
                        <div className="group">
                            <p className="text-4xl md:text-5xl font-black text-accent tracking-tighter group-hover:scale-110 transition-transform">95%</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mt-2">Population Electrification</p>
                        </div>
                    </div>
                </section>

                <DataIntelligence />

                <section id="enterprise" className="px-6 py-24 bg-white/50 dark:bg-zinc-900/20">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
                                <ShieldCheck className="h-3 w-3 text-accent dark:text-white" />
                                <span className="text-xs font-bold text-accent dark:text-white uppercase tracking-[0.2em]">Enterprise Fleet Solutions</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-slate-950 dark:text-white mb-8 tracking-tighter leading-tight">
                                Scale Your <span className="text-accent dark:text-white">EV Operations</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm hover:border-accent/20 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent dark:text-white">
                                    <Users className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-xl">Fleet OS Dashboard</h3>
                                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">A centralized command center to monitor vehicle charge levels and coordinate driver logistics across the network.</p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm hover:border-accent/20 transition-all">
                                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent dark:text-white">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-xl">Infrastructure Registry</h3>
                                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">Direct synchronization with national energy records to ensure your fleet is powered by verified infrastructure.</p>
                            </div>
                        </div>
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
                            Powering Cambodia's energy transition with real-time data and smart charging solutions.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-white/80 mb-4">Platform</h4>
                        <ul className="space-y-3 text-slate-700 dark:text-zinc-300 text-sm">
                            <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Map Dashboard</a></li>
                            <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Public Data API</a></li>
                            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2"><Github className="w-3 h-3" /> GitHub</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent dark:text-white/80 mb-4">Company</h4>
                        <ul className="space-y-3 text-slate-700 dark:text-zinc-300 text-sm">
                            <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Legal</a></li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs uppercase tracking-widest text-slate-500 dark:text-zinc-400">
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
    const [view, setView] = useState<"hero" | "map" | "fleet">("hero")

    if (view === "hero") {
        return <StartupLanding onStart={() => setView("map")} />
    }

    const navItems = [
        { id: "hero", label: "Home", icon: Globe },
        { id: "map", label: "Network Map", icon: MapIcon },
        { id: "fleet", label: "Fleet OS", icon: Users },
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
                            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Sustainability Tier 3</span>
                        </div>
                        <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-emerald-500"></div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between px-2">
                        <ModeToggle />
                        <button 
                            onClick={() => setView("hero")}
                            className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-accent transition-colors"
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
                            view === item.id ? "text-accent dark:text-white" : "text-slate-400"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="text-xs font-black uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
                    </button>
                ))}
            </div>

            <main className="flex-1 relative overflow-hidden h-full flex flex-col">
                {/* Mobile Header - Improved for WCAG and Layout */}
                <header className="md:hidden sticky top-0 left-0 right-0 p-4 flex items-center justify-between z-50 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-sm">
                    <button 
                        className="flex items-center gap-2 font-black tracking-tighter text-xl text-slate-950 dark:text-white" 
                        onClick={() => setView("hero")}
                        aria-label="Back to Home"
                    >
                        <div className="w-4 h-4 bg-accent rounded-sm rotate-45"></div>
                        EV.KH
                    </button>
                    <ModeToggle />
                </header>

                <div className="flex-1 relative h-full w-full">
                    {view === "map" && <MapView />}
                    {view === "fleet" && <FleetPortal />}
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
