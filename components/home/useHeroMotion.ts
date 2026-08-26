"use client";

import { useEffect, useRef } from "react";

/**
 * Hero motion controller.
 *
 * Desktop: smoothed (lerped) scroll parallax.
 *   data-plx="0.2"  → drifts up to speed*140px as you scroll the first viewport
 *   data-fade="1.3" → fades out over the first viewport of scrolling
 *
 * Mobile: ambient looping "video-style" animation (CSS classes auto-anim /
 * auto-glow / auto-drift / cue-anim) that freezes on first scroll
 * (.hero-paused) so the page takes over scrolling smoothly.
 */
export default function useHeroMotion(rootRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const plxEls = Array.from(root.querySelectorAll<HTMLElement>("[data-plx]"));
    const fadeEls = Array.from(
      root.querySelectorAll<HTMLElement>("[data-fade]")
    );

    // ---------- mobile: ambient loop, pause on first scroll ----------
    if (window.matchMedia("(hover: none), (max-width: 767px)").matches) {
      root.classList.add("hero-mobile");
      let paused = false;
      const pause = () => {
        if (paused || window.scrollY < 28) return;
        paused = true;
        root.classList.add("hero-paused");
        window.removeEventListener("scroll", pause);
      };
      window.addEventListener("scroll", pause, { passive: true });
      return () => window.removeEventListener("scroll", pause);
    }

    // ---------- desktop: lerped parallax ----------
    let raf = 0;
    let targetY = window.scrollY;
    let curY = targetY;

    const onScroll = () => {
      targetY = window.scrollY;
    };

    const tick = () => {
      curY += (targetY - curY) * 0.14;
      if (Math.abs(targetY - curY) < 0.4) curY = targetY;

      const vh = window.innerHeight || 800;
      const p = Math.min(curY / vh, 1);

      if (curY <= vh * 1.25) {
        for (const el of plxEls) {
          const speed = parseFloat(el.dataset.plx ?? "0");
          el.style.transform = `translate3d(0, ${(p * speed * 140).toFixed(2)}px, 0)`;
        }
        for (const el of fadeEls) {
          const rate = parseFloat(el.dataset.fade ?? "1");
          el.style.opacity = Math.max(0, 1 - p * rate).toFixed(3);
        }
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [rootRef]);
}
