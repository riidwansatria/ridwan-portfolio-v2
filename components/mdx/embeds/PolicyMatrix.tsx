import { Card } from "@/components/ui/card"

interface ClusterPolicy {
    name: string
    color: string
    characteristics: string
    policyDirection: string
    instruments: string[]
}

const policies: ClusterPolicy[] = [
    {
        name: "Vulnerable",
        color: "#e57322",
        characteristics:
            "Low transit connectivity, moderate land use, high social vulnerability. Areas with significant informal worker and renter populations near transit stations.",
        policyDirection:
            "Prioritize anti-displacement measures before transit improvements amplify gentrification pressure.",
        instruments: [
            "PBB-P2 property tax exemption for low-income owners",
            "Gov. Reg. 31/2021 on spatial plan integration",
            "Community land trust pilots",
        ],
    },
    {
        name: "Transit Hub",
        color: "#04b8be",
        characteristics:
            "High transit connectivity, moderate land use intensity and vulnerability. Major interchange stations with good multimodal access but underutilized surrounding areas.",
        policyDirection:
            "Leverage transit advantage with mixed-use development while mandating affordable housing quotas.",
        instruments: [
            "Jakarta Gov. Reg. 1/2014 on TOD zones",
            "Inclusionary zoning (20% affordable units)",
            "Value capture mechanisms (betterment levy)",
        ],
    },
    {
        name: "Urban Core",
        color: "#3ab564",
        characteristics:
            "Moderate-high transit access, high land use intensity, moderate vulnerability. Dense, economically active areas with established urban fabric.",
        policyDirection:
            "Manage intensification to prevent displacement; preserve existing affordable housing stock.",
        instruments: [
            "Rent stabilization in TOD zones",
            "Heritage preservation overlays",
            "Green infrastructure requirements",
        ],
    },
    {
        name: "Suburban",
        color: "#727892",
        characteristics:
            "Low transit and land use intensity, moderate vulnerability. Peripheral stations in auto-dependent areas with growth potential.",
        policyDirection:
            "Enable compact, transit-oriented growth with proactive affordable housing planning before land values rise.",
        instruments: [
            "Upzoning with affordability mandates",
            "Land readjustment programs",
            "Feeder transit network investment",
        ],
    },
    {
        name: "Downtown",
        color: "#ef4434",
        characteristics:
            "High transit and land use intensity, low social vulnerability. Premium city-center locations with established commercial development.",
        policyDirection:
            "Capture value from high-performing stations to cross-subsidize equity interventions in Vulnerable areas.",
        instruments: [
            "Development impact fees",
            "Cross-subsidization to Vulnerable clusters",
            "Transit benefit district special levies",
        ],
    },
]

export function PolicyMatrix() {
    return (
        <div className="my-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {policies.map((policy) => (
                    <Card
                        key={policy.name}
                        className="p-0 overflow-hidden border-l-4"
                        style={{ borderLeftColor: policy.color }}
                    >
                        <div className="p-5 space-y-3">
                            {/* Cluster badge */}
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                    style={{ backgroundColor: policy.color }}
                                />
                                <span className="font-semibold text-sm">{policy.name}</span>
                            </div>

                            {/* Characteristics */}
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {policy.characteristics}
                            </p>

                            {/* Policy direction */}
                            <div className="bg-secondary/50 rounded-md px-3 py-2">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                                    Policy Direction
                                </span>
                                <p className="text-sm leading-relaxed">{policy.policyDirection}</p>
                            </div>

                            {/* Instruments */}
                            <div>
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                                    Regulatory Instruments
                                </span>
                                <ul className="space-y-1">
                                    {policy.instruments.map((inst) => (
                                        <li
                                            key={inst}
                                            className="text-xs text-muted-foreground flex items-start gap-1.5"
                                        >
                                            <span className="text-muted-foreground/50 mt-0.5">→</span>
                                            {inst}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
