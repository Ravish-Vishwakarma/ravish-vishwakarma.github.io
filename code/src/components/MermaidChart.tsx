import { useEffect, useState } from "react";
import mermaid from "mermaid/dist/mermaid.esm.min.mjs";

interface MermaidChartProps {
    chart: string;
    className?: string;
}

function MermaidChart({ chart, className }: MermaidChartProps) {
    const [svg, setSvg] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        mermaid.initialize({
            startOnLoad: false,
            securityLevel: "loose",
            theme: "base",
            fontFamily: "'JetBrains Mono', monospace",
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: "basis",
                nodeSpacing: 40,
                rankSpacing: 50,
            },
            themeVariables: {
                primaryColor: "#e8e8ff",
                primaryTextColor: "#1f2937",
                primaryBorderColor: "#7c3aed",
                lineColor: "#64748b",
                secondaryColor: "#f8fafc",
                tertiaryColor: "#eef2ff",
            },
        });

        setSvg("");
        setError("");

        const renderId = `mermaid-${Math.random().toString(36).slice(2, 10)}`;

        mermaid.render(renderId, chart)
            .then((result: { svg: string }) => {
                if (!cancelled) {
                    setSvg(result.svg);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setError("Unable to render Mermaid diagram.");
                }
            });

        return () => {
            cancelled = true;
        };
    }, [chart]);

    if (error) {
        return <pre className={className ?? "mermaid-chart"}>{error}</pre>;
    }

    return (
        <div
            className={className ?? "mermaid-chart"}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}

export { MermaidChart };
