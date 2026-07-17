import { useState, useEffect } from "react";

const DIGITS: Record<string, number[][]> = {
    "0": [
        [1,1,1],
        [1,0,1],
        [1,0,1],
        [1,0,1],
        [1,1,1],
    ],
    "1": [
        [0,1,0],
        [1,1,0],
        [0,1,0],
        [0,1,0],
        [1,1,1],
    ],
    "2": [
        [1,1,1],
        [0,0,1],
        [1,1,1],
        [1,0,0],
        [1,1,1],
    ],
    "3": [
        [1,1,1],
        [0,0,1],
        [1,1,1],
        [0,0,1],
        [1,1,1],
    ],
    "4": [
        [1,0,1],
        [1,0,1],
        [1,1,1],
        [0,0,1],
        [0,0,1],
    ],
    "5": [
        [1,1,1],
        [1,0,0],
        [1,1,1],
        [0,0,1],
        [1,1,1],
    ],
    "6": [
        [1,1,1],
        [1,0,0],
        [1,1,1],
        [1,0,1],
        [1,1,1],
    ],
    "7": [
        [1,1,1],
        [0,0,1],
        [0,0,1],
        [0,1,0],
        [0,1,0],
    ],
    "8": [
        [1,1,1],
        [1,0,1],
        [1,1,1],
        [1,0,1],
        [1,1,1],
    ],
    "9": [
        [1,1,1],
        [1,0,1],
        [1,1,1],
        [0,0,1],
        [1,1,1],
    ],
    ":": [
        [0,0,0],
        [0,1,0],
        [0,0,0],
        [0,1,0],
        [0,0,0],
    ],
};

function PixelDigit({ char }: { char: string }) {
    const grid = DIGITS[char];
    if (!grid) return null;

    return (
        <div className="pixel-digit">
            {grid.map((row, r) => (
                <div key={r} className="pixel-row">
                    {row.map((cell, c) => (
                        <div
                            key={c}
                            className={`pixel-cell ${cell ? "on" : "off"}`}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

function PixelTime({ time }: { time: string }) {
    return (
        <div className="pixel-time">
            {time.split("").map((char, i) => (
                <PixelDigit key={i} char={char} />
            ))}
        </div>
    );
}

function TimeCard() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const h = String(ist.getHours()).padStart(2, "0");
    const m = String(ist.getMinutes()).padStart(2, "0");
    const s = String(ist.getSeconds()).padStart(2, "0");
    const time = `${h}:${m}:${s}`;

    const day = ist.toLocaleDateString("en-US", { weekday: "long" });
    const date = ist.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    return (
        <div className="status-card time-card">
            <PixelTime time={time} />
            <div className="time-date">
                <span className="time-day">{day}</span>
                <span className="time-full">{date}</span>
            </div>
        </div>
    );
}

export { TimeCard };
