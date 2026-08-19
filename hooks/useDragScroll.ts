'use client';

import { useEffect, type RefObject } from 'react';

const DRAG_THRESHOLD = 6;

export function useDragScroll(
  ref: RefObject<HTMLElement | null>,
  ready = true,
) {
  useEffect(() => {
    if (!ready) return;
    const el = ref.current;
    if (!el) return;

    let pointerId: number | null = null;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    let dragging = false;
    let dragged = false;

    const skipTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest('[data-no-drag]'));
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      if (skipTarget(event.target)) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      startLeft = el.scrollLeft;
      startTop = el.scrollTop;
      dragging = false;
      dragged = false;
    };

    const onMove = (event: PointerEvent) => {
      if (pointerId === null || event.pointerId !== pointerId) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      if (!dragging && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
        dragging = true;
        dragged = true;
        el.dataset.dragging = 'true';
        try {
          el.setPointerCapture(event.pointerId);
        } catch {
          /* element may not accept capture */
        }
      }

      if (!dragging) return;
      el.scrollLeft = startLeft - dx;
      el.scrollTop = startTop - dy;
      event.preventDefault();
    };

    const onUp = (event: PointerEvent) => {
      if (pointerId === null || event.pointerId !== pointerId) return;
      pointerId = null;
      dragging = false;
      delete el.dataset.dragging;
      if (dragged) {
        el.dataset.dragged = 'true';
        window.setTimeout(() => {
          delete el.dataset.dragged;
        }, 0);
      }
    };

    const onClickCapture = (event: MouseEvent) => {
      if (el.dataset.dragged === 'true') {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const onDragStart = (event: DragEvent) => {
      event.preventDefault();
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    el.addEventListener('click', onClickCapture, true);
    el.addEventListener('dragstart', onDragStart);

    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      el.removeEventListener('click', onClickCapture, true);
      el.removeEventListener('dragstart', onDragStart);
    };
  }, [ref, ready]);
}
