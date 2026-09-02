"use client";

import { useEffect, useRef } from "react";

interface ParticleWaveProps {
  className?: string;
  particleColor?: string;
}

export function ParticleWave({
  className = "",
  particleColor = "255, 255, 255",
}: ParticleWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // Grid configuration for the parametric topological wave
    const cols = 56;
    const rows = 46;

    const particles: {
      u: number;
      v: number;
      baseX: number;
      baseY: number;
      baseZ: number;
    }[] = [];

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

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      targetMouseX = x * 2;
      targetMouseY = y * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.012;

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

      // Position center of 3D cloud towards right-center as in screenshot
      const centerX = width * 0.64 + mouseX * 20;
      const centerY = height * 0.45 + mouseY * 18;

      for (let i = 0; i < particles.length; i++) {
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

        if (z3 <= 10) continue;

        const scale = fov / z3;
        const screenX = centerX + x3 * scale;
        const screenY = centerY + y3 * scale;

        const depthNorm = Math.max(0, Math.min(1, (z3 - 250) / 700));
        const alpha = Math.max(0.04, (1 - depthNorm) * 0.85);
        const size = Math.max(0.8, (1 - depthNorm) * 2.5);

        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${alpha})`;
        ctx.fill();

        // Connect neighboring dots with subtle lines along columns to create organic ribbon curves
        if (i % rows !== 0 && depthNorm < 0.72) {
          const prevP = particles[i - 1];
          if (!prevP) continue;

          const prevWave1 = Math.sin(Math.sqrt(prevP.u * prevP.u + prevP.v * prevP.v) * 5 - time * 2) * 45;
          const prevWave2 = Math.cos(prevP.u * 3 + time * 1.5) * 35;
          const prevWave3 = Math.sin(prevP.v * 4 + time * 1.2) * 30;

          const px0 = prevP.baseX;
          const py0 = prevP.baseY + prevWave1 + prevWave2;
          const pz0 = prevP.baseZ + prevWave3 + Math.sin(prevP.u * 4 + prevP.v * 4 + time) * 40;

          const px1 = px0 * cosY + pz0 * sinY;
          const py1 = py0;
          const pz1 = -px0 * sinY + pz0 * cosY;

          const px2 = px1;
          const py2 = py1 * cosX - pz1 * sinX;
          const pz2 = py1 * sinX + pz1 * cosX;

          const px3 = px2 * cosZ - py2 * sinZ;
          const py3 = px2 * sinZ + py2 * cosZ;
          const pz3 = pz2 + cameraZ;

          if (pz3 > 10) {
            const prevScale = fov / pz3;
            const prevScreenX = centerX + px3 * prevScale;
            const prevScreenY = centerY + py3 * prevScale;

            const lineAlpha = Math.max(0.015, (1 - depthNorm) * 0.16);
            ctx.beginPath();
            ctx.moveTo(screenX, screenY);
            ctx.lineTo(prevScreenX, prevScreenY);
            ctx.strokeStyle = `rgba(${particleColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [particleColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
