"use client"

import { useEffect, useState } from "react"
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
} from "recharts"
import {
    ChartContainer,
    type ChartConfig,
} from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StationData {
    name: string
    cluster: number
    cluster_label: string
    node: number
    place: number
    people: number
}

const clusterColors: Record<number, string> = {
    0: "#e57322",
    1: "#04b8be",
    2: "#3ab564",
    3: "#727892",
    4: "#ef4434",
}

const clusterLabels: Record<number, string> = {
    0: "Vulnerable",
    1: "Transit Hub",
    2: "Urban Core",
    3: "Suburban",
    4: "Downtown",
}

type AxisPair = "node-place" | "node-people" | "place-people"

const axisConfig: Record<AxisPair, { x: keyof StationData; y: keyof StationData; xLabel: string; yLabel: string }> = {
    "node-place": { x: "node", y: "place", xLabel: "Node Index", yLabel: "Place Index" },
    "node-people": { x: "node", y: "people", xLabel: "Node Index", yLabel: "People Index" },
    "place-people": { x: "place", y: "people", xLabel: "Place Index", yLabel: "People Index" },
}

const chartConfig: ChartConfig = {
    scatter: {
        label: "Stations",
        color: "var(--chart-1)",
    },
}

function CustomTooltip({ active, payload }: any) {
    if (!active || !payload?.length) return null
    const d = payload[0]?.payload
    if (!d) return null
    return (
        <div className="rounded-lg border bg-background px-3 py-2 shadow-md text-xs space-y-1">
            <p className="font-semibold">{d.name}</p>
            <div className="flex items-center gap-1.5">
                <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: clusterColors[d.cluster] }}
                />
                <span className="text-muted-foreground">{clusterLabels[d.cluster]}</span>
            </div>
            <div className="text-muted-foreground pt-0.5">
                Node: {d.node?.toFixed(2)} · Place: {d.place?.toFixed(2)} · People: {d.people?.toFixed(2)}
            </div>
        </div>
    )
}

export function ScatterPlot() {
    const [data, setData] = useState<StationData[]>([])
    const [axisPair, setAxisPair] = useState<AxisPair>("node-place")

    useEffect(() => {
        fetch("/data/tod-equity/station-indices.json")
            .then((r) => r.json())
            .then(setData)
            .catch(console.error)
    }, [])

    const axis = axisConfig[axisPair]

    // Group data by cluster
    const grouped = [0, 1, 2, 3, 4].map((c) => ({
        cluster: c,
        stations: data.filter((d) => d.cluster === c),
    }))

    return (
        <div className="my-10 space-y-4">
            <Tabs
                value={axisPair}
                onValueChange={(v) => setAxisPair(v as AxisPair)}
            >
                <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                    <TabsTrigger value="node-place" className="text-xs">
                        Node – Place
                    </TabsTrigger>
                    <TabsTrigger value="node-people" className="text-xs">
                        Node – People
                    </TabsTrigger>
                    <TabsTrigger value="place-people" className="text-xs">
                        Place – People
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <ChartContainer config={chartConfig} className="w-full aspect-[4/3] max-h-[400px]">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--color-border)"
                        strokeOpacity={0.5}
                    />
                    <XAxis
                        type="number"
                        dataKey={axis.x as string}
                        name={axis.xLabel}
                        domain={[0, 1]}
                        tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                        label={{
                            value: axis.xLabel,
                            position: "bottom",
                            offset: 20,
                            fontSize: 11,
                            fill: "var(--color-muted-foreground)",
                        }}
                    />
                    <YAxis
                        type="number"
                        dataKey={axis.y as string}
                        name={axis.yLabel}
                        domain={[0, 1]}
                        tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                        label={{
                            value: axis.yLabel,
                            angle: -90,
                            position: "insideLeft",
                            offset: 0,
                            fontSize: 11,
                            fill: "var(--color-muted-foreground)",
                        }}
                    />
                    <ReferenceLine
                        segment={[
                            { x: 0, y: 0 },
                            { x: 1, y: 1 },
                        ]}
                        stroke="var(--color-border)"
                        strokeDasharray="6 4"
                        strokeOpacity={0.6}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {grouped.map(({ cluster, stations }) => (
                        <Scatter
                            key={cluster}
                            name={clusterLabels[cluster]}
                            data={stations}
                            fill={clusterColors[cluster]}
                            fillOpacity={0.7}
                            r={5}
                        />
                    ))}
                </ScatterChart>
            </ChartContainer>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 text-xs">
                {[0, 1, 2, 3, 4].map((c) => (
                    <div key={c} className="flex items-center gap-1.5">
                        <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: clusterColors[c] }}
                        />
                        <span className="text-muted-foreground">{clusterLabels[c]}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
