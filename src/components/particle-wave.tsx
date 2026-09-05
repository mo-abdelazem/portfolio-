"use client";

import { useEffect, useRef } from "react";

interface ParticleWaveProps {
  className?: string;
  particleColor?: string;
}

interface Particle {
  u: number;
  v: number;
  baseX: number;
  baseY: number;
  baseZ: number;
}

export function ParticleWave({
  className = "",
  particleColor = "230, 245, 235",
}: ParticleWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // Responsive grid configuration to drastically improve mobile performance
    let cols = 52;
    let rows = 40;
    let particles: Particle[] = [];

    const initGrid = (w: number) => {
      if (w < 640) {
        cols = 22;
        rows = 18;
      } else if (w < 1024) {
        cols = 36;
        rows = 28;
      } else {
        cols = 52;
        rows = 40;
      }

      particles = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const u = (i / (cols - 1) - 0.5) * 2;
          const v = (j / (rows - 1) - 0.5) * 2;

          const radius = Math.sqrt(u * u + v * v);
          const theta = Math.atan2(v, u);

          particles.push({
            u,
            v,
            baseX: u * 480 + Math.cos(theta * 2 + radius * 3) * 60,
            baseY: v * 380 + Math.sin(theta * 2 + radius * 3) * 60,
            baseZ: Math.sin(radius * 4) * 120,
          });
        }
      }
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;

      const isMobile = width < 640;
      const dpr = isMobile
        ? Math.min(window.devicePixelRatio || 1, 1.25)
        : Math.min(window.devicePixelRatio || 1, 1.75);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initGrid(width);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Only listen to mouse movements on non-coarse pointers
    const isTouchOnly = window.matchMedia("(pointer: coarse)").matches;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      targetMouseX = x * 2;
      targetMouseY = y * 2;
    };

    if (!isTouchOnly) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let time = 0;
    let lastTime = performance.now();
    let isVisible = true;

    // Pre-allocated buckets for batch rendering
    interface ParticleBucket {
      x: number[];
      y: number[];
      r: number[];
      alpha: number;
    }
    const particleBuckets: ParticleBucket[] = [
      { x: [], y: [], r: [], alpha: 0.12 },
      { x: [], y: [], r: [], alpha: 0.32 },
      { x: [], y: [], r: [], alpha: 0.58 },
      { x: [], y: [], r: [], alpha: 0.85 },
    ];

    interface LineBucket {
      points: number[];
      alpha: number;
    }
    const lineBuckets: LineBucket[] = [
      { points: [], alpha: 0.03 },
      { points: [], alpha: 0.08 },
      { points: [], alpha: 0.16 },
    ];

    const render = (now: number) => {
      const delta = Math.min(now - lastTime, 50);
      lastTime = now;
      time += (delta / 1000) * 0.72;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const fov = 440;
      const cameraZ = 600;

      const rotX = 0.45 + mouseY * 0.35 + Math.sin(time * 0.25) * 0.05;
      const rotY = -0.55 + mouseX * 0.45 + Math.cos(time * 0.2) * 0.06;
      const rotZ = 0.35 + Math.sin(time * 0.12) * 0.04;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      const centerX = width * 0.64 + mouseX * 20;
      const centerY = height * 0.45 + mouseY * 18;

      // Reset draw buckets
      for (const bucket of particleBuckets) {
        bucket.x.length = 0;
        bucket.y.length = 0;
        bucket.r.length = 0;
      }
      for (const lBucket of lineBuckets) {
        lBucket.points.length = 0;
      }

      let prevScreenX = 0;
      let prevScreenY = 0;
      let prevDepthNorm = 0;
      let prevValid = false;

      const total = particles.length;
      for (let i = 0; i < total; i++) {
        const isColumnStart = i % rows === 0;
        if (isColumnStart) {
          prevValid = false;
        }

        const p = particles[i];
        if (!p) continue;

        const distFromCenter = Math.sqrt(p.u * p.u + p.v * p.v);
        const wave1 = Math.sin(distFromCenter * 5 - time * 2) * 45;
        const wave2 = Math.cos(p.u * 3 + time * 1.5) * 35;
        const wave3 = Math.sin(p.v * 4 + time * 1.2) * 30;

        const x0 = p.baseX;
        const y0 = p.baseY + wave1 + wave2;
        const z0 = p.baseZ + wave3 + Math.sin(p.u * 4 + p.v * 4 + time) * 40;

        // 3D Rotation Matrix
        const x1 = x0 * cosY + z0 * sinY;
        const y1 = y0;
        const z1 = -x0 * sinY + z0 * cosY;

        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        const x3 = x2 * cosZ - y2 * sinZ;
        const y3 = x2 * sinZ + y2 * cosZ;
        const z3 = z2 + cameraZ;

        if (z3 <= 10) {
          prevValid = false;
          continue;
        }

        const scale = fov / z3;
        const screenX = centerX + x3 * scale;
        const screenY = centerY + y3 * scale;

        const depthNorm = Math.max(0, Math.min(1, (z3 - 250) / 700));
        const size = Math.max(0.8, (1 - depthNorm) * 2.5);

        // Group particle into depth bucket
        const pBucketIdx = Math.min(particleBuckets.length - 1, Math.max(0, Math.floor((1 - depthNorm) * particleBuckets.length)));
        const pBucket = particleBuckets[pBucketIdx];
        if (pBucket) {
          pBucket.x.push(screenX);
          pBucket.y.push(screenY);
          pBucket.r.push(size);
        }

        // Connect neighboring ribbon dots along columns without recalculation
        if (!isColumnStart && prevValid && depthNorm < 0.72) {
          const lineBucketIdx = Math.min(lineBuckets.length - 1, Math.max(0, Math.floor((1 - depthNorm) * lineBuckets.length)));
          const lb = lineBuckets[lineBucketIdx];
          if (lb) {
            lb.points.push(screenX, screenY, prevScreenX, prevScreenY);
          }
        }

        prevScreenX = screenX;
        prevScreenY = screenY;
        prevDepthNorm = depthNorm;
        prevValid = true;
      }

      // Render batched lines (at most 3 draw calls total)
      ctx.lineWidth = 0.6;
      for (const lb of lineBuckets) {
        const pts = lb.points;
        if (pts.length === 0) continue;

        ctx.strokeStyle = `rgba(${particleColor}, ${lb.alpha})`;
        ctx.beginPath();
        for (let k = 0; k < pts.length; k += 4) {
          const x1 = pts[k];
          const y1 = pts[k + 1];
          const x2 = pts[k + 2];
          const y2 = pts[k + 3];
          if (x1 !== undefined && y1 !== undefined && x2 !== undefined && y2 !== undefined) {
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
        }
        ctx.stroke();
      }

      // Render batched particles (at most 4 draw calls total)
      for (const pb of particleBuckets) {
        const { x, y, r, alpha } = pb;
        if (x.length === 0) continue;

        ctx.fillStyle = `rgba(${particleColor}, ${alpha})`;
        ctx.beginPath();
        for (let k = 0; k < x.length; k++) {
          const px = x[k];
          const py = y[k];
          const pr = r[k];
          if (px !== undefined && py !== undefined && pr !== undefined) {
            ctx.moveTo(px + pr, py);
            ctx.arc(px, py, pr, 0, Math.PI * 2);
          }
        }
        ctx.fill();
      }

      if (!prefersReducedMotion && isVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // IntersectionObserver to pause RAF when Hero is offscreen
    let observer: IntersectionObserver | null = null;
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          const nowVisible = entry.isIntersecting;
          if (nowVisible !== isVisible) {
            isVisible = nowVisible;
            if (isVisible && !animationFrameId && !prefersReducedMotion) {
              lastTime = performance.now();
              animationFrameId = requestAnimationFrame(render);
            } else if (!isVisible && animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = 0;
            }
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(canvas);
    }

    // Page visibility listener to stop animation when tab is inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      } else if (isVisible && !animationFrameId && !prefersReducedMotion) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial kick-off
    lastTime = performance.now();
    if (prefersReducedMotion) {
      render(lastTime);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (!isTouchOnly) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (observer) observer.disconnect();
    };
  }, [particleColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{
        contain: "strict",
        transform: "translateZ(0)",
      }}
      aria-hidden="true"
    />
  );
}
