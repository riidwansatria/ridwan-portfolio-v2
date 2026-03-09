"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface Variable {
    name: string
    definition: string
    source: string
}

interface IndexGroup {
    index: string
    color: string
    variables: Variable[]
}

const variableData: IndexGroup[] = [
    {
        index: "Node",
        color: "var(--color-chart-2)",
        variables: [
            { name: "Rail service frequency", definition: "Number of train services per day at the station", source: "PT KCI, PT MRT Jakarta" },
            { name: "Bus route density", definition: "Number of bus routes within 800m catchment", source: "TransJakarta, Jak Lingko" },
            { name: "Transfer connectivity", definition: "Number of unique transit modes accessible at station", source: "BPTJ" },
            { name: "Pedestrian network", definition: "Length of sidewalk network within catchment (km)", source: "OpenStreetMap" },
            { name: "Road intersection density", definition: "Number of road intersections per km² within catchment", source: "OpenStreetMap" },
            { name: "Cycling infrastructure", definition: "Length of designated cycling lanes within catchment (km)", source: "OpenStreetMap" },
            { name: "Feeder route coverage", definition: "Number of feeder microbus/angkot routes connecting to station", source: "Jak Lingko" },
        ],
    },
    {
        index: "Place",
        color: "var(--color-chart-1)",
        variables: [
            { name: "Population density", definition: "Residents per km² within catchment", source: "BPS Jakarta" },
            { name: "Employment density", definition: "Jobs per km² within catchment", source: "BPS Jakarta" },
            { name: "Land use entropy", definition: "Shannon diversity index of land use categories", source: "Jakarta RDTR" },
            { name: "Commercial floor area", definition: "Total commercial building floor area (m²)", source: "Jakarta Open Data" },
            { name: "Building coverage ratio", definition: "Percentage of land covered by buildings", source: "Remote sensing" },
            { name: "Floor area ratio", definition: "Total floor area relative to land area", source: "Jakarta RDTR" },
            { name: "Green space ratio", definition: "Percentage of parks and open space within catchment", source: "Jakarta Open Data" },
        ],
    },
    {
        index: "People",
        color: "var(--color-chart-5)",
        variables: [
            { name: "Low-income household ratio", definition: "Percentage of households below Jakarta UMR", source: "BPS Jakarta" },
            { name: "Informal worker ratio", definition: "Percentage of workers in informal sector", source: "BPS Jakarta" },
            { name: "Renter household ratio", definition: "Percentage of households that rent (non-owners)", source: "BPS Jakarta" },
            { name: "Education attainment", definition: "Percentage of adults without secondary education", source: "BPS Jakarta" },
            { name: "Elderly population ratio", definition: "Percentage of population aged 60+", source: "BPS Jakarta" },
            { name: "Population growth rate", definition: "Annual population growth rate in catchment area", source: "BPS Jakarta" },
        ],
    },
]

function IndexGroupTable({ group }: { group: IndexGroup }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-secondary/50 hover:bg-secondary/80 rounded-lg transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: group.color }}
                        />
                        <span className="font-semibold text-sm">{group.index} Index</span>
                        <span className="text-xs text-muted-foreground">
                            {group.variables.length} variables
                        </span>
                    </div>
                    <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="mt-1 rounded-lg border border-border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30">
                                <TableHead className="text-xs font-semibold w-[200px]">Variable</TableHead>
                                <TableHead className="text-xs font-semibold">Definition</TableHead>
                                <TableHead className="text-xs font-semibold w-[160px]">Data Source</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {group.variables.map((v) => (
                                <TableRow key={v.name}>
                                    <TableCell className="text-sm font-medium">{v.name}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{v.definition}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground">{v.source}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

export function VariableTable() {
    return (
        <div className="my-10 space-y-2">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Variable Inventory
            </h4>
            {variableData.map((group) => (
                <IndexGroupTable key={group.index} group={group} />
            ))}
        </div>
    )
}
