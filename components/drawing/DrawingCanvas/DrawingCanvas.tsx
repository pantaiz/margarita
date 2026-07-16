'use client';

import styles from './DrawingCanvas.module.css';

type DrawingCanvasProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  height: number;
  onStart: (e: React.MouseEvent | React.TouchEvent) => void;
  onDraw: (e: React.MouseEvent | React.TouchEvent) => void;
  onEnd: () => void;
};

export default function DrawingCanvas({
  canvasRef,
  height,
  onStart,
  onDraw,
  onEnd,
}: DrawingCanvasProps) {
  const h = height || '100%';

  return (
    <>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{ height: h }}
        aria-hidden="true"
      />
      <div
        className={styles.capture}
        style={{ height: h }}
        onMouseDown={onStart}
        onMouseMove={onDraw}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
        onTouchStart={onStart}
        onTouchMove={onDraw}
        onTouchEnd={onEnd}
        aria-hidden="true"
      />
    </>
  );
}
