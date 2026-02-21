import { useState, useMemo, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import { X, Zap, Clock, Shield, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/theme-provider'

// Professional, clean markers
const createCustomIcon = (isSelected: boolean, operator: string) => {
    return L.divIcon({
        html: `
            <div class="relative flex items-center justify-center transition-transform duration-200 ${isSelected ? 'scale-125' : 'hover:scale-110'}">
                <div class="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 shadow-md flex items-center justify-center ${isSelected ? 'border-[#ef233c]' : 'border-slate-300 dark:border-slate-700'}">
                    <div class="w-2 h-2 rounded-full ${operator === 'PTT' ? 'bg-blue-600' : operator === 'Total Energies' ? 'bg-red-600' : 'bg-slate-900 dark:bg-white'}"></div>
                </div>
                ${isSelected ? '<div class="absolute -bottom-1 w-2 h-2 bg-[#ef233c] rotate-45 rounded-sm"></div>' : ''}
            </div>`,
        className: 'custom-leaflet-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    })
}

function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap()
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom, { duration: 1 })
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

export function MapView() {
    const { theme } = useTheme()
    const [stations, setStations] = useState<Station[]>([])
    const [selectedStation, setSelectedStation] = useState<Station | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        fetch('/chargers_real.json')
            .then(res => res.json())
            .then(data => {
                const flattened = data.features.map((f: any, index: number) => {
                    const props = f.properties
                    const name = props['Location Name'] || 'Unknown Station'
                    let operator = 'Independent'
                    if (name.includes('PTT')) operator = 'PTT'
                    else if (name.includes('Total')) operator = 'Total Energies'
                    else if (name.includes('BZ')) operator = 'EV Energy Tech'
                    
                    return {
                        id: `st-${index}`,
                        name,
                        operator,
                        connectors: (props['Plug Types'] || 'Type 2').split('/').map((s: string) => s.trim()),
                        operation_time: props['Operation Time'] || '24/7',
                        coordinates: [f.geometry.coordinates[1], f.geometry.coordinates[0]],
                        address: props['Address'] || 'Cambodia'
                    }
                })
                setStations(flattened)
                setIsLoading(false)
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
        <div className="relative w-full h-full flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950">
            {/* Sidebar Search & List */}
            <div className="w-full md:w-80 h-1/3 md:h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-10 flex flex-col">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search stations..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#ef233c]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {isLoading ? (
                        <div className="p-8 text-center text-slate-400 text-sm">Loading stations...</div>
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredStations.map(s => (
                                <button 
                                    key={s.id}
                                    onClick={() => setSelectedStation(s)}
                                    className={cn(
                                        "w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors",
                                        selectedStation?.id === s.id && "bg-slate-50 dark:bg-slate-800/80"
                                    )}
                                >
                                    <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{s.name}</p>
                                    <p className="text-xs text-slate-500 mt-1">{s.operator} • {s.connectors[0]}</p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Map Area */}
            <div className="flex-1 relative">
                <MapContainer
                    center={[11.55, 104.91]}
                    zoom={13}
                    className="w-full h-full"
                    zoomControl={false}
                >
                    <MapController center={selectedStation?.coordinates || [11.55, 104.91]} zoom={selectedStation ? 15 : 13} />
                    <TileLayer url={tileUrl} />
                    {filteredStations.map(s => (
                        <Marker 
                            key={s.id} 
                            position={s.coordinates}
                            icon={createCustomIcon(selectedStation?.id === s.id, s.operator)}
                            eventHandlers={{ click: () => setSelectedStation(s) }}
                        >
                            <Popup closeButton={false}>
                                <div className="p-3 min-w-[200px]">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{s.name}</h3>
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Available</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-3">{s.address}</p>
                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                                            <p className="text-[9px] text-slate-400 uppercase font-bold">Speed</p>
                                            <p className="text-xs font-bold">50kW DC</p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                                            <p className="text-[9px] text-slate-400 uppercase font-bold">Type</p>
                                            <p className="text-xs font-bold">{s.connectors[0]}</p>
                                        </div>
                                    </div>
                                    <button className="w-full py-2 bg-[#ef233c] text-white text-xs font-bold rounded-lg hover:bg-[#d90429] transition-colors">
                                        Start Charging
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Mobile Detail Overlay */}
                {selectedStation && (
                    <div className="md:hidden absolute bottom-4 inset-x-4 z-[1000] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-4 animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">{selectedStation.name}</h3>
                                <p className="text-xs text-slate-500">{selectedStation.operator}</p>
                            </div>
                            <button onClick={() => setSelectedStation(null)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="flex items-center gap-2 text-xs font-medium">
                                <Zap className="h-4 w-4 text-[#ef233c]" /> 50kW
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium">
                                <Clock className="h-4 w-4 text-slate-400" /> 24/7
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium">
                                <Shield className="h-4 w-4 text-slate-400" /> Verified
                            </div>
                        </div>
                        <button className="w-full py-3 bg-[#ef233c] text-white font-bold rounded-xl">
                            Start Charging Session
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
