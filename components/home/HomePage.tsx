'use client';

import { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage/AppImage';
import { assets, paletteColors } from '@/lib/assets';
import { useDrawingCanvas } from '@/hooks/useDrawingCanvas';
import Header from '@/components/layout/Header/Header';
import Hero from '@/components/sections/Hero/Hero';
import DrawingPalette from '@/components/drawing/DrawingPalette/DrawingPalette';
import DrawingCanvas from '@/components/drawing/DrawingCanvas/DrawingCanvas';
import Projects from '@/components/sections/Projects/Projects';
import About from '@/components/sections/About/About';
import Skills from '@/components/sections/Skills/Skills';
import Footer from '@/components/sections/Footer/Footer';
import styles from './HomePage.module.css';

function scrollToHash() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  // Wait a frame so layout (and images) can settle after navigation
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  });
}

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState<string>(paletteColors[0].hex);
  const [eraser, setEraser] = useState(false);

  const { canvasRef, height, startDraw, draw, endDraw, clearCanvas } =
    useDrawingCanvas({
      containerRef: pageRef,
      color,
      eraser,
    });

  useEffect(() => {
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return (
    <div ref={pageRef} className={styles.page}>
      <AppImage
        src={assets.background}
        alt=""
        fill
        sizes="100vw"
        className={styles.background}
        priority
      />

      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <Hero />
            <DrawingPalette
              activeColor={color}
              eraser={eraser}
              onSelectColor={(hex) => {
                setColor(hex);
                setEraser(false);
              }}
              onToggleEraser={() => setEraser((v) => !v)}
              onClear={clearCanvas}
            />
            <Projects />
            <About />
            <Skills />
            <Footer />
          </div>
        </main>
      </div>

      <DrawingCanvas
        canvasRef={canvasRef}
        height={height}
        onStart={startDraw}
        onDraw={draw}
        onEnd={endDraw}
      />
    </div>
  );
}
