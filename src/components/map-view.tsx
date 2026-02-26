import { useState, useMemo, useEffect, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import { X, Zap, Shield, Search, Navigation, Leaf, Database } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/theme-provider'

function LiveStatsStrip() {
    return (
        <div className="flex items-center gap-4 px-4 py-3 bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5 overflow-x-auto no-scrollbar whitespace-nowrap">
            <div className="flex items-center gap-2">
                <Leaf className="w-3 h-3 text-emerald-500" />
                <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">104 Stations</span>
            </div>
            <div className="w-[1px] h-3 bg-black/10 dark:bg-white/10" />
            <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-red-500 dark:text-white" />
                <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">56% Green Grid</span>
            </div>
            <div className="w-[1px] h-3 bg-black/10 dark:bg-white/10" />
                        <div className="flex items-center gap-2">
                            <Database className="w-3 h-3 text-red-500 dark:text-white" />
                            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">Source: MEF 2025</span>
                        </div>
        </div>
    )
}

// Professional Red-Noir Markers
const createCustomIcon = (isSelected: boolean, theme: 'light' | 'dark') => {
    return L.divIcon({
        html: `
            <div class="relative flex items-center justify-center transition-all duration-300 ${isSelected ? 'scale-125 -translate-y-2' : 'hover:scale-110'}">
                <div class="w-10 h-10 rounded-2xl ${theme === 'dark' ? 'bg-black/80' : 'bg-white/90'} backdrop-blur-xl border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'} shadow-2xl flex items-center justify-center ${isSelected ? 'border-accent shadow-accent/40' : ''}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${isSelected ? '#ef233c' : (theme === 'dark' ? 'white' : '#1a0505')}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m13 2-2 10h3L11 22l2-10h-3l2-10z"/>
                    </svg>
                </div>
                ${isSelected ? '<div class="absolute -bottom-2 w-1.5 h-4 bg-accent rounded-full opacity-50 blur-[2px]"></div>' : ''}
            </div>`,
        className: 'custom-leaflet-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    })
}

function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap()
    useEffect(() => {
        // Fix for Leaflet not detecting container size on mount/view switch
        setTimeout(() => {
            map.invalidateSize()
        }, 100)
        
        if (center) {
            map.flyTo(center, zoom, { duration: 1.5, easeLinearity: 0.25 })
        }
    }, [center, zoom, map])
    return null
}

interface Station {
    id: string
    name: string
    operator: string
    connectors: string[]
    operation_time: string
    coordinates: [number, number]
    address?: string
}

function LocateMeButton() {
    const map = useMap()
    const handleLocate = useCallback(() => {
        map.locate().on('locationfound', (e) => {
            map.flyTo(e.latlng, 16)
        })
    }, [map])

    return (
        <button 
            onClick={handleLocate}
            aria-label="Locate me"
            className="w-12 h-12 bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-full shadow-2xl flex items-center justify-center text-slate-900 dark:text-white hover:scale-105 active:scale-95 transition-all"
        >
            <Navigation className="w-5 h-5" />
        </button>
    )
}

export function MapView({ showSidebar = true }: { showSidebar?: boolean }) {
    const { theme } = useTheme()
    const [stations, setStations] = useState<Station[]>([])
    const [selectedStation, setSelectedStation] = useState<Station | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        fetch('/ev_stations_odc_2025.json')
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                if (!data || !data.features) {
                    console.error('Invalid data format:', data);
                    setStations([]);
                    return;
                }
                const flattened = data.features.map((f: any, index: number) => {
                    const props = f.properties || {}
                    const name = props['location name'] || 'Unknown Station'
                    let operator = 'Independent'
                    if (name.includes('PTT')) operator = 'PTT'
                    else if (name.includes('Total')) operator = 'Total Energies'
                    else if (name.includes('Charge+')) operator = 'Charge+'
                    else if (name.includes('Energy Tech')) operator = 'EV Energy Tech'
                    else if (name.includes('BYD')) operator = 'BYD'

                    const coords = f.geometry?.coordinates
                    const lat = coords && coords[1] ? coords[1] : 11.55
                    const lng = coords && coords[0] ? coords[0] : 104.91

                    return {
                        id: `st-${index}`,
                        name,
                        operator,
                        connectors: (props['plug types'] || 'Type 2').split('/').map((s: string) => s.trim()),
                        operation_time: props['operation time'] || '24/7',
                        coordinates: [lat, lng],
                        address: props['location'] || 'Cambodia'
                    }
                })
                setStations(flattened)
                setIsLoading(false)
            })
            .catch(err => {
                console.error('Failed to fetch stations:', err);
                setIsLoading(false);
            })
    }, [])

    const filteredStations = useMemo(() => {
        return stations.filter(s =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.operator.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [stations, searchQuery])

    const tileUrl = theme === 'light'
        ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

    return (
        <div className="relative w-full h-full flex flex-col md:flex-row bg-slate-50 dark:bg-[#050505]">
            {isLoading && (
                <div className="absolute inset-0 z-[2000] bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                    <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
                    <p className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400">Initializing Network Map...</p>
                </div>
            )}
            {/* Sidebar Search & List */}
            {showSidebar && (
                <div className="w-full md:w-96 h-1/3 md:h-full bg-white dark:bg-black/40 backdrop-blur-3xl border-r border-black/10 dark:border-white/10 z-10 flex flex-col overflow-hidden">
                    <LiveStatsStrip />
                    <div className="p-6 border-b border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-xs font-black text-accent uppercase tracking-[0.3em]">Network Intelligence</span>
                        </div>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-zinc-500 group-focus-within:text-accent transition-colors" />
                            <input
                                type="text"
                                aria-label="Search stations by name or operator"
                                placeholder="Search the Kingdom's network..."
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl text-sm font-bold focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-600"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-40 gap-4">
                                <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Scanning Nodes...</span>
                            </div>
                        ) : filteredStations.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 gap-2 px-8 text-center">
                                <Search className="w-8 h-8 text-slate-300 mb-2" />
                                <span className="text-sm font-bold text-slate-500">No nodes found in this sector.</span>
                                <button onClick={() => setSearchQuery('')} className="text-xs font-black text-accent uppercase tracking-widest mt-2 hover:underline">Reset Search</button>
                            </div>
                        ) : (
                            filteredStations.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => setSelectedStation(s)}
                                    aria-label={`Select station ${s.name}`}
                                    className={cn(
                                        "w-full p-5 text-left rounded-[1.5rem] transition-all group relative overflow-hidden border",
                                        selectedStation?.id === s.id 
                                            ? "bg-accent text-white border-accent shadow-xl shadow-accent/20 scale-[0.98]" 
                                            : "bg-white dark:bg-white/5 text-slate-900 dark:text-white border-black/5 dark:border-white/5 hover:border-accent/30 hover:bg-slate-50 dark:hover:bg-white/10"
                                    )}
                                >
                                    <div className="relative z-10">
                                        <p className="font-black text-sm uppercase tracking-tight truncate leading-none mb-2">{s.name.replace('Station', '').replace('EV', '')}</p>
                                        <div className="flex items-center justify-between">
                                            <p className={cn("text-xs font-bold uppercase tracking-widest", selectedStation?.id === s.id ? "text-white/80" : "text-slate-500 dark:text-zinc-500")}>
                                                {s.operator} • {s.connectors[0]}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter",
                                                    s.connectors[0].includes('GB-T') ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                                                )}>
                                                    {s.connectors[0]}
                                                </div>
                                                <div className={cn("w-1.5 h-1.5 rounded-full", selectedStation?.id === s.id ? "bg-white" : "bg-emerald-500")} />
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Map Area */}
            <div className="flex-1 relative overflow-hidden min-h-[400px]">
                <MapContainer
                    key={theme}
                    center={[11.55, 104.91]}
                    zoom={13}
                    style={{ height: '100%', width: '100%', zIndex: 0 }}
                    zoomControl={false}
                >
                    <MapController center={selectedStation?.coordinates || [11.55, 104.91]} zoom={selectedStation ? 16 : 13} />
                    <TileLayer 
                        url={tileUrl} 
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    {filteredStations.map(s => (
                        <Marker
                            key={s.id}
                            position={s.coordinates}
                            icon={createCustomIcon(selectedStation?.id === s.id, theme as 'light' | 'dark')}
                            eventHandlers={{ click: () => setSelectedStation(s) }}
                        >
                            <Popup closeButton={false} className="red-noir-popup">
                                <div className="p-5 min-w-[260px] bg-white dark:bg-black/95 backdrop-blur-2xl rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-black text-xl text-slate-950 dark:text-white uppercase tracking-tighter leading-none mb-1">{s.name.replace('Station', '').replace('EV', '')}</h3>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Active Node</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 mb-6 leading-relaxed uppercase tracking-tight">{s.address}</p>
                                    
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-2xl border border-black/5 dark:border-white/10">
                                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Schedule</p>
                                            <p className="text-sm font-black text-slate-900 dark:text-white leading-none truncate">{s.operation_time}</p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-2xl border border-black/5 dark:border-white/10">
                                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Interface</p>
                                            <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{s.connectors[0]}</p>
                                        </div>
                                    </div>
                                    
                                    <button className="w-full py-4 bg-accent text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-accent/20 hover:bg-red-600 transition-all active:scale-95">
                                        Initialize Charge
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Floating Map Actions */}
                <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-3">
                    <a 
                        href="mailto:demo@ev.kh" 
                        className="px-6 py-3 bg-accent text-white rounded-full font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
                    >
                        Book Demo
                    </a>
                    <LocateMeButton />
                </div>

                {/* Mobile Detail Overlay */}
                {selectedStation && (
                    <div className="md:hidden absolute bottom-6 inset-x-6 z-[1000] bg-white dark:bg-black/95 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl p-8 border border-black/10 dark:border-white/10 animate-sheet-up">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="font-black text-2xl text-slate-950 dark:text-white uppercase tracking-tighter leading-none mb-2">{selectedStation.name.replace('Station', '').replace('EV', '')}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-black text-accent uppercase tracking-widest">{selectedStation.operator}</span>
                                    <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">{selectedStation.connectors[0]}</span>
                                </div>
                            </div>
                            <button aria-label="Close details" onClick={() => setSelectedStation(null)} className="p-3 bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                <X className="h-5 w-5 text-slate-900 dark:text-white" />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                                <Zap className="h-5 w-5 text-accent dark:text-white" />
                                <span className="text-xs font-black uppercase tracking-tighter text-slate-950 dark:text-white">120kW</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                                <Shield className="h-5 w-5 text-accent dark:text-white" />
                                <span className="text-xs font-black uppercase tracking-tighter text-slate-950 dark:text-white">Secure</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-tighter text-slate-950 dark:text-white">Ready</span>
                            </div>
                        </div>
                        
                        <button className="w-full py-5 bg-accent text-white font-black uppercase tracking-[0.3em] rounded-[1.5rem] shadow-2xl shadow-accent/20 active:scale-95 transition-all">
                            Initialize Session
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
