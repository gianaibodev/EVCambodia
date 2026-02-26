import { useState, useEffect, useRef } from "react"
import { BarChart3, Globe, Database, Info, ShieldCheck, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

function AnimatedBar({ value, max, label, sublabel, colorClass = "bg-accent" }: { value: number, max: number, label: string, sublabel?: string, colorClass?: string }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth((value / max) * 100), 200)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, max])

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-white/50">{label}</p>
          {sublabel && <p className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-tight">{sublabel}</p>}
        </div>
        <p className="text-sm font-black text-slate-900 dark:text-white">{value.toLocaleString()}{typeof value === 'number' && value <= 100 && value > 0 ? '%' : ''}</p>
      </div>
      <div className="h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
        <div 
          className={cn("h-full transition-all duration-1000 ease-out rounded-full", colorClass)}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

export function DataIntelligence() {
  const [wbData, setWbData] = useState<any>(null)
  const [ieaData, setIeaData] = useState<any>(null)
  const [stationsCount, setStationsCount] = useState(0)

  useEffect(() => {
    Promise.all([
      fetch('/wb_cambodia_energy.json').then(r => r.json()),
      fetch('/iea_ev_context.json').then(r => r.json()),
      fetch('/ev_stations_odc_2025.json').then(r => r.json())
    ]).then(([wb, iea, stations]) => {
      setWbData(wb)
      setIeaData(iea)
      setStationsCount(stations.features.length)
    })
  }, [])

  if (!wbData || !ieaData) return null

  return (
    <section id="data" className="relative bg-white dark:bg-[#050505] py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <Database className="h-3 w-3 text-accent dark:text-white" />
              <span className="text-xs font-black text-white/70 uppercase tracking-[0.2em]">Open Data Dashboard</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tighter leading-none mb-6">
              Real-time <span className="text-accent dark:text-white">Network Data</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-zinc-400 leading-relaxed">
              We provide a clear view of Cambodia's charging network. Our data helps drivers, businesses, and the government make better decisions about energy.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <a href="https://data.worldbank.org" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest">Source</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight">World Bank</span>
            </a>
            <a href="https://opendevelopmentcambodia.net" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest">Source</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight">ODC / MEF</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel 1: Grid Evolution */}
          <div className="bg-slate-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 flex flex-col">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent dark:text-white">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Grid Evolution</h3>
                <p className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">Electrification Trend</p>
              </div>
            </div>

            <div className="space-y-8 mb-12">
              <AnimatedBar 
                label="Current Electricity Access" 
                sublabel="World Bank 2023"
                value={95.0} 
                max={100} 
                colorClass="bg-emerald-500"
              />
              <AnimatedBar 
                label="Baseline Access (2012)" 
                sublabel="A decade of progress"
                value={42.3} 
                max={100} 
                colorClass="bg-slate-300 dark:bg-zinc-700"
              />
              <AnimatedBar 
                label="Renewable Grid Output" 
                sublabel="Energy Independence"
                value={wbData.indicators.renewable_electricity.data[0].value} 
                max={100} 
                colorClass="bg-accent"
              />
            </div>

            <div className="mt-auto pt-8 border-t border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-500 mb-4">
                <Info className="w-3 h-3" />
                <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Contextual Insight</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium leading-relaxed uppercase tracking-tight">
                Cambodia has achieved one of the world's fastest electrification rates, jumping from 42% to 95% access in just 11 years.
              </p>
            </div>
          </div>

          {/* Panel 2: Infrastructure Integrity */}
          <div className="bg-slate-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 flex flex-col">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent dark:text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Station Registry</h3>
                <p className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">Verified Infrastructure</p>
              </div>
            </div>

            <div className="space-y-8 mb-12">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-white dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                  <p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Official MEF</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stationsCount}</p>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tight">Stations</p>
                </div>
                <div className="p-4 bg-white dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                  <p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-2">OSM Mapped</p>
                  <p className="text-3xl font-black text-slate-300 dark:text-zinc-700 tracking-tighter">31</p>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-tight">Verified</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-2">Plug Type Distribution</p>
                <div className="flex h-4 w-full rounded-full overflow-hidden bg-black/5 dark:bg-white/5">
                  <div className="h-full bg-accent w-[52%]" title="GB-T/CCS2 Combo: 54"></div>
                  <div className="h-full bg-red-900 w-[43%]" title="GB-T Only: 45"></div>
                  <div className="h-full bg-slate-200 dark:bg-zinc-800 w-[5%]" title="CCS2 / Other: 5"></div>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-[10px] font-black text-slate-600 dark:text-white/70 uppercase tracking-tighter">GB-T/CCS2 (52%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-900" />
                    <span className="text-[10px] font-black text-slate-600 dark:text-white/70 uppercase tracking-tighter">GB-T (43%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-500 mb-4">
                <Globe className="w-3 h-3" />
                <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Transparency</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium leading-relaxed uppercase tracking-tight">
                Our platform tracks every government-registered charger (MEF 2025) while cross-referencing with open-source OSM data for accuracy.
              </p>
            </div>
          </div>

          {/* Panel 3: Regional Velocity */}
          <div className="bg-slate-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 flex flex-col">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Regional Velocity</h3>
                <p className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest">Market Comparison</p>
              </div>
            </div>

            <div className="space-y-8 mb-12">
              <AnimatedBar 
                label="Vietnam EV Sales Share" 
                sublabel="IEA 2023"
                value={15.0} 
                max={20} 
                colorClass="bg-slate-300 dark:bg-zinc-700"
              />
              <AnimatedBar 
                label="Thailand EV Sales Share" 
                sublabel="Regional Leader"
                value={9.0} 
                max={20} 
                colorClass="bg-slate-300 dark:bg-zinc-700"
              />
              <AnimatedBar 
                label="Cambodia EV Sales Share" 
                sublabel="Early Adoption"
                value={3.5} 
                max={20} 
                colorClass="bg-accent"
              />
            </div>

            <div className="mt-auto pt-8 border-t border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-500 mb-4">
                <Info className="w-3 h-3" />
                <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Forward Outlook</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium leading-relaxed uppercase tracking-tight">
                IEA projects global EV stock to hit 40M+ by end of 2024. Cambodia is positioned to capture this momentum with rapid infrastructure growth.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-black/10 dark:border-white/10">
          <div className="flex flex-wrap justify-center gap-6">
            <img src="https://img.shields.io/badge/Data-World_Bank-red?style=flat-square" alt="World Bank Data" className="h-5 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
            <img src="https://img.shields.io/badge/Registry-MEF_Cambodia-red?style=flat-square" alt="MEF Cambodia Registry" className="h-5 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
            <img src="https://img.shields.io/badge/Outlook-IEA_2024-red?style=flat-square" alt="IEA Outlook" className="h-5 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
            <img src="https://img.shields.io/badge/Open-OSM_Mapped-red?style=flat-square" alt="OSM Mapped" className="h-5 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
          </div>
          <p className="text-[10px] font-black text-slate-400 dark:text-zinc-600 uppercase tracking-[0.3em] text-center md:text-right">
            Verifiable Public Intelligence Engine • v1.2
          </p>
        </div>
      </div>
    </section>
  )
}
