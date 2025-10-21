"use client";

import { useEffect, useRef } from "react";

/**
 * SpaceField — ultra-light starfield/parallax canvas
 * - ~150–200 bintang (dinamis sesuai ukuran layar)
 * - depth (z) → parallax, kecepatan berbeda
 * - mouse parallax halus
 * - performa: reqAnimationFrame + resize observer
 */
export default function SpaceField({
  density = 0.22, // 0.18–0.30 (jumlah bintang relatif terhadap area)
  speed = 0.35, // 0.25–0.45 (kecepatan global)
}: {
  density?: number;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, t: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    // re-size on container changes
    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      build();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // calculate number of stars relative to area
    let count = Math.max(
      80,
      Math.min(260, Math.floor((w * h) / (1200 / density)))
    );
    type Star = {
      x: number;
      y: number;
      z: number;
      r: number;
      vx: number;
      vy: number;
    };
    let stars: Star[] = [];

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function build() {
      count = Math.max(
        80,
        Math.min(260, Math.floor((w * h) / (1200 / density)))
      );
      stars = Array.from({ length: count }, () => {
        const z = rand(0.3, 1.4); // depth
        return {
          x: rand(0, w),
          y: rand(0, h),
          z,
          r: Math.max(0.6, 1.8 - z), // smaller when deeper
          vx: rand(-0.4, 0.4) * z,
          vy: (rand(0.12, 0.45) + speed) * z, // mostly downward
        };
      });
    }
    build();

    // mouse parallax
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left - w / 2) / w; // -0.5..0.5
      mouseRef.current.y = (e.clientY - rect.top - h / 2) / h;
      mouseRef.current.t = performance.now();
    };
    window.addEventListener("mousemove", onMove);

    // animation loop
    let raf = 0;
    const trail: { x: number; y: number; life: number }[] = [];

    function tick() {
      ctx.clearRect(0, 0, w, h);

      // subtle space gradient (very light)
      const g = ctx.createRadialGradient(
        w * 0.5,
        h * 0.25,
        0,
        w * 0.5,
        h * 0.25,
        Math.max(w, h)
      );
      g.addColorStop(0, "rgba(56, 189, 248, .06)"); // cyan
      g.addColorStop(0.6, "rgba(99, 102, 241, .04)"); // indigo
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const { x: mx, y: my } = mouseRef.current;

      // update & draw stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // parallax offset (mouse influence)
        const ox = mx * 12 * s.z;
        const oy = my * 10 * s.z;

        s.x += s.vx + ox * 0.02;
        s.y += s.vy + oy * 0.02;

        // wrap around
        if (s.x < -5) s.x = w + 5;
        if (s.x > w + 5) s.x = -5;
        if (s.y > h + 5) {
          s.y = -5;
          s.x = rand(0, w);
        }

        // glow
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${0.25 + 0.35 * (1.4 - s.z)})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // occasional trail (shooting star-ish)
        if (Math.random() < 0.002 && s.z < 0.8) {
          trail.push({ x: s.x, y: s.y, life: 1 });
        }
      }

      // draw trails
      for (let i = trail.length - 1; i >= 0; i--) {
        const t = trail[i];
        t.life -= 0.02;
        if (t.life <= 0) {
          trail.splice(i, 1);
          continue;
        }
        const alpha = Math.max(0, t.life);
        ctx.strokeStyle = `rgba(255,255,255,${0.35 * alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(t.x, t.y);
        ctx.lineTo(t.x - 40, t.y + 10); // small diagonal line
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [density, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      // important: let CSS size drive the canvas size; ResizeObserver syncs internal resolution
      style={{ display: "block" }}
    />
  );
}
