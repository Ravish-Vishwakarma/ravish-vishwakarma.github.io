import { useEffect, useRef } from "react";
import katex from "katex";

interface MathBlockProps {
    math: string;
    display?: boolean;
}

function MathBlock({ math, display = true }: MathBlockProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            katex.render(math, ref.current, {
                displayMode: display,
                throwOnError: false,
            });
        }
    }, [math, display]);

    return <div className={display ? "math-block" : "math-inline"} ref={ref} />;
}

export { MathBlock };
