import { useRef, useEffect, useState, useCallback } from "react";

const CELL_SIZE = 6;
const COLS = 28;
const ROWS = 20;

function createEmptyGrid() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(false));
}

function randomize() {
    return Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => Math.random() > 0.65)
    );
}

function nextGen(grid: boolean[][]) {
    return grid.map((row, r) =>
        row.map((cell, c) => {
            let neighbors = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc]) {
                        neighbors++;
                    }
                }
            }
            if (cell) return neighbors === 2 || neighbors === 3;
            return neighbors === 3;
        })
    );
}

function GameOfLife() {
    const [grid, setGrid] = useState(randomize);
    const [running, setRunning] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const color = getComputedStyle(canvas).color;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c]) {
                    ctx.fillStyle = color;
                    ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
                }
            }
        }
    }, [grid]);

    useEffect(() => {
        draw();
    }, [draw]);

    useEffect(() => {
        if (running) {
            intervalRef.current = setInterval(() => {
                setGrid((prev) => nextGen(prev));
            }, 120);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [running]);

    const handleReset = () => {
        setGrid(createEmptyGrid());
        setRunning(false);
    };

    const handleRandomize = () => {
        setGrid(randomize());
        setRunning(true);
    };

    return (
        <div className="gol-widget">
            <div className="gol-header">
                <span className="gol-title">game of life</span>
                <div className="gol-controls">
                    <button
                        className="gol-btn"
                        onClick={() => setRunning((prev) => !prev)}
                    >
                        {running ? "pause" : "play"}
                    </button>
                    <button className="gol-btn" onClick={handleReset}>
                        clear
                    </button>
                    <button className="gol-btn" onClick={handleRandomize}>
                        random
                    </button>
                </div>
            </div>
            <canvas
                ref={canvasRef}
                width={COLS * CELL_SIZE}
                height={ROWS * CELL_SIZE}
                className="gol-canvas"
            />
        </div>
    );
}

export { GameOfLife };
