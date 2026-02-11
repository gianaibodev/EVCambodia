import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"
import { MapView } from "@/components/map-view"
import { ArrowRight, Zap } from "lucide-react"

const ASCII_LOGO = `
   ______   __     __    __  __   __  __    
  /\\  ___\\ /\\ \\   /\\ \\  /\\ \\/\\ \\ /\\ \\/\\ \\   
  \\ \\  __\\ \\ \\ \\__\\ \\ \\ \\ \\ \\_\\ \\\\ \\ \\_\\ \\  
   \\ \\_____\\\\ \\_____\\\\ \\_\\ \\ \\_____\\\\ \\_____\\ 
    \\/_____/ \\/_____/ \\/_/  \\/_____/ \\/_____/ 
`.trim();

function Hero({ onStart }: { onStart: () => void }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 space-y-8 animate-in fade-in duration-1000">
            <div className="space-y-4 max-w-4xl">
                <pre className="text-[6px] md:text-[10px] font-mono leading-none text-accent mb-8 select-none animate-in zoom-in-50 duration-1000">
                    {ASCII_LOGO}
                </pre>
                <div className="flex items-center justify-center gap-3 text-accent font-semibold tracking-wider uppercase text-sm">
                    <Zap className="h-5 w-5 fill-current" />
                    <span>Billion-Dollar Infrastructure</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-text-primary">
                    EV Charging Map <br className="hidden md:block" />
                    of Cambodia
                </h1>
                <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
                    Every public EV charger. All networks. One map. <br className="hidden md:block" />
                    Find GB/T, CCS2, and Type 2 chargers without installing an app.
                </p>
            </div>

            <button
                onClick={onStart}
                className="group relative flex items-center gap-3 bg-accent text-white px-10 py-5 rounded-full text-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-accent/40"
            >
                View Live Map
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="pt-24 space-y-6">
                <p className="text-xs font-bold text-text-secondary uppercase tracking-[0.2em] opacity-40">
                    Independent Public Data Tool
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                    <span className="font-bold text-xl tracking-tighter">MEF</span>
                    <span className="font-bold text-xl tracking-tighter uppercase">Open Development Cambodia</span>
                    <span className="font-bold text-xl tracking-tighter uppercase">Open Charge Map</span>
                </div>
            </div>
        </div>
    )
}

function AppContent() {
    const [view, setView] = useState<"hero" | "map">("hero")

    if (view === "hero") {
        return (
            <div className="bg-background text-text-primary transition-colors duration-200">
                <header className="fixed top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center z-50 bg-white/5 backdrop-blur-2xl border-b border-white/5">
                    <div className="font-black tracking-tighter text-3xl flex items-center gap-2">
                        EV.KH
                    </div>
                    <ModeToggle />
                </header>
                <Hero onStart={() => setView("map")} />

                <footer className="fixed bottom-0 left-0 right-0 p-8 text-center text-[10px] text-text-secondary uppercase tracking-widest opacity-40 pointer-events-none md:block hidden">
                    Designed for Drivers • High Contrast Infrastructure Grade
                </footer>
            </div>
        )
    }
    return (
        <div className="h-screen w-screen relative bg-background text-text-primary transition-colors duration-200 overflow-hidden">
            <header className="absolute top-0 left-0 right-0 p-4 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-2xl z-50">
                <div className="font-black tracking-tighter text-xl flex items-center gap-2 cursor-pointer" onClick={() => setView("hero")}>
                    EV.KH
                </div>
                <ModeToggle />
            </header>

            <main className="h-full w-full relative">
                <MapView />
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
