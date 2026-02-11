import { useState, useMemo, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import { X, Filter, Navigation, Zap, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/theme-provider'

// Fix for Leaflet icons - Premium Glassmorphic Design
const createCustomIcon = (isSelected: boolean, isOnline: boolean, name: string) => {
    return L.divIcon({
        html: `
            <div class="relative group">
                ${isOnline ? `<div class="absolute inset-0 rounded-full animate-ping opacity-20" style="background-color: ${isSelected ? '#3b82f6' : '#10b981'}"></div>` : ''}
                <div class="relative w-8 h-8 flex items-center justify-center rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 transform ${isSelected ? 'scale-125 -translate-y-2' : 'hover:scale-110'}" 
                     style="background: ${isSelected ? 'rgba(59, 130, 246, 0.8)' : 'rgba(15, 23, 42, 0.7)'}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m13 2-2 10h3L11 22l2-10h-3l2-10z"/>
                    </svg>
                    
                    ${isSelected ? `
                        <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/20 whitespace-nowrap px-2 py-0.5 rounded text-[8px] font-black text-white uppercase tracking-tighter shadow-2xl animate-in zoom-in-50 duration-200">
                            ${name.split('|')[0].trim()}
                        </div>
                    ` : ''}
                </div>
                <div class="mt-1 mx-auto w-1 h-3 rounded-full opacity-40" style="background: ${isSelected ? '#3b82f6' : 'white'}"></div>
            </div>`,
        className: 'custom-leaflet-icon',
        iconSize: [40, 60],
        iconAnchor: [20, 50],
        popupAnchor: [0, -50]
    })
}

// Distance calculation (Haversine formula)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

const formatDistance = (km: number) => {
    if (km < 1) return `${Math.round(km * 1000)}m`
    return `${km.toFixed(1)}km`
}

interface Station {
    id: string
    name: string
    operator: string
    connectors: string[]
    operation_time: string
    coordinates: [number, number]
    distance?: number
}

// Local High-Quality Previews (Zero external load fail)
const PREVIEW_IMAGES = [
    "/ev_station_1.png",
    "/ev_station_2.png",
    "/ev_station_3.png"
]

function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap()
    useEffect(() => {
        if (center) {
            const current = map.getCenter()
            const diff = Math.abs(current.lat - center[0]) + Math.abs(current.lng - center[1])
            // Only fly if target is meaningfully different from current view
            if (diff > 0.001) {
                map.flyTo(center, zoom, { duration: 1.5 })
            }
        }
    }, [center, zoom, map])
    return null
}

function MapEventsHandler({ onCenterChange }: { onCenterChange: (lat: number, lng: number) => void }) {
    useMapEvents({
        moveend: (e) => {
            const center = e.target.getCenter()
            onCenterChange(center.lat, center.lng)
        }
    })
    return null
}

export function MapView() {
    const { theme, setTheme } = useTheme()
    const [stations, setStations] = useState<Station[]>([])
    const [selectedStation, setSelectedStation] = useState<Station | null>(null)
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
    const [mapCenter, setMapCenter] = useState<[number, number]>([11.55, 104.91])
    const [isLocating, setIsLocating] = useState(false)
    const [filters, setFilters] = useState({ connectors: [] as string[], operators: [] as string[] })
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const carouselRef = useRef<HTMLDivElement>(null)

    // Load data
    useEffect(() => {
        setIsLoading(true)
        fetch('/chargers_real.json')
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(data => {
                const flattened = data.features.map((f: any, index: number) => {
                    const props = f.properties
                    const name = props['Location Name'] || 'Unknown Station'
                    let operator = 'Other'
                    if (name.includes('PTT')) operator = 'PTT'
                    else if (name.includes('Total')) operator = 'Total Energies'
                    else if (name.includes('BZ')) operator = 'EV Energy Tech'
                    else if (name.includes('BYD')) operator = 'BYD'
                    else if (name.includes('ZEEKR')) operator = 'ZEEKR'
                    else if (name.includes('Charge+')) operator = 'Charge+'

                    return {
                        id: `station-${index}`,
                        name,
                        operator,
                        connectors: (props['Plug Types'] || 'Unknown').split('/').map((s: string) => s.trim()),
                        operation_time: props['Operation Time'] || 'Contact station',
                        coordinates: [f.geometry.coordinates[1], f.geometry.coordinates[0]]
                    }
                })
                setStations(flattened)
                setIsLoading(false)
            })
            .catch(() => {
                setError('Failed to load data.')
                setIsLoading(false)
            })
    }, [])

    const handleLocateMe = () => {
        setIsLocating(true)
        if (!navigator.geolocation) {
            setError("Geolocation not supported.")
            setIsLocating(false)
            return
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const loc: [number, number] = [pos.coords.latitude, pos.coords.longitude]
                setUserLocation(loc)
                setMapCenter(loc)
                setIsLocating(false)

                // Auto-scroll carousel to start
                if (carouselRef.current) {
                    carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' })
                }
            },
            () => {
                setError("Location access denied.")
                setIsLocating(false)
            }
        )
    }

    const availableOperators = useMemo(() => {
        const ops = new Set(stations.map(s => s.operator))
        return Array.from(ops).sort()
    }, [stations])

    const processedStations = useMemo(() => {
        const refPoint = userLocation || mapCenter
        let result = stations.map(s => ({
            ...s,
            distance: calculateDistance(refPoint[0], refPoint[1], s.coordinates[0], s.coordinates[1])
        })).filter(s => {
            const connectorMatch = filters.connectors.length === 0 || s.connectors.some(c => filters.connectors.includes(c))
            const operatorMatch = filters.operators.length === 0 || filters.operators.includes(s.operator)
            return connectorMatch && operatorMatch
        })

        result.sort((a, b) => (a.distance || 0) - (b.distance || 0))
        return result
    }, [stations, filters, userLocation, mapCenter])

    const tileUrl = useMemo(() =>
        theme === 'light'
            ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
            : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        , [theme])

    const isMobileDevice = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    return (
        <div className="relative w-full h-[100dvh] flex flex-col overflow-hidden bg-background">
            {/* Main Map View */}
            <div className="flex-1 relative w-full h-full">
                {error && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[6000] bg-red-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl animate-in slide-in-from-top duration-300">
                        {error}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setError(null)} />
                    </div>
                )}

                {isLoading && (
                    <div className="absolute inset-0 z-[7000] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex flex-col items-center justify-center gap-4 transition-all duration-500">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                            <Zap className="absolute inset-0 m-auto h-6 w-6 text-blue-500 animate-pulse" />
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">EV.KH</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mt-1">Initializing Network</span>
                        </div>
                    </div>
                )}

                {/* Floating Map Actions */}
                <div className="absolute top-24 right-6 z-[2000] flex flex-col gap-3">
                    <button
                        onClick={handleLocateMe}
                        className={cn(
                            "w-12 h-12 flex items-center justify-center backdrop-blur-3xl border rounded-full shadow-2xl transition-all active:scale-90 hover:scale-105 group relative",
                            userLocation ? "bg-blue-500 border-blue-400 text-white" : "bg-white/80 dark:bg-white/10 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black"
                        )}
                        title="Find Nearest"
                    >
                        <Navigation className={cn("h-5 w-5", isLocating && "animate-spin")} />
                    </button>

                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-white/10 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-full shadow-2xl text-slate-900 dark:text-white active:scale-90 transition-all hover:scale-105"
                        title="Filters"
                    >
                        <Filter className="h-5 w-5" />
                    </button>
                </div>

                <MapContainer
                    center={[11.55, 104.91]}
                    zoom={12}
                    className="w-full h-full z-0"
                    zoomControl={false}
                >
                    <MapEventsHandler onCenterChange={(lat, lng) => setMapCenter([lat, lng])} />
                    <MapController center={selectedStation?.coordinates || mapCenter} zoom={selectedStation ? 16 : 12} />
                    <TileLayer url={tileUrl} />

                    {processedStations.map(s => (
                        <Marker
                            key={s.id}
                            position={s.coordinates}
                            icon={createCustomIcon(s.id === selectedStation?.id, true, s.name)}
                            eventHandlers={{ click: () => setSelectedStation(s) }}
                        >
                            {!isMobileDevice && selectedStation?.id === s.id && (
                                <Popup closeButton={false} className="glass-popup">
                                    <StationDetailContent station={s} />
                                </Popup>
                            )}
                        </Marker>
                    ))}
                    {userLocation && <Marker position={userLocation} icon={createCustomIcon(false, true, "You")} />}
                </MapContainer>
            </div>

            {/* Premium Header - Stabilized Layout */}
            <header className="fixed top-0 inset-x-0 z-[5000] p-4 md:p-6 flex items-start justify-between pointer-events-none">
                <div className="flex flex-col pt-safe pointer-events-auto">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-none scale-y-95">EV.KH</h1>
                    <div className="flex items-center gap-1.5 mt-0.5 md:mt-1">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-500 dark:text-blue-400">NEXA Network</span>
                    </div>
                </div>

                <div className="flex gap-2 pointer-events-auto pt-safe">
                    <div className="flex p-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl">
                        <button onClick={() => setTheme('light')} className={cn("p-2 rounded-xl transition-all active:scale-95", theme === 'light' ? "bg-white text-blue-600 shadow-md" : "text-slate-400")}><Sun className="h-4 w-4" /></button>
                        <button onClick={() => setTheme('dark')} className={cn("p-2 rounded-xl transition-all active:scale-95", theme === 'dark' ? "bg-white/10 text-white shadow-md" : "text-slate-400")}><Moon className="h-4 w-4" /></button>
                    </div>
                </div>
            </header>

            {/* Carousel Area */}
            {!selectedStation && (
                <div className="absolute bottom-0 inset-x-0 z-[2000] pb-safe animate-in fade-in slide-in-from-bottom duration-500 pointer-events-none">
                    <div className="flex justify-center mb-4">
                        <div className="px-4 py-1.5 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-full shadow-2xl flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white">
                                {processedStations.length} Nearby Stations
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        </div>
                    </div>

                    <div ref={carouselRef} className="flex gap-4 overflow-x-auto px-6 pb-8 scrollbar-hide snap-x pointer-events-auto">
                        {processedStations.map(s => (
                            <div key={s.id} className="snap-center">
                                <StationCarouselCard
                                    station={s}
                                    isSelected={false}
                                    onClick={() => setSelectedStation(s)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Filter Sidebar */}
            <div className={
                cn(
                    "fixed inset-y-0 right-0 z-[4000] w-full md:w-96 bg-slate-900/95 backdrop-blur-3xl shadow-2xl border-l border-white/10 p-6 flex flex-col gap-6 transition-transform duration-500",
                    isFilterOpen ? "translate-x-0" : "translate-x-full"
                )
            } >
                <div className="flex justify-between items-center border-b border-white/10 pb-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Refinement Matrix</h3>
                    <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="h-6 w-6 text-white" /></button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                    {/* Connector Types */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Charging Interface</p>
                        <div className="grid grid-cols-2 gap-3">
                            {['CCS2', 'Type 2', 'GB/T', 'Chademo'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setFilters(f => ({
                                            ...f,
                                            connectors: f.connectors.includes(type) ? f.connectors.filter(x => x !== type) : [...f.connectors, type]
                                        }))
                                    }}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all border",
                                        filters.connectors.includes(type)
                                            ? "bg-accent border-accent text-white shadow-lg scale-[1.02]"
                                            : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20"
                                    )}
                                >
                                    <ConnectorIcon type={type} className={cn("h-6 w-6", filters.connectors.includes(type) ? "text-white" : "text-slate-500")} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Operators */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Network Infrastructure</p>
                        <div className="flex flex-col gap-2">
                            {availableOperators.map(o => (
                                <button
                                    key={o}
                                    onClick={() => {
                                        setFilters(f => ({
                                            ...f,
                                            operators: f.operators.includes(o) ? f.operators.filter(x => x !== o) : [...f.operators, o]
                                        }))
                                    }}
                                    className={cn(
                                        "flex items-center justify-between px-5 py-4 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all border outline-none",
                                        filters.operators.includes(o)
                                            ? "bg-white text-black border-white shadow-lg"
                                            : "border-white/10 text-slate-400 hover:border-white/30 bg-white/5"
                                    )}
                                >
                                    {o}
                                    {filters.operators.includes(o) && <div className="w-2 h-2 rounded-full bg-accent" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full py-5 bg-accent text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-accent/90 active:scale-95 transition-all mt-auto"
                >
                    Apply Parameters
                </button>
            </div >

            {/* Mobile Bottom Sheet - Enhanced Swiping Transition */}
            {selectedStation && isMobileDevice && (
                <div className="fixed inset-0 z-[6000] pointer-events-none flex flex-col justify-end">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-auto animate-fade-in" onClick={() => setSelectedStation(null)} />
                    <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 rounded-t-[2.5rem] shadow-2xl overflow-hidden pointer-events-auto h-[82vh] flex flex-col animate-sheet-up pb-safe">
                        <div className="overflow-y-auto relative flex-1">
                            <div className="sticky top-0 inset-x-0 h-10 flex items-center justify-center z-[70] pointer-events-none">
                                <div className="w-12 h-1.5 bg-black/10 dark:bg-white/20 rounded-full" />
                            </div>
                            <div className="mt-[-2.5rem]">
                                <StationDetailContent
                                    station={selectedStation}
                                    isMobile={true}
                                    onClose={() => setSelectedStation(null)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}

// Extracted Content Component for Reuse
function StationDetailContent({ station, isMobile = false, onClose }: { station: Station, isMobile?: boolean, onClose?: () => void }) {
    const handleFavorite = (e: any) => {
        e.stopPropagation();
        const favorites = JSON.parse(localStorage.getItem('ev_favorites') || '[]');
        if (favorites.includes(station.id)) {
            localStorage.setItem('ev_favorites', JSON.stringify(favorites.filter((id: string) => id !== station.id)));
        } else {
            localStorage.setItem('ev_favorites', JSON.stringify([...favorites, station.id]));
        }
    };

    const isFav = JSON.parse(localStorage.getItem('ev_favorites') || '[]').includes(station.id);

    // Context-Aware Amenities Logic
    const getAmenities = () => {
        const name = station.name.toUpperCase();
        if (name.includes('PTT') || name.includes('TOTAL')) {
            return [
                { icon: '☕', label: 'Coffee Shop', desc: 'Amazon/Premium Coffee nearby' },
                { icon: '🚽', label: 'Clean Restrooms', desc: 'Standard gas station facilities' },
                { icon: '🛍️', label: 'Convenience Store', desc: '7-Eleven / Mart available' }
            ];
        }
        if (name.includes('MALL') || name.includes('SUPERMARKET') || name.includes('EXCHANGE') || name.includes('2004')) {
            return [
                { icon: '🛍️', label: 'Premium Shopping', desc: 'Station located near mall entry' },
                { icon: '📶', label: 'Hi-Speed WiFi', desc: 'Public mall network available' },
                { icon: '🍽️', label: 'Dining Area', desc: 'Food court within walking distance' }
            ];
        }
        return [
            { icon: '📶', label: 'Network Access', desc: 'Basic connectivity available' },
            { icon: '🚽', label: 'Restrooms', desc: 'Public facilities nearby' }
        ];
    };

    const amenities = getAmenities();

    return (
        <div className={cn(
            "flex flex-col relative transition-colors duration-300 shadow-none",
            isMobile
                ? "bg-white dark:bg-slate-900 h-full"
                : "bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl w-[320px]"
        )}>

            {/* Image Header */}
            <div className="h-56 relative group shrink-0">
                <img
                    src={PREVIEW_IMAGES[parseInt(station.id.split('-')[1]) % PREVIEW_IMAGES.length]}
                    className="w-full h-full object-cover"
                    alt="Station Preview"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Close Button UI (Requested) */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-30 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white active:scale-90 transition-all hover:bg-black/60 shadow-2xl"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}

                <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <h4 className="font-black text-2xl text-white uppercase tracking-tighter leading-none pr-12">{station.name.replace('Station', '').replace('EV', '')}</h4>
                        </div>
                        <div className="flex bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 px-2 py-0.5 rounded-full items-center gap-1.5 w-fit">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Available Now</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 space-y-6">

                {/* Info Grid - Optimized for Mobile Viewport */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-3 md:p-4 border border-slate-100 dark:border-white/5">
                        <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-0.5 md:mb-1">Max Power</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-none">120</span>
                            <span className="text-[9px] md:text-[10px] font-black text-blue-500">kW</span>
                        </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-3 md:p-4 border border-slate-100 dark:border-white/5 flex flex-col justify-center">
                        <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">Status</p>
                        <span className="text-[10px] font-black text-emerald-500 px-2 py-1 bg-emerald-500/10 rounded-lg w-fit">Operational</span>
                    </div>
                </div>

                {/* Amenities Section - Responsive Grid */}
                <div className="space-y-4">
                    <h5 className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Infrastructure & Comfort</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                        {amenities.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 md:gap-4 p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 group transition-all hover:border-blue-500/30">
                                <div className="text-xl md:text-2xl p-2 bg-white dark:bg-white/5 rounded-xl shadow-sm border border-slate-200 dark:border-white/5 group-hover:scale-105 transition-transform">
                                    {item.icon}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] md:text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{item.label}</span>
                                    <span className="text-[8px] md:text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-normal">{item.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Directions Section */}
                <div className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Navigation Handover</p>
                    <div className="flex gap-2 grid grid-cols-3">
                        <a href={`https://www.waze.com/ul?ll=${station.coordinates[0]},${station.coordinates[1]}&navigate=yes`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 bg-[#33CCFF]/5 hover:bg-[#33CCFF]/10 text-[#33CCFF] rounded-2xl active:scale-95 border border-[#33CCFF]/10 transition-all">
                            <Navigation className="h-6 w-6 mb-1" />
                            <span className="text-[8px] font-black uppercase tracking-widest">Waze</span>
                        </a>
                        <a href={`http://maps.apple.com/?daddr=${station.coordinates[0]},${station.coordinates[1]}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white rounded-2xl active:scale-95 border border-slate-200 dark:border-white/10 transition-all">
                            <div className="mb-1 text-2xl font-serif"></div>
                            <span className="text-[8px] font-black uppercase tracking-widest">Apple</span>
                        </a>
                        <a href={`https://www.google.com/maps/dir/?api=1&destination=${station.coordinates[0]},${station.coordinates[1]}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 bg-blue-500/5 hover:bg-blue-500/10 text-blue-500 rounded-2xl active:scale-95 border border-blue-500/10 transition-all">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 mb-1"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                            <span className="text-[8px] font-black uppercase tracking-widest">Google</span>
                        </a>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleFavorite}
                        className={cn(
                            "p-4 rounded-2xl border transition-all active:scale-95",
                            isFav ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400"
                        )}
                    >
                        <svg viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </button>
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: station.name,
                                    text: `Check out this EV charger at ${station.name}!`,
                                    url: window.location.href,
                                })
                            }
                        }}
                        className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        Share Station Location
                    </button>
                </div>
            </div>
        </div>
    );
}

const ConnectorIcon = ({ type, className }: { type: string, className?: string }) => {
    if (type.includes('CCS')) return <Zap className={cn("text-orange-400", className)} />
    if (type.includes('Type 2')) return <div className={cn("rounded-full border-2 border-blue-400", className)} />
    if (type.includes('GB/T')) return <div className={cn("rotate-45 border-2 border-emerald-400", className)} />
    return <Zap className={cn("text-text-secondary", className)} />
}

function StationCarouselCard({ station, isSelected, onClick }: { station: Station, isSelected: boolean, onClick: () => void }) {
    const imgIdx = parseInt(station.id.split('-')[1]) % PREVIEW_IMAGES.length

    // 3D Tilt Logic
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    return (
        <div
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "flex flex-col w-[300px] bg-white/5 backdrop-blur-2xl border transition-all cursor-pointer shadow-2xl relative overflow-hidden group rounded-[2rem]",
                isSelected
                    ? "border-accent/50 shadow-[0_0_50px_rgba(59,130,246,0.2)] bg-white/10"
                    : "border-white/10 hover:border-white/20 hover:bg-white/5"
            )}
            style={{ transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
        >
            {/* Animated Glow Gradient */}
            {isSelected && <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-accent/20 animate-pulse pointer-events-none" />}

            <div className="h-40 relative">
                <img
                    src={PREVIEW_IMAGES[imgIdx]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Preview"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute top-3 right-3 flex gap-2">
                    <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-black text-white uppercase tracking-widest border border-white/10 flex items-center gap-1.5 shadow-xl">
                        {station.operator === 'PTT' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                        {station.operator === 'Total Energies' && <div className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                        {station.operator}
                    </div>
                </div>

                {station.distance !== undefined && (
                    <div className="absolute top-3 left-3 bg-accent text-white px-3 py-1 rounded-lg text-[10px] font-black shadow-xl flex items-center gap-1">
                        <Navigation className="h-3 w-3" />
                        {formatDistance(station.distance)}
                    </div>
                )}

                <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="font-black text-xl text-white uppercase tracking-tighter leading-none mb-1 drop-shadow-md">
                        {station.name.replace('Station', '').replace('EV', '')}
                    </h4>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-400/10 backdrop-blur-sm px-2 py-0.5 rounded-full border border-emerald-400/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Online
                        </span>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                            {station.connectors.slice(0, 3).map((c, i) => (
                                <ConnectorIcon key={i} type={c} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
