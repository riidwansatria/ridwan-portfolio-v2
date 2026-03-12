"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { Map, useMap, type MapRef } from "@/components/primitives/map"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CLUSTER_COLORS: Record<number, string> = {
    0: "#e57322", // Vulnerable
    1: "#04b8be", // Transit Hub
    2: "#3ab564", // Urban Core
    3: "#727892", // Suburban
    4: "#ef4434", // Downtown
}

const CLUSTER_LABELS: Record<number, string> = {
    0: "Vulnerable",
    1: "Transit Hub",
    2: "Urban Core",
    3: "Suburban",
    4: "Downtown",
}

type ViewMode = "clusters" | "node" | "place" | "people"

const VIEW_LABELS: Record<ViewMode, string> = {
    clusters: "Cluster",
    node: "Node Index",
    place: "Place Index",
    people: "People Index",
}

// ---------------------------------------------------------------------------
// Map Layers sub-component
// ---------------------------------------------------------------------------

interface MapLayersProps {
    viewMode: ViewMode
    highlightCluster: number | null
    onHover: (feature: any | null, lngLat: { lng: number; lat: number } | null) => void
    onClick: (feature: any | null) => void
}

function MapLayers({ viewMode, highlightCluster, onHover, onClick }: MapLayersProps) {
    const { map, isLoaded } = useMap()
    const sourceAdded = useRef(false)
    const geojsonRef = useRef<any>(null)

    useEffect(() => {
        if (!map || !isLoaded) return

        const loadData = async () => {
            try {
                const resp = await fetch("/data/tod-equity/stations.geojson")
                const geojson = await resp.json()
                geojsonRef.current = geojson

                if (sourceAdded.current) {
                    const source = map.getSource("stations") as any
                    if (source) source.setData(geojson)
                    return
                }

                map.addSource("stations", { type: "geojson", data: geojson })

                map.addLayer({
                    id: "station-fill",
                    type: "fill",
                    source: "stations",
                    paint: {
                        "fill-color": buildFillColor("clusters"),
                        "fill-opacity": 0.55,
                    },
                })

                map.addLayer({
                    id: "station-outline",
                    type: "line",
                    source: "stations",
                    paint: {
                        "line-color": buildFillColor("clusters"),
                        "line-width": 1.5,
                        "line-opacity": 0.8,
                    },
                })

                map.on("mousemove", "station-fill", (e: any) => {
                    if (e.features?.length) {
                        map.getCanvas().style.cursor = "pointer"
                        onHover(e.features[0], e.lngLat)
                    }
                })

                map.on("mouseleave", "station-fill", () => {
                    map.getCanvas().style.cursor = ""
                    onHover(null, null)
                })

                map.on("click", "station-fill", (e: any) => {
                    if (e.features?.length) onClick(e.features[0])
                })

                sourceAdded.current = true
            } catch (err) {
                console.error("Failed to load station GeoJSON:", err)
            }
        }

        loadData()
    }, [map, isLoaded, onHover, onClick])

    // Update view mode paint
    useEffect(() => {
        if (!map || !sourceAdded.current) return
        try {
            const color = buildFillColor(viewMode)
            map.setPaintProperty("station-fill", "fill-color", color)
            map.setPaintProperty("station-outline", "line-color", color)
            map.setPaintProperty("station-fill", "fill-opacity", viewMode === "clusters" ? 0.55 : 0.7)
        } catch (_) { /* layer may not exist yet */ }
    }, [map, viewMode])

    // Highlight cluster — dim others
    useEffect(() => {
        if (!map || !sourceAdded.current) return
        try {
            if (highlightCluster !== null) {
                map.setPaintProperty("station-fill", "fill-opacity", [
                    "case",
                    ["==", ["get", "cluster"], highlightCluster],
                    0.7,
                    0.12,
                ])
                map.setPaintProperty("station-outline", "line-opacity", [
                    "case",
                    ["==", ["get", "cluster"], highlightCluster],
                    1,
                    0.15,
                ])

                // flyTo bounding box of highlighted cluster
                if (geojsonRef.current) {
                    const features = geojsonRef.current.features.filter(
                        (f: any) => f.properties.cluster === highlightCluster
                    )
                    if (features.length > 0) {
                        const coords: [number, number][] = []
                        features.forEach((f: any) => {
                            if (f.geometry.type === "Polygon") {
                                f.geometry.coordinates[0].forEach((c: number[]) => coords.push([c[0], c[1]]))
                            } else if (f.geometry.type === "Point") {
                                coords.push([f.geometry.coordinates[0], f.geometry.coordinates[1]])
                            } else if (f.geometry.type === "MultiPolygon") {
                                f.geometry.coordinates.forEach((poly: any) => {
                                    poly[0].forEach((c: number[]) => coords.push([c[0], c[1]]))
                                })
                            }
                        })

                        // Filter out invalid coords just in case
                        const validCoords = coords.filter(c => !isNaN(c[0]) && !isNaN(c[1]))

                        if (validCoords.length > 0) {
                            const lngs = validCoords.map(c => c[0])
                            const lats = validCoords.map(c => c[1])
                            const minLng = Math.min(...lngs)
                            const maxLng = Math.max(...lngs)
                            const minLat = Math.min(...lats)
                            const maxLat = Math.max(...lats)

                            // Prevent zooming out to world map if span is extremely large or invalid
                            if (minLng > -180 && maxLng < 180 && minLat > -90 && maxLat < 90) {
                                const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
                                map.fitBounds(
                                    [[minLng, minLat], [maxLng, maxLat]],
                                    { padding: 60, duration: prefersReduced ? 0 : 800 }
                                )
                            }
                        }
                    }
                }
            } else {
                // Reset to normal
                map.setPaintProperty("station-fill", "fill-opacity", viewMode === "clusters" ? 0.55 : 0.7)
                map.setPaintProperty("station-outline", "line-opacity", 0.8)
            }
        } catch (_) { /* layer may not exist yet */ }
    }, [map, highlightCluster, viewMode])

    return null
}

function buildFillColor(mode: ViewMode): any {
    if (mode === "clusters") {
        return [
            "match", ["get", "cluster"],
            0, CLUSTER_COLORS[0],
            1, CLUSTER_COLORS[1],
            2, CLUSTER_COLORS[2],
            3, CLUSTER_COLORS[3],
            4, CLUSTER_COLORS[4],
            "#999",
        ]
    }
    const prop = mode === "node" ? "node_index" : mode === "place" ? "place_index" : "people_index"
    return [
        "interpolate", ["linear"], ["get", prop],
        0, "#fef3e2", 0.25, "#fdd49e", 0.5, "#fdbb74", 0.75, "#f97316", 1.0, "#9a3412",
    ]
}

// ---------------------------------------------------------------------------
// Main StationMap component
// ---------------------------------------------------------------------------

interface StationMapProps {
    src?: string
    // Controlled mode (driven by ScrollySection)
    activeView?: ViewMode
    highlightCluster?: number | null
    interactive?: boolean
}

export function StationMap({
    activeView,
    highlightCluster: highlightClusterProp,
    interactive: interactiveProp,
}: StationMapProps) {
    // Determine mode: controlled (scrolly-driven) vs standalone
    const isControlled = activeView !== undefined

    const [internalView, setInternalView] = useState<ViewMode>("clusters")
    const [showControls, setShowControls] = useState(!isControlled)

    const viewMode = isControlled && !showControls ? (activeView as ViewMode) : internalView
    const highlightCluster = isControlled && !showControls ? (highlightClusterProp ?? null) : null

    // When the interactive flag turns on, transfer control to user
    useEffect(() => {
        if (interactiveProp && isControlled) {
            setShowControls(true)
            if (activeView) setInternalView(activeView as ViewMode)
        }
    }, [interactiveProp, isControlled, activeView])

    // When leaving controlled mode (scrolling back), reset
    useEffect(() => {
        if (isControlled && !interactiveProp) {
            setShowControls(false)
        }
    }, [isControlled, interactiveProp])

    const [tooltip, setTooltip] = useState<{
        feature: any
        lngLat: { lng: number; lat: number }
    } | null>(null)
    const [selectedStation, setSelectedStation] = useState<any | null>(null)
    const mapRef = useRef<MapRef>(null)

    const handleHover = useCallback(
        (feature: any | null, lngLat: { lng: number; lat: number } | null) => {
            if (feature && lngLat) setTooltip({ feature, lngLat })
            else setTooltip(null)
        }, []
    )

    const handleClick = useCallback((feature: any | null) => {
        if (feature) setSelectedStation(feature.properties)
    }, [])

    return (
        <div className="relative flex h-full min-h-[400px] w-full flex-col">
            {/* Segmented control — only in standalone or interactive mode */}
            {showControls && (
                <div
                    className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-1 py-1 border border-border"
                    style={{
                        animation: isControlled ? "fadeIn 400ms ease" : undefined,
                    }}
                >
                    {(["clusters", "node", "place", "people"] as ViewMode[]).map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setInternalView(mode)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${viewMode === mode
                                ? "bg-foreground text-background"
                                : "text-muted-foreground hover:bg-secondary"
                                }`}
                        >
                            {VIEW_LABELS[mode]}
                        </button>
                    ))}
                </div>
            )}

            {/* Map */}
            <Map
                ref={mapRef}
                center={[106.85, -6.2]}
                zoom={10.5}
                className="w-full h-full rounded-lg overflow-hidden border border-border"
            >
                <MapLayers
                    viewMode={viewMode}
                    highlightCluster={highlightCluster}
                    onHover={handleHover}
                    onClick={handleClick}
                />
            </Map>

            {/* Tooltip */}
            {tooltip && (
                <div
                    className="absolute pointer-events-none z-10"
                    style={{ left: "50%", top: 60, transform: "translateX(-50%)" }}
                >
                    <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg text-xs space-y-1">
                        <p className="font-semibold text-sm">{tooltip.feature.properties.name}</p>
                        <div className="flex items-center gap-1.5">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: CLUSTER_COLORS[tooltip.feature.properties.cluster] }}
                            />
                            <span className="text-muted-foreground">
                                {CLUSTER_LABELS[tooltip.feature.properties.cluster]}
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 pt-1 text-muted-foreground">
                            <div>
                                <span className="block text-[10px] uppercase tracking-wider">Node</span>
                                <span className="font-medium text-foreground">
                                    {Number(tooltip.feature.properties.node_index).toFixed(2)}
                                </span>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase tracking-wider">Place</span>
                                <span className="font-medium text-foreground">
                                    {Number(tooltip.feature.properties.place_index).toFixed(2)}
                                </span>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase tracking-wider">People</span>
                                <span className="font-medium text-foreground">
                                    {Number(tooltip.feature.properties.people_index).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-xs z-10">
                {viewMode === "clusters" ? (
                    <div className="space-y-1">
                        {Object.entries(CLUSTER_LABELS).map(([id, label]) => (
                            <div key={id} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-sm"
                                    style={{
                                        backgroundColor: CLUSTER_COLORS[Number(id)],
                                        opacity: highlightCluster !== null && highlightCluster !== Number(id) ? 0.2 : 1,
                                    }}
                                />
                                <span
                                    className="text-muted-foreground"
                                    style={{
                                        opacity: highlightCluster !== null && highlightCluster !== Number(id) ? 0.4 : 1,
                                    }}
                                >
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-1">
                        <p className="font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                            {VIEW_LABELS[viewMode]}
                        </p>
                        <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">Low</span>
                            <div
                                className="w-24 h-2.5 rounded-sm"
                                style={{
                                    background:
                                        "linear-gradient(to right, #fef3e2, #fdd49e, #fdbb74, #f97316, #9a3412)",
                                }}
                            />
                            <span className="text-muted-foreground">High</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Detail panel */}
            {selectedStation && (
                <div className="absolute bottom-3 right-3 z-10 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 max-w-xs">
                    <button
                        onClick={() => setSelectedStation(null)}
                        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground text-xs"
                    >
                        ✕
                    </button>
                    <div className="flex items-center gap-2 mb-3">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: CLUSTER_COLORS[selectedStation.cluster] }}
                        />
                        <h4 className="font-semibold text-sm">{selectedStation.name}</h4>
                    </div>
                    <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded-full">
                        {CLUSTER_LABELS[selectedStation.cluster]}
                    </span>
                    <div className="grid grid-cols-3 gap-3 mt-3">
                        {[
                            { label: "Node", value: selectedStation.node_index },
                            { label: "Place", value: selectedStation.place_index },
                            { label: "People", value: selectedStation.people_index },
                        ].map((item) => (
                            <div key={item.label}>
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">
                                    {item.label}
                                </span>
                                <span className="text-base font-semibold tabular-nums">
                                    {Number(item.value).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            `}</style>
        </div>
    )
}
