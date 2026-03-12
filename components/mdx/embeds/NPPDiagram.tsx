export function NPPDiagram() {
    return (
        <div className="my-10 flex justify-center">
            <svg
                viewBox="0 0 600 320"
                className="w-full max-w-2xl"
                role="img"
                aria-label="Node-Place-People framework diagram showing three dimensions of TOD analysis"
            >
                {/* Definitions */}
                <defs>
                    <filter id="npp-shadow" x="-10%" y="-10%" width="130%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.08" />
                    </filter>
                </defs>

                {/* NODE circle */}
                <g>
                    <circle cx="150" cy="100" r="72" fill="var(--color-chart-2)" fillOpacity="0.12" stroke="var(--color-chart-2)" strokeWidth="2" filter="url(#npp-shadow)" />
                    <text x="150" y="70" textAnchor="middle" className="fill-foreground" fontWeight="700" fontSize="16">Node</text>
                    <text x="150" y="90" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Transit Connectivity</text>
                    <text x="150" y="110" textAnchor="middle" className="fill-muted-foreground" fontSize="9">• Rail frequency</text>
                    <text x="150" y="124" textAnchor="middle" className="fill-muted-foreground" fontSize="9">• Bus routes</text>
                    <text x="150" y="138" textAnchor="middle" className="fill-muted-foreground" fontSize="9">• Transfer options</text>
                </g>

                {/* PLACE circle */}
                <g>
                    <circle cx="450" cy="100" r="72" fill="var(--color-chart-1)" fillOpacity="0.12" stroke="var(--color-chart-1)" strokeWidth="2" filter="url(#npp-shadow)" />
                    <text x="450" y="70" textAnchor="middle" className="fill-foreground" fontWeight="700" fontSize="16">Place</text>
                    <text x="450" y="90" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Land Use Intensity</text>
                    <text x="450" y="110" textAnchor="middle" className="fill-muted-foreground" fontSize="9">• Population density</text>
                    <text x="450" y="124" textAnchor="middle" className="fill-muted-foreground" fontSize="9">• Employment density</text>
                    <text x="450" y="138" textAnchor="middle" className="fill-muted-foreground" fontSize="9">• Land use diversity</text>
                </g>

                {/* PEOPLE circle */}
                <g>
                    <circle cx="300" cy="250" r="72" fill="var(--color-chart-5)" fillOpacity="0.12" stroke="var(--color-chart-5)" strokeWidth="2" filter="url(#npp-shadow)" />
                    <text x="300" y="220" textAnchor="middle" className="fill-foreground" fontWeight="700" fontSize="16">People</text>
                    <text x="300" y="240" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Social Vulnerability</text>
                    <text x="300" y="260" textAnchor="middle" className="fill-muted-foreground" fontSize="9">• Income levels</text>
                    <text x="300" y="274" textAnchor="middle" className="fill-muted-foreground" fontSize="9">• Housing tenure</text>
                    <text x="300" y="288" textAnchor="middle" className="fill-muted-foreground" fontSize="9">• Informal workers</text>
                </g>

                {/* Connecting lines */}
                <line x1="218" y1="120" x2="382" y2="120" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="6 4" />
                <line x1="185" y1="160" x2="265" y2="210" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="6 4" />
                <line x1="415" y1="160" x2="335" y2="210" stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* Center label */}
                <text x="300" y="148" textAnchor="middle" className="fill-muted-foreground" fontSize="11" fontWeight="600">NPP Framework</text>
            </svg>
        </div>
    )
}
