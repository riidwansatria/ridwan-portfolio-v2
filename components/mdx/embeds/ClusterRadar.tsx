"use client"

import {
    PolarAngleAxis,
    PolarGrid,
    Radar,
    RadarChart,
    PolarRadiusAxis,
} from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

const clusterData = [
    {
        name: "Vulnerable",
        color: "#e57322",
        node: 0.31,
        place: 0.42,
        people: 0.83,
    },
    {
        name: "Transit Hub",
        color: "#04b8be",
        node: 0.82,
        place: 0.53,
        people: 0.41,
    },
    {
        name: "Urban Core",
        color: "#3ab564",
        node: 0.63,
        place: 0.84,
        people: 0.49,
    },
    {
        name: "Suburban",
        color: "#727892",
        node: 0.27,
        place: 0.28,
        people: 0.52,
    },
    {
        name: "Downtown",
        color: "#ef4434",
        node: 0.74,
        place: 0.91,
        people: 0.33,
    },
]

export function ClusterRadar() {
    return (
        <div className="my-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {clusterData.map((cluster) => {
                    const data = [
                        { axis: "Node", value: cluster.node },
                        { axis: "Place", value: cluster.place },
                        { axis: "People", value: cluster.people },
                    ]

                    const config: ChartConfig = {
                        value: {
                            label: cluster.name,
                            color: cluster.color,
                        },
                    }

                    return (
                        <div
                            key={cluster.name}
                            className="flex flex-col items-center"
                        >
                            <ChartContainer
                                config={config}
                                className="w-full aspect-square max-h-[180px]"
                            >
                                <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
                                    <PolarGrid stroke="var(--color-border)" />
                                    <PolarAngleAxis
                                        dataKey="axis"
                                        tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
                                    />
                                    <PolarRadiusAxis
                                        angle={90}
                                        domain={[0, 1]}
                                        tick={false}
                                        axisLine={false}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent />}
                                    />
                                    <Radar
                                        name={cluster.name}
                                        dataKey="value"
                                        fill={cluster.color}
                                        fillOpacity={0.25}
                                        stroke={cluster.color}
                                        strokeWidth={2}
                                    />
                                </RadarChart>
                            </ChartContainer>
                            <div className="flex items-center gap-1.5 mt-1">
                                <div
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: cluster.color }}
                                />
                                <span className="text-xs font-medium">{cluster.name}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
