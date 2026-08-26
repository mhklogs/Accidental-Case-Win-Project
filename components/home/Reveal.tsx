"use client";

import { useEffect, useRef } from "react";

/**
 * Fades/slides children in the first time they enter the viewport.
 * Wrap any server-rendered section content — safe in server components.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
}: {
  children: React.ReactNode;
  /** stagger in ms */
  delay?: number;
  /** initial offset in px */
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={
        {
          transitionDelay: `${delay}ms`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
