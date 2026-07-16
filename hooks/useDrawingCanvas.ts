'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Point = { x: number; y: number };

type UseDrawingCanvasOptions = {
  containerRef: React.RefObject<HTMLElement | null>;
  color: string;
  eraser: boolean;
};

export function useDrawingCanvas({
  containerRef,
  color,
  eraser,
}: UseDrawingCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const [height, setHeight] = useState(0);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const w = container.scrollWidth;
    const h = container.scrollHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setHeight(h);
  }, [containerRef]);

  useEffect(() => {
    resizeCanvas();
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => resizeCanvas());
    observer.observe(container);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [containerRef, resizeCanvas]);

  const getPoint = (e: React.MouseEvent | React.TouchEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0] ?? e.changedTouches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const drawStroke = (from: Point, to: Point) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    if (eraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 1;
      ctx.lineWidth = 28;
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      return;
    }

    // Colored pencil on toothy paper: layered jittered strokes + grain flecks
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.hypot(dx, dy) || 1;
    const baseWidth = 2.2 + Math.random() * 2.4;
    const passes = 4;

    ctx.globalCompositeOperation = 'source-over';

    for (let i = 0; i < passes; i++) {
      const offsetX = (Math.random() - 0.5) * 1.8;
      const offsetY = (Math.random() - 0.5) * 1.8;

      ctx.globalAlpha = 0.18 + Math.random() * 0.28;
      ctx.lineWidth = baseWidth * (0.55 + Math.random() * 0.7);
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(from.x + offsetX, from.y + offsetY);
      ctx.lineTo(to.x + offsetX, to.y + offsetY);
      ctx.stroke();
    }

    // Paper tooth: scatter tiny flecks along the stroke
    const steps = Math.max(1, Math.ceil(length / 1.5));
    for (let i = 0; i <= steps; i++) {
      if (Math.random() > 0.55) continue;
      const t = i / steps;
      const x = from.x + dx * t + (Math.random() - 0.5) * 2.2;
      const y = from.y + dy * t + (Math.random() - 0.5) * 2.2;
      const size = 0.6 + Math.random() * 1.1;
      ctx.globalAlpha = 0.2 + Math.random() * 0.45;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, size, size);
    }

    // Soft core so the stroke still reads as a continuous line
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = baseWidth * 0.55;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();

    ctx.globalAlpha = 1;
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    drawingRef.current = true;
    lastPointRef.current = getPoint(e);
    e.preventDefault();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawingRef.current) return;
    const point = getPoint(e);
    const last = lastPointRef.current;
    if (last) drawStroke(last, point);
    lastPointRef.current = point;
    e.preventDefault();
  };

  const endDraw = () => {
    drawingRef.current = false;
    lastPointRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return {
    canvasRef,
    height,
    startDraw,
    draw,
    endDraw,
    clearCanvas,
  };
}
