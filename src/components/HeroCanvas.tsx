"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient hero canvas.
 *
 * One mode per page, all sharing the same two-colour palette so the site reads
 * as one system. Ported from the prototype's polish.js; the geometry, speeds and
 * alpha values are unchanged.
 *
 * Note on the Team page: the handoff README describes a `usmap` mode that loaded
 * US geometry from Natural Earth via d3 + topojson at runtime. The shipped
 * prototype used `roster` there instead, so that is what this ports — which also
 * means the site carries no runtime CDN dependency for geography.
 *
 * The animation pauses when scrolled out of view, re-measures on resize, and is
 * suppressed entirely under prefers-reduced-motion.
 */

export type HeroMode =
  | "converge"
  | "roster"
  | "network"
  | "field"
  | "streaks"
  | "flagwave"
  | "mosaic"
  | "lattice";

const GOLD = "233,200,119";
const BLUE = "127,178,238";
const RED = "179,25,66";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  ph: number;
  a: number;
  tgt: number;
  g: boolean;
  w: number;
  h: number;
  p: number;
  sp: number;
  len: number;
  ang: number;
};

type Tri = {
  x: number;
  y: number;
  w: number;
  h: number;
  up: boolean;
  ph: number;
  g: boolean;
};

type Drop = { x: number; y: number; len: number; sp: number; g: boolean };

function node(partial: Partial<Node>): Node {
  return {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    r: 1,
    ph: 0,
    a: 0,
    tgt: 0,
    g: false,
    w: 0,
    h: 0,
    p: 0,
    sp: 0,
    len: 0,
    ang: 0,
    ...partial,
  };
}

export default function HeroCanvas({ mode }: { mode: HeroMode }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let t = 0;
    let raf = 0;
    let visible = true;

    let nodes: Node[] = [];
    let tris: Tri[] = [];
    let drops: Drop[] = [];

    /* A five-pointed star, filled — used by the contact page's flag field. */
    function star5(cx: number, cy: number, r: number) {
      ctx!.beginPath();
      for (let i = 0; i < 5; i++) {
        const a1 = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
        const a2 = a1 + Math.PI / 5;
        const x1 = cx + Math.cos(a1) * r;
        const y1 = cy + Math.sin(a1) * r;
        const x2 = cx + Math.cos(a2) * r * 0.42;
        const y2 = cy + Math.sin(a2) * r * 0.42;
        if (i === 0) ctx!.moveTo(x1, y1);
        else ctx!.lineTo(x1, y1);
        ctx!.lineTo(x2, y2);
      }
      ctx!.closePath();
      ctx!.fill();
    }

    function init() {
      nodes = [];
      tris = [];
      drops = [];

      if (mode === "mosaic") {
        const mw = 74;
        const mh = 64;
        for (let my = 0; my * mh < H + mh; my++) {
          for (let mx = 0; mx * mw < W + mw; mx++) {
            for (let up = 0; up < 2; up++) {
              tris.push({
                x: mx * mw + (my % 2 ? mw / 2 : 0),
                y: my * mh,
                w: mw,
                h: mh,
                up: up === 1,
                ph: mx * 0.5 + my * 0.8 + Math.random() * 0.6,
                g: Math.random() < 0.14,
              });
            }
          }
        }
      } else if (mode === "field") {
        const fs = 34;
        for (let fy = 0; fy * fs < H + fs; fy++) {
          for (let fx = 0; fx * fs < W + fs; fx++) {
            nodes.push(
              node({
                x: fx * fs + 14,
                y: fy * fs + 14,
                g: Math.random() < 0.12,
              }),
            );
          }
        }
      } else if (mode === "flagwave") {
        for (let q = 0; q < 26; q++) {
          nodes.push(
            node({
              x: (0.04 + (q % 6) * 0.062) * W,
              y: (0.16 + Math.floor(q / 6) * 0.13) * H,
              r: 4 + Math.random() * 3,
              ph: Math.random() * 6.28,
            }),
          );
        }
      } else if (mode === "converge") {
        const spokes = 46;
        for (let sp = 0; sp < spokes; sp++) {
          nodes.push(
            node({
              ang: (sp / spokes) * Math.PI * 2 + Math.random() * 0.04,
              p: Math.random(),
              sp: 0.0012 + Math.random() * 0.0032,
              g: Math.random() < 0.2,
              len: 0.55 + Math.random() * 0.5,
            }),
          );
        }
      } else if (mode === "roster") {
        const cw = 96;
        const chh = 122;
        const gap = 18;
        const perRow = Math.ceil(W / (cw + gap)) + 1;
        const rowsN = Math.ceil(H / (chh + gap)) + 1;
        const offX = -((perRow * (cw + gap) - W) / 2);
        for (let ry = 0; ry < rowsN; ry++) {
          for (let rx = 0; rx < perRow; rx++) {
            nodes.push(
              node({
                x: offX + rx * (cw + gap) + (ry % 2 ? (cw + gap) / 2 : 0),
                y: ry * (chh + gap) - 30,
                w: cw,
                h: chh,
                ph: rx * 0.55 + ry * 0.9 + Math.random() * 0.5,
                g: Math.random() < 0.1,
              }),
            );
          }
        }
      } else if (mode === "network") {
        const count = Math.min(38, Math.round(W / 34));
        for (let i = 0; i < count; i++) {
          nodes.push(
            node({
              x: Math.random() * W,
              y: Math.random() * H,
              vx: (Math.random() - 0.5) * 0.13,
              vy: (Math.random() - 0.5) * 0.13,
              r: Math.random() * 1.1 + 0.7,
              ph: Math.random() * 6.28,
              g: Math.random() < 0.16,
            }),
          );
        }
      } else if (mode === "streaks") {
        for (let j = 0; j < 16; j++) {
          drops.push({
            y: Math.random() * H,
            x: Math.random() * W,
            len: 60 + Math.random() * 180,
            sp: 0.25 + Math.random() * 0.7,
            g: Math.random() < 0.3,
          });
        }
      } else if (mode === "lattice") {
        const step = 62;
        const ox = (W % step) / 2;
        for (let gy = 0; gy * step < H + step; gy++) {
          for (let gx = 0; gx * step < W + step; gx++) {
            nodes.push(
              node({
                x: ox + gx * step + (gy % 2 ? step / 2 : 0),
                y: gy * step,
                ph: Math.random() * Math.PI * 2,
              }),
            );
          }
        }
      }
    }

    function size() {
      const r = host!.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return false;
      if (Math.abs(r.width - W) < 1 && Math.abs(r.height - H) < 1) return true;
      W = r.width;
      H = r.height;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
      return true;
    }

    function frame() {
      t += 0.006;
      ctx!.clearRect(0, 0, W, H);

      if (mode === "roster") {
        for (const n of nodes) {
          const p = (Math.sin(t * 0.9 + n.ph) + 1) / 2;
          const R = 10;
          ctx!.beginPath();
          ctx!.moveTo(n.x + R, n.y);
          ctx!.arcTo(n.x + n.w, n.y, n.x + n.w, n.y + n.h, R);
          ctx!.arcTo(n.x + n.w, n.y + n.h, n.x, n.y + n.h, R);
          ctx!.arcTo(n.x, n.y + n.h, n.x, n.y, R);
          ctx!.arcTo(n.x, n.y, n.x + n.w, n.y, R);
          ctx!.closePath();
          ctx!.fillStyle = `rgba(${BLUE},${0.012 + p * 0.03})`;
          ctx!.fill();
          ctx!.strokeStyle = `rgba(${n.g ? GOLD : BLUE},${0.06 + p * 0.16})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
          if (p > 0.86) {
            ctx!.fillStyle = `rgba(${n.g ? GOLD : BLUE},${(p - 0.86) * 1.1})`;
            ctx!.beginPath();
            ctx!.arc(n.x + n.w / 2, n.y + n.h * 0.38, 13, 0, 6.2832);
            ctx!.fill();
          }
        }
      } else if (mode === "converge") {
        const ccx = W * 0.88;
        const ccy = H * 0.78;
        const R = Math.max(W, H) * 0.9;
        ctx!.save();
        for (const n of nodes) {
          const ca = Math.cos(n.ang);
          const sa = Math.sin(n.ang);

          const gx = ctx!.createLinearGradient(
            ccx,
            ccy,
            ccx + ca * R * n.len,
            ccy + sa * R * n.len,
          );
          gx.addColorStop(0, `rgba(${BLUE},.12)`);
          gx.addColorStop(1, `rgba(${BLUE},0)`);
          ctx!.strokeStyle = gx;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(ccx, ccy);
          ctx!.lineTo(ccx + ca * R * n.len, ccy + sa * R * n.len);
          ctx!.stroke();

          n.p -= n.sp;
          if (n.p < 0) {
            n.p = 1;
            n.g = Math.random() < 0.2;
          }
          const d0 = R * n.len * n.p;
          const px = ccx + ca * d0;
          const py = ccy + sa * d0;
          const fade = Math.min(1, n.p * 2.4) * (1 - Math.pow(n.p, 3));
          const tg = ctx!.createLinearGradient(px, py, px + ca * 46, py + sa * 46);
          tg.addColorStop(0, `rgba(${n.g ? GOLD : BLUE},${0.5 * fade})`);
          tg.addColorStop(1, `rgba(${n.g ? GOLD : BLUE},0)`);
          ctx!.strokeStyle = tg;
          ctx!.lineWidth = n.g ? 1.8 : 1.2;
          ctx!.beginPath();
          ctx!.moveTo(px, py);
          ctx!.lineTo(px + ca * 46, py + sa * 46);
          ctx!.stroke();
        }

        const pulse = 0.5 + 0.5 * Math.sin(t * 1.5);
        const fg = ctx!.createRadialGradient(
          ccx,
          ccy,
          0,
          ccx,
          ccy,
          60 + pulse * 18,
        );
        fg.addColorStop(0, `rgba(${GOLD},${0.14 + pulse * 0.09})`);
        fg.addColorStop(1, `rgba(${GOLD},0)`);
        ctx!.fillStyle = fg;
        ctx!.beginPath();
        ctx!.arc(ccx, ccy, 60 + pulse * 18, 0, 6.2832);
        ctx!.fill();
        ctx!.restore();
      } else if (mode === "mosaic") {
        for (const tr of tris) {
          const p = (Math.sin(t * 1.5 - tr.ph) + 1) / 2;
          ctx!.fillStyle = `rgba(${tr.g ? GOLD : BLUE},${0.012 + p * 0.045})`;
          ctx!.beginPath();
          if (tr.up) {
            ctx!.moveTo(tr.x, tr.y + tr.h);
            ctx!.lineTo(tr.x + tr.w / 2, tr.y);
            ctx!.lineTo(tr.x + tr.w, tr.y + tr.h);
          } else {
            ctx!.moveTo(tr.x + tr.w / 2, tr.y + tr.h);
            ctx!.lineTo(tr.x + tr.w, tr.y);
            ctx!.lineTo(tr.x + tr.w * 1.5, tr.y + tr.h);
          }
          ctx!.closePath();
          ctx!.fill();
          ctx!.strokeStyle = `rgba(${BLUE},.025)`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
      } else if (mode === "flagwave") {
        const bands = 9;
        const bh = H / bands;
        for (let b = 0; b < bands; b++) {
          ctx!.beginPath();
          const top = b * bh;
          ctx!.moveTo(0, top + Math.sin(t * 1.1 + b * 0.5) * 12);
          for (let x = 0; x <= W; x += 12) {
            ctx!.lineTo(
              x,
              top +
                Math.sin(x * 0.0055 + t * 1.1 + b * 0.5) * 12 +
                Math.sin(x * 0.012 - t * 0.8) * 5,
            );
          }
          for (let x = W; x >= 0; x -= 12) {
            ctx!.lineTo(
              x,
              top +
                bh +
                Math.sin(x * 0.0055 + t * 1.1 + b * 0.5) * 12 +
                Math.sin(x * 0.012 - t * 0.8) * 5,
            );
          }
          ctx!.closePath();
          ctx!.fillStyle =
            b % 2 === 0 ? `rgba(${RED},.14)` : "rgba(255,255,255,.045)";
          ctx!.fill();
        }
        for (const n of nodes) {
          const tw = 0.45 + 0.55 * ((Math.sin(t * 1.7 + n.ph) + 1) / 2);
          ctx!.fillStyle = `rgba(255,255,255,${0.16 * tw})`;
          star5(n.x, n.y + Math.sin(t + n.ph) * 4, n.r);
        }
      } else if (mode === "field") {
        if (Math.random() < 0.09 && nodes.length) {
          const pick = nodes[(Math.random() * nodes.length) | 0];
          pick.tgt = 0.55 + Math.random() * 0.45;
        }
        for (const n of nodes) {
          n.a += (n.tgt - n.a) * 0.035;
          if (n.tgt > 0.02 && n.a > n.tgt * 0.92) n.tgt = 0;
          ctx!.fillStyle = `rgba(${n.g ? GOLD : BLUE},${0.075 + n.a * 0.5})`;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, 1 + n.a * 1.7, 0, 6.2832);
          ctx!.fill();
          if (n.a > 0.18) {
            ctx!.strokeStyle = `rgba(${n.g ? GOLD : BLUE},${n.a * 0.16})`;
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.arc(n.x, n.y, 4 + n.a * 14, 0, 6.2832);
            ctx!.stroke();
          }
        }
      } else if (mode === "network") {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > W) n.vx *= -1;
          if (n.y < 0 || n.y > H) n.vy *= -1;
          for (let k = i + 1; k < nodes.length; k++) {
            const m = nodes[k];
            const dx = n.x - m.x;
            const dy = n.y - m.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 34000) {
              ctx!.strokeStyle = `rgba(${BLUE},${0.085 * (1 - d2 / 34000)})`;
              ctx!.lineWidth = 0.8;
              ctx!.beginPath();
              ctx!.moveTo(n.x, n.y);
              ctx!.lineTo(m.x, m.y);
              ctx!.stroke();
            }
          }
        }
        for (const n of nodes) {
          const tw = 0.6 + 0.4 * Math.sin(t * 1.6 + n.ph);
          ctx!.fillStyle = `rgba(${n.g ? GOLD : BLUE},${(n.g ? 0.4 : 0.26) * tw})`;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r, 0, 6.2832);
          ctx!.fill();
        }
      } else if (mode === "streaks") {
        for (const d of drops) {
          d.x += d.sp;
          if (d.x - d.len > W) {
            d.x = -d.len;
            d.y = Math.random() * H;
          }
          const g = ctx!.createLinearGradient(d.x - d.len, d.y, d.x, d.y);
          const c = d.g ? GOLD : BLUE;
          g.addColorStop(0, `rgba(${c},0)`);
          g.addColorStop(1, `rgba(${c},${d.g ? 0.34 : 0.24})`);
          ctx!.strokeStyle = g;
          ctx!.lineWidth = d.g ? 1.6 : 1;
          ctx!.beginPath();
          ctx!.moveTo(d.x - d.len, d.y);
          ctx!.lineTo(d.x, d.y);
          ctx!.stroke();
        }
      } else if (mode === "lattice") {
        for (const n of nodes) {
          const p = (Math.sin(t * 2.2 + n.ph) + 1) / 2;
          ctx!.fillStyle = `rgba(${BLUE},${0.1 + p * 0.34})`;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, 1.1 + p * 1.5, 0, 6.2832);
          ctx!.fill();
        }
      }

      raf = requestAnimationFrame(frame);
    }

    /* The hero may not be laid out on the first tick; retry until it measures. */
    if (!size()) {
      let tries = 0;
      const retry = () => {
        if (size() || ++tries > 120) return;
        window.setTimeout(retry, 40);
      };
      retry();
    }

    const ro = new ResizeObserver(() => size());
    ro.observe(host);

    /* Pause the loop while the hero is off screen. */
    const io = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting;
        if (next === visible) return;
        visible = next;
        if (visible) raf = requestAnimationFrame(frame);
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 },
    );
    io.observe(host);

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [mode]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-75"
    />
  );
}
