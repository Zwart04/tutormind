"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useApp } from "@/lib/context";

type Tool = "pen" | "eraser" | "rect" | "circle" | "line";

export default function WhiteboardPage() {
  const { user, t } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
    channelRef.current = new BroadcastChannel("tm_whiteboard");
    channelRef.current.onmessage = (e) => {
      // handle incoming strokes from other tabs
    };
    return () => {
      channelRef.current?.close();
    };
  }, []);

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack((prev) => [...prev.slice(-20), data]);
  }, []);

  const undo = () => {
    const canvas = canvasRef.current;
    if (!canvas || undoStack.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const last = undoStack[undoStack.length - 1];
    ctx.putImageData(last, 0, 0);
    setUndoStack((prev) => prev.slice(0, -1));
  };

  const clearBoard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    saveState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const exportPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getPos(e);
    setIsDrawing(true);
    setStartPos(pos);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (tool === "pen" || tool === "eraser") {
      saveState();
      ctx.beginPath();
      ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
      ctx.lineWidth = tool === "eraser" ? size * 5 : size;
      ctx.moveTo(pos.x, pos.y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (tool === "pen" || tool === "eraser") {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const endDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) {
      setIsDrawing(false);
      return;
    }
    const pos = getPos(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (tool === "rect") {
      saveState();
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.strokeRect(startPos.x, startPos.y, pos.x - startPos.x, pos.y - startPos.y);
    } else if (tool === "circle") {
      saveState();
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      const rx = Math.abs(pos.x - startPos.x) / 2;
      const ry = Math.abs(pos.y - startPos.y) / 2;
      ctx.beginPath();
      ctx.ellipse(startPos.x + (pos.x - startPos.x) / 2, startPos.y + (pos.y - startPos.y) / 2, rx, ry, 0, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (tool === "line") {
      saveState();
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.beginPath();
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
    setIsDrawing(false);
    setStartPos(null);
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold">{t("nav.whiteboard")}</h2>
        <p className="mb-6 text-muted-foreground">Silakan login untuk menggunakan papan tulis.</p>
        <a href="/auth" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90">
          {t("auth.login")}
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-2 text-2xl font-bold">{t("nav.whiteboard")}</h2>
      <p className="mb-4 text-sm text-muted-foreground">Gambar, tulis, dan kolaborasi secara real-time via BroadcastChannel.</p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button onClick={() => setTool("pen")} className={`rounded-md border px-3 py-1 text-sm ${tool === "pen" ? "bg-primary text-white" : "bg-card hover:bg-muted"}`}>
          Pen
        </button>
        <button onClick={() => setTool("eraser")} className={`rounded-md border px-3 py-1 text-sm ${tool === "eraser" ? "bg-primary text-white" : "bg-card hover:bg-muted"}`}>
          Eraser
        </button>
        <button onClick={() => setTool("rect")} className={`rounded-md border px-3 py-1 text-sm ${tool === "rect" ? "bg-primary text-white" : "bg-card hover:bg-muted"}`}>
          Rect
        </button>
        <button onClick={() => setTool("circle")} className={`rounded-md border px-3 py-1 text-sm ${tool === "circle" ? "bg-primary text-white" : "bg-card hover:bg-muted"}`}>
          Circle
        </button>
        <button onClick={() => setTool("line")} className={`rounded-md border px-3 py-1 text-sm ${tool === "line" ? "bg-primary text-white" : "bg-card hover:bg-muted"}`}>
          Line
        </button>

        <div className="mx-2 h-6 w-px bg-border" />

        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-8 w-8 cursor-pointer rounded border" />
        <select value={size} onChange={(e) => setSize(Number(e.target.value))} className="rounded-md border bg-background px-2 py-1 text-sm">
          <option value={2}>Small</option>
          <option value={3}>Medium</option>
          <option value={5}>Large</option>
          <option value={8}>X-Large</option>
        </select>

        <div className="mx-2 h-6 w-px bg-border" />

        <button onClick={undo} className="rounded-md border bg-card px-3 py-1 text-sm hover:bg-muted">Undo</button>
        <button onClick={clearBoard} className="rounded-md border bg-card px-3 py-1 text-sm hover:bg-muted">Clear</button>
        <button onClick={exportPng} className="rounded-md border bg-card px-3 py-1 text-sm hover:bg-muted">{t("whiteboard.export")}</button>
      </div>

      <div className="rounded-lg border bg-card p-2 shadow-sm">
        <canvas
          ref={canvasRef}
          width={900}
          height={500}
          className="w-full cursor-crosshair bg-white"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={() => setIsDrawing(false)}
        />
      </div>
    </div>
  );
}