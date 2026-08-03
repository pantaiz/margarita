'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Point = { x: number; y: number };

type UseDrawingCanvasOptions = {
  containerRef: React.RefObject<HTMLElement | null>;
  color: string;
  eraser: boolean;
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const raw = hex.replace('#', '');
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw;
  const value = Number.parseInt(full, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

/** Build a thin colored-pencil grain stamp; flecks stay near palette hex. */
function createPencilStamp(color: string, size = 16): HTMLCanvasElement {
  const stamp = document.createElement('canvas');
  stamp.width = size;
  stamp.height = size;
  const ctx = stamp.getContext('2d');
  if (!ctx) return stamp;

  const { r, g, b } = hexToRgb(color);
  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;
  const center = (size - 1) / 2;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - center;
      const dy = y - center;
      const dist = Math.hypot(dx, dy) / center;
      if (dist > 1) continue;

      // Paper tooth: dense bright flecks, softer only at the edge
      const tooth = Math.random();
      const falloff = 1 - dist * dist;
      if (tooth > 0.55 * falloff) continue;

      const alpha = Math.floor((200 + Math.random() * 55) * falloff);
      const i = (y * size + x) * 4;
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = alpha;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return stamp;
}

export function useDrawingCanvas({
  containerRef,
  color,
  eraser,
}: UseDrawingCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const stampRef = useRef<HTMLCanvasElement | null>(null);
  const stampColorRef = useRef<string>('');
  const [height, setHeight] = useState(0);

  const getStamp = useCallback((hex: string) => {
    if (!stampRef.current || stampColorRef.current !== hex) {
      stampRef.current = createPencilStamp(hex);
      stampColorRef.current = hex;
    }
    return stampRef.current;
  }, []);

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

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.hypot(dx, dy) || 1;
    const stamp = getStamp(color);
    const stampSize = 4 + Math.random() * 2.5;

    ctx.globalCompositeOperation = 'source-over';

    // Thin grain along the path — colored pencil, palette-bright
    const step = 0.7 + Math.random() * 0.4;
    const count = Math.max(1, Math.ceil(length / step));

    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const x = from.x + dx * t + (Math.random() - 0.5) * 0.7;
      const y = from.y + dy * t + (Math.random() - 0.5) * 0.7;
      const size = stampSize * (0.85 + Math.random() * 0.3);

      ctx.globalAlpha = 0.75 + Math.random() * 0.25;
      ctx.drawImage(stamp, x - size / 2, y - size / 2, size, size);

      // Sparse edge flecks for paper tooth
      if (Math.random() > 0.7) {
        const fx = x + (Math.random() - 0.5) * 1.4;
        const fy = y + (Math.random() - 0.5) * 1.4;
        const fs = 0.5 + Math.random() * 0.9;
        ctx.globalAlpha = 0.55 + Math.random() * 0.35;
        ctx.drawImage(stamp, fx - fs / 2, fy - fs / 2, fs, fs);
      }
    }

    // Bright broken core so stroke color matches the palette swatch
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 0.7 + Math.random() * 0.5;
    ctx.strokeStyle = color;
    ctx.setLineDash([1.2, 1.8 + Math.random() * 1.2]);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.setLineDash([]);

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
