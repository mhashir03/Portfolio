"use client";
import React, { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

const GRID_COLS = 32;
const GRID_ROWS = 20;
const TICK_MS = 110;

function getRandomFood(exclude: Point[]): Point {
  // Avoid placing food on the snake
  // Try up to 100 attempts; fallback to (0,0)
  for (let i = 0; i < 100; i++) {
    const p = {
      x: Math.floor(Math.random() * GRID_COLS),
      y: Math.floor(Math.random() * GRID_ROWS),
    };
    if (!exclude.some((e) => e.x === p.x && e.y === p.y)) return p;
  }
  return { x: 0, y: 0 };
}

export default function MiniSnake() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [focused, setFocused] = useState(false);
  const dirRef = useRef<Point>({ x: 1, y: 0 });
  const nextDirRef = useRef<Point>({ x: 1, y: 0 });
  const snakeRef = useRef<Point[]>([
    { x: 6, y: 8 },
    { x: 5, y: 8 },
    { x: 4, y: 8 },
  ]);
  const foodRef = useRef<Point>(getRandomFood(snakeRef.current));
  const tickRef = useRef<number | null>(null);
  const cellSizeRef = useRef<number>(14);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const isControlKey = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "w",
        "W",
        "a",
        "A",
        "s",
        "S",
        "d",
        "D",
        " ",
      ].includes(e.key);

      // Prevent page scroll when game is focused or running
      if ((running || focused) && isControlKey) {
        e.preventDefault();
      }

      if (["ArrowUp", "w", "W"].includes(e.key)) {
        if (dirRef.current.y !== 1) nextDirRef.current = { x: 0, y: -1 };
      } else if (["ArrowDown", "s", "S"].includes(e.key)) {
        if (dirRef.current.y !== -1) nextDirRef.current = { x: 0, y: 1 };
      } else if (["ArrowLeft", "a", "A"].includes(e.key)) {
        if (dirRef.current.x !== 1) nextDirRef.current = { x: -1, y: 0 };
      } else if (["ArrowRight", "d", "D"].includes(e.key)) {
        if (dirRef.current.x !== -1) nextDirRef.current = { x: 1, y: 0 };
      } else if (e.key === " ") {
        setRunning((r) => !r);
      } else if (e.key === "Enter") {
        if (!running) restart();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [running, focused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const ro = new ResizeObserver(() => {
      const available = Math.max(260, Math.floor(wrapper.clientWidth));
      // Keep within a comfortable size
      const cell = Math.max(12, Math.min(18, Math.floor(available / GRID_COLS)));
      cellSizeRef.current = cell;
      const cssWidth = GRID_COLS * cell;
      const cssHeight = GRID_ROWS * cell;
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      draw();
    });
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (running) startLoop();
    else stopLoop();
    return stopLoop;
  }, [running]);

  function startLoop() {
    stopLoop();
    tickRef.current = window.setInterval(step, TICK_MS);
  }
  function stopLoop() {
    if (tickRef.current) window.clearInterval(tickRef.current);
    tickRef.current = null;
  }

  function restart() {
    snakeRef.current = [
      { x: 6, y: 8 },
      { x: 5, y: 8 },
      { x: 4, y: 8 },
    ];
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    foodRef.current = getRandomFood(snakeRef.current);
    setScore(0);
    setRunning(true);
  }

  function step() {
    dirRef.current = nextDirRef.current;
    const snake = snakeRef.current.slice();
    const head = { x: snake[0].x + dirRef.current.x, y: snake[0].y + dirRef.current.y };
    // Wrap around
    head.x = (head.x + GRID_COLS) % GRID_COLS;
    head.y = (head.y + GRID_ROWS) % GRID_ROWS;

    // Collision with self
    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      setRunning(false);
      draw(true);
      return;
    }

    snake.unshift(head);
    // Eat
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      setScore((s) => s + 1);
      foodRef.current = getRandomFood(snake);
    } else {
      snake.pop();
    }
    snakeRef.current = snake;
    draw();
  }

  function draw(gameOver = false) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CELL = cellSizeRef.current;

    // Background
    ctx.fillStyle = "#131316";
    ctx.fillRect(0, 0, GRID_COLS * CELL, GRID_ROWS * CELL);

    // Grid (subtle)
    ctx.strokeStyle = "rgba(139,148,158,0.08)";
    for (let x = 0; x <= GRID_COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL + 0.5, 0);
      ctx.lineTo(x * CELL + 0.5, GRID_ROWS * CELL);
      ctx.stroke();
    }
    for (let y = 0; y <= GRID_ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL + 0.5);
      ctx.lineTo(GRID_COLS * CELL, y * CELL + 0.5);
      ctx.stroke();
    }

    // Food
    ctx.fillStyle = "#c4a1e8"; // amethyst glow
    ctx.fillRect(
      foodRef.current.x * CELL + 1,
      foodRef.current.y * CELL + 1,
      CELL - 2,
      CELL - 2
    );

    // Snake
    const snake = snakeRef.current;
    snake.forEach((seg, i) => {
      const alpha = 1 - Math.min(i / 12, 0.6);
      ctx.fillStyle = `rgba(155,111,199,${alpha})`; // amethyst fade
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });

    // Game over overlay
    if (gameOver) {
      ctx.fillStyle = "rgba(19,19,22,0.7)";
      ctx.fillRect(0, 0, GRID_COLS * CELL, GRID_ROWS * CELL);
      ctx.fillStyle = "#e5dfdc";
      ctx.font = "bold 12px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.fillText("Game Over - Press Enter", (GRID_COLS * CELL) / 2, (GRID_ROWS * CELL) / 2);
    }
  }

  return (
    <div
      className="w-full"
      ref={wrapperRef}
      tabIndex={0}
      role="application"
      aria-label="Snake mini game"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className="flex items-center justify-between mb-2 text-xs text-[#b2b2bd]">
        <span>Snake</span>
        <div className="flex items-center gap-2">
          <span>Score: {score}</span>
          <button
            className="px-2 py-0.5 rounded bg-[#212127] hover:bg-[#2a2a32] text-[#e5dfdc] transition"
            onClick={() => {
              if (running) {
                setRunning(false);
              } else {
                setRunning(true);
                // Focus the wrapper so key controls don't scroll the page
                if (wrapperRef.current) {
                  wrapperRef.current.focus();
                }
              }
            }}
          >
            {running ? "Pause" : "Play"}
          </button>
          <button
            className="px-2 py-0.5 rounded bg-[#212127] hover:bg-[#2a2a32] text-[#e5dfdc] transition"
            onClick={restart}
          >
            Restart
          </button>
        </div>
      </div>
      <div className="rounded-md overflow-hidden border border-[#3a3a42] shadow-[0_0_20px_rgba(0,0,0,0.15)] bg-[#131316]">
        <canvas ref={canvasRef} className="block mx-auto w-full" />
      </div>
      <p className="mt-2 text-[10px] text-[#b2b2bd]">Use WASD or arrows. Space: pause, Enter: restart.</p>
    </div>
  );
}


