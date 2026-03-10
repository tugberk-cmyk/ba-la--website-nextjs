"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  opacity: number;
  targetOpacity: number;
  size: number;
  pulse: number;
  pulseSpeed: number;
}

interface DotGrid {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  opacity: number;
}

const CONTENT_LABELS = [
  "LLM", "Visibility", "E-E-A-T", "Semantic",
  "Citations", "Entity", "SERP", "Signal",
  "Authority", "Prompt",
];

const HeroAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const click = useRef({ x: -9999, y: -9999, age: 999 });
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const dotsRef = useRef<DotGrid[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;
      sizeRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      // Dot grid
      const dots: DotGrid[] = [];
      const spacing = 28;
      const cols = Math.ceil(w / spacing);
      const rows = Math.ceil(h / spacing);
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const bx = c * spacing;
          const by = r * spacing;
          dots.push({ x: bx, y: by, baseX: bx, baseY: by, opacity: 0.18 + Math.random() * 0.12 });
        }
      }
      dotsRef.current = dots;

      // Floating nodes — kept in right 70% so they don't overlap left text
      const leftGuard = w * 0.22;
      const nodes: Node[] = CONTENT_LABELS.map((label) => ({
        x: leftGuard + 20 + Math.random() * (w - leftGuard - 60),
        y: 40 + Math.random() * (h - 80),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        label,
        opacity: 0.6 + Math.random() * 0.4,
        targetOpacity: 0.6 + Math.random() * 0.4,
        size: 36 + Math.random() * 12,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.012 + Math.random() * 0.008,
      }));
      nodesRef.current = nodes;
    };

    init();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      click.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, age: 0 };
    };

    const handleMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const drawLine = (x1: number, y1: number, x2: number, y2: number, alpha: number) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `hsla(0, 0%, 15%, ${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    const tick = () => {
      const { w, h } = sizeRef.current;
      const leftGuard = w * 0.22;
      ctx.clearRect(0, 0, w, h);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const MOUSE_RADIUS = 90;
      const MOUSE_STRENGTH = 18;

      // Advance click ripple
      if (click.current.age < 999) click.current.age += 1;

      // Draw dots
      for (const dot of dotsRef.current) {
        const dx = dot.baseX - mx;
        const dy = dot.baseY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Mouse repulsion
        if (dist < MOUSE_RADIUS) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_STRENGTH;
          dot.x = dot.baseX + (dx / dist) * force;
          dot.y = dot.baseY + (dy / dist) * force;
        } else {
          dot.x += (dot.baseX - dot.x) * 0.1;
          dot.y += (dot.baseY - dot.y) * 0.1;
        }

        // Click ripple brightness
        let extraOpacity = 0;
        if (click.current.age < 60) {
          const cx = dot.x - click.current.x;
          const cy = dot.y - click.current.y;
          const cd = Math.sqrt(cx * cx + cy * cy);
          const rippleR = click.current.age * 6;
          const rippleWidth = 40;
          const diff = Math.abs(cd - rippleR);
          if (diff < rippleWidth) {
            extraOpacity = (1 - diff / rippleWidth) * (1 - click.current.age / 60) * 0.5;
          }
        }

        const r = 1.6;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0, 0%, 10%, ${Math.min(1, dot.opacity + extraOpacity)})`;
        ctx.fill();
      }

      // Update + draw nodes
      const nodes = nodesRef.current;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.pulse += n.pulseSpeed;
        n.x += n.vx;
        n.y += n.vy;

        // Bounce — left boundary uses leftGuard so nodes stay in right area
        if (n.x < leftGuard + 10 || n.x > w - 80) n.vx *= -1;
        if (n.y < 20 || n.y > h - 40) n.vy *= -1;
        n.x = Math.max(leftGuard + 10, Math.min(w - 80, n.x));
        n.y = Math.max(20, Math.min(h - 40, n.y));

        // Mouse hover glow
        const ndx = n.x - mx;
        const ndy = n.y - my;
        const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
        const hovered = ndist < 50;

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            drawLine(n.x, n.y, n2.x, n2.y, (1 - d / 140) * 0.12);
          }
        }
      }

      // Draw node labels (drawn after lines)
      for (const n of nodes) {
        const ndx = n.x - mx;
        const ndy = n.y - my;
        const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
        const hovered = ndist < 60;
        const pulseScale = 1 + Math.sin(n.pulse) * 0.04;
        const fontSize = Math.round(n.size * pulseScale * 0.28);

        ctx.font = `500 ${fontSize}px Inter, system-ui, sans-serif`;
        const metrics = ctx.measureText(n.label);
        const tw = metrics.width;
        const th = fontSize;
        const pad = { x: 10, y: 6 };
        const bw = tw + pad.x * 2;
        const bh = th + pad.y * 2;
        const bx = n.x - bw / 2;
        const by = n.y - bh / 2;

        const baseA = hovered ? 1 : n.opacity * 0.75;

        // Pill background
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, bh / 2);
        ctx.fillStyle = hovered
          ? `hsla(0, 0%, 6%, ${baseA})`
          : `hsla(0, 0%, 94%, ${baseA})`;
        ctx.fill();

        // Border
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, bh / 2);
        ctx.strokeStyle = hovered
          ? `hsla(0, 0%, 20%, 0.3)`
          : `hsla(0, 0%, 80%, ${baseA * 0.8})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Text
        ctx.fillStyle = hovered
          ? `hsla(0, 0%, 100%, 1)`
          : `hsla(0, 0%, 20%, ${baseA})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, n.x, n.y);
      }

      // Left-side soft fade — gradient over dots/nodes fading to white
      const fadeWidth = w * 0.28;
      const fadeGrad = ctx.createLinearGradient(0, 0, fadeWidth, 0);
      fadeGrad.addColorStop(0, "hsla(0, 0%, 100%, 1)");
      fadeGrad.addColorStop(0.6, "hsla(0, 0%, 100%, 0.7)");
      fadeGrad.addColorStop(1, "hsla(0, 0%, 100%, 0)");
      ctx.fillStyle = fadeGrad;
      ctx.fillRect(0, 0, fadeWidth, h);

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);

    const handleResize = () => {
      init();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-crosshair"
      style={{ background: "hsl(0 0% 100%)", display: "block" }}
    />
  );
};

export default HeroAnimation;
