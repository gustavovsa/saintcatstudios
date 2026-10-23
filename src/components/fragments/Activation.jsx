import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const DURATION = 4500;
// Ciano do desenho do Localizador funcionando (H 3.png), mais vivo que o ice
const CYAN = "64,220,240";

// Raio em zigue-zague entre dois pontos (deslocamento do ponto médio);
// jitter controla o quanto ele se agita
function makeBolt(x1, y1, x2, y2, jitter) {
  let points = [[x1, y1], [x2, y2]];
  let spread = Math.hypot(x2 - x1, y2 - y1) * jitter;
  for (let i = 0; i < 4; i++) {
    const next = [points[0]];
    for (let j = 1; j < points.length; j++) {
      const [ax, ay] = points[j - 1];
      const [bx, by] = points[j];
      const len = Math.hypot(bx - ax, by - ay) || 1;
      const offset = (Math.random() - 0.5) * spread;
      next.push(
        [(ax + bx) / 2 - ((by - ay) / len) * offset, (ay + by) / 2 + ((bx - ax) / len) * offset],
        [bx, by],
      );
    }
    points = next;
    spread /= 2;
  }
  return points;
}

// Brilho redondo (centro branco, borda ciano) desenhado uma vez só;
// cada bolinha e cada luz só copia a imagem, o que é bem mais leve
function makeGlowSprite() {
  const size = 64;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext("2d");
  const half = size / 2;
  const glow = ctx.createRadialGradient(half, half, 0, half, half, half);
  glow.addColorStop(0, "rgba(255,255,255,1)");
  glow.addColorStop(0.3, "rgba(255,255,255,0.9)");
  glow.addColorStop(0.5, `rgba(${CYAN},0.7)`);
  glow.addColorStop(1, `rgba(${CYAN},0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

// Ativação do Localizador, como no desenho: anéis de frente pra tela,
// bolinhas vibrando ligadas por raios e luzes correndo em volta com rastro.
// Tudo acelera até tomar a tela e virar o clarão do teletransporte
export default function Activation({ originRef, onProgress, onDone }) {
  const stageRef = useRef(null);
  const trailRef = useRef(null);
  const sharpRef = useRef(null);
  const glowRef = useRef(null);
  const veilRef = useRef(null);
  const flashRef = useRef(null);
  const callbacks = useRef({ onProgress, onDone });
  callbacks.current = { onProgress, onDone };

  useEffect(() => {
    // Dois canvas: no "trail" as luzes que correm deixam rastro;
    // o "sharp" é limpo a cada quadro (anéis, bolinhas e raios)
    const trailCanvas = trailRef.current;
    const sharpCanvas = sharpRef.current;
    const trail = trailCanvas.getContext("2d");
    const sharp = sharpCanvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Quem pede menos movimento (inclusive com as animações do Windows
    // desligadas) vê uma versão calma: mais lenta, sem piscar nem tremer a tela
    const pace = reduce ? 0.4 : 1;
    const sprite = makeGlowSprite();
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      // Brilho e rastro já são borrados: resolução alta só pesaria no celular
      const dpr = Math.min(window.devicePixelRatio || 1, w < 768 ? 1 : 1.5);
      for (const [canvas, ctx] of [[trailCanvas, trail], [sharpCanvas, sharp]]) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Trava a rolagem pra o Localizador não sair do lugar no meio do efeito
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const comets = Array.from({ length: 5 }, (_, i) => ({
      angle: (i / 5) * Math.PI * 2,
      radius: 1.1 + Math.random() * 0.5,
      tilt: (Math.random() - 0.5) * 0.5,
      speed: 0.8 + Math.random() * 0.4,
      size: 6 + Math.random() * 3,
      drawn: false,
    }));
    const orbs = Array.from({ length: 8 }, (_, i) => ({
      angle: (i / 8) * Math.PI * 2 + Math.random() * 0.5,
      radius: 0.9 + Math.random() * 0.8,
      spin: Math.random() * Math.PI * 2,
      size: 8 + Math.random() * 5,
    }));
    const rings = [
      { size: 0.8, turn: 1, ticks: [2, 10] },
      { size: 1.05, turn: -0.7, ticks: [8, 6] },
      { size: 1.3, turn: 0.5, ticks: [1, 14] },
    ].map((ring) => ({ ...ring, offset: 0 }));
    let links = [];
    let nextLink = 0;
    let start = null;
    let last = null;
    let frame;

    const strokePath = (points) => {
      sharp.beginPath();
      sharp.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) sharp.lineTo(points[i][0], points[i][1]);
      sharp.stroke();
    };

    const drawOrb = (ctx, x, y, size, alpha) => {
      ctx.globalAlpha = alpha;
      ctx.drawImage(sprite, x - size * 2, y - size * 2, size * 4, size * 4);
      ctx.globalAlpha = 1;
    };

    // Ponto da órbita de uma luz: elipse achatada e levemente inclinada
    const orbit = (comet, angle, radius, cx, cy) => {
      const ex = Math.cos(angle) * radius;
      const ey = Math.sin(angle) * radius * 0.4;
      return [
        cx + ex * Math.cos(comet.tilt) - ey * Math.sin(comet.tilt),
        cy + ex * Math.sin(comet.tilt) + ey * Math.cos(comet.tilt),
      ];
    };

    const tick = (now) => {
      start ??= now;
      const dt = (last ? Math.min(now - last, 50) : 16) / 1000;
      last = now;
      const p = Math.min((now - start) / DURATION, 1);
      callbacks.current.onProgress?.(p);

      const rect = originRef.current?.getBoundingClientRect();
      const cx = rect ? rect.left + rect.width / 2 : w / 2;
      const cy = rect ? rect.top + rect.height / 2 : h / 2;
      const r = rect ? rect.width * 0.35 : 120;
      // Na reta final tudo se espalha e alcança quem está perto
      const reach = p < 0.6 ? 1 : 1 + ((p - 0.6) / 0.4) ** 2 * (Math.max(w, h) / r) * 0.5;

      // Rastro: apaga só um pouco a cada quadro, então fica comprido
      trail.globalCompositeOperation = "destination-out";
      trail.fillStyle = "rgba(0,0,0,0.12)";
      trail.fillRect(0, 0, w, h);
      trail.globalCompositeOperation = "source-over";
      trail.lineCap = "round";
      trail.lineJoin = "round";

      sharp.clearRect(0, 0, w, h);
      sharp.globalCompositeOperation = "lighter";
      sharp.lineCap = "round";
      sharp.lineJoin = "round";

      // Anéis de frente pra tela, com marcas girando como runas
      const ringAlpha = Math.min(1, p * 3) * 0.7;
      for (const ring of rings) {
        ring.offset += ring.turn * (20 + 200 * p * p) * pace * dt;
        const radius = r * ring.size * (1 + 0.03 * Math.sin(now / 200)) * Math.min(reach, 1.5);
        sharp.strokeStyle = `rgba(${CYAN},${ringAlpha})`;
        sharp.lineWidth = 1;
        sharp.setLineDash([]);
        sharp.beginPath();
        sharp.arc(cx, cy, radius, 0, Math.PI * 2);
        sharp.stroke();
        sharp.lineWidth = 3;
        sharp.setLineDash(ring.ticks);
        sharp.lineDashOffset = ring.offset;
        sharp.beginPath();
        sharp.arc(cx, cy, radius - 6, 0, Math.PI * 2);
        sharp.stroke();
      }
      sharp.setLineDash([]);

      // Bolinhas: cada uma gira no próprio eixo tão rápido que parece tremer
      const shown = Math.min(orbs.length, Math.ceil(orbs.length * p * 2.5));
      const orbPoints = orbs.slice(0, shown).map((orb) => {
        orb.angle += 0.15 * pace * dt;
        orb.spin += (15 + 120 * p) * pace * dt;
        const radius = r * orb.radius * Math.min(reach, 2);
        const tremor = 1.5 + 3 * p;
        return [
          cx + Math.cos(orb.angle) * radius + Math.cos(orb.spin) * tremor,
          cy + Math.sin(orb.angle) * radius * 0.7 + Math.sin(orb.spin) * tremor,
          orb.size * (1 + 0.3 * p),
        ];
      });

      // Raios de uma bolinha pra outra: a corrente em volta, e com a carga
      // subindo, ligações extras que trocam de lugar
      if (now >= nextLink && orbPoints.length > 1) {
        const extra = Math.floor(5 * p);
        links = orbPoints.map((_, i) => [i, (i + 1) % orbPoints.length]);
        for (let k = 0; k < extra; k++) {
          const a = Math.floor(Math.random() * orbPoints.length);
          const b = Math.floor(Math.random() * orbPoints.length);
          if (a !== b) links.push([a, b]);
        }
        nextLink = now + (reduce ? 400 : 150 - 100 * p);
      }
      const jitter = reduce ? 0.1 : 0.15 + 0.25 * p;
      for (const [a, b] of links) {
        if (!orbPoints[a] || !orbPoints[b]) continue;
        const points = makeBolt(orbPoints[a][0], orbPoints[a][1], orbPoints[b][0], orbPoints[b][1], jitter);
        sharp.lineWidth = 4;
        sharp.strokeStyle = `rgba(${CYAN},0.35)`;
        strokePath(points);
        sharp.lineWidth = 1.2;
        sharp.strokeStyle = "rgba(255,255,255,0.9)";
        strokePath(points);
      }
      for (const [x, y, size] of orbPoints) drawOrb(sharp, x, y, size, 1);

      // Luzes correndo em volta com rastro comprido, cada vez mais rápidas
      const active = Math.min(comets.length, 2 + Math.round(3 * p));
      const omega = (2 + 25 * p * p) * pace;
      comets.slice(0, active).forEach((comet) => {
        const from = comet.angle;
        comet.angle += omega * comet.speed * dt;
        const radius = r * comet.radius * reach;
        // Na metade de cima da volta a luz passa atrás do Localizador
        const depth = 0.675 + 0.325 * Math.sin(comet.angle);

        // O trecho percorrido no quadro vira vários passos curtos: mesmo
        // rápido, o rastro sai curvo em vez de reto com quinas
        if (comet.drawn) {
          const steps = Math.ceil((comet.angle - from) / 0.05);
          trail.beginPath();
          for (let k = 0; k <= steps; k++) {
            const [x, y] = orbit(comet, from + ((comet.angle - from) * k) / steps, radius, cx, cy);
            if (k === 0) trail.moveTo(x, y);
            else trail.lineTo(x, y);
          }
          trail.lineWidth = comet.size * 2.2;
          trail.strokeStyle = `rgba(${CYAN},${0.6 * depth})`;
          trail.stroke();
          trail.lineWidth = comet.size * 0.8;
          trail.strokeStyle = `rgba(255,255,255,${0.95 * depth})`;
          trail.stroke();
        }
        const [x, y] = orbit(comet, comet.angle, radius, cx, cy);
        drawOrb(trail, x, y, comet.size, depth);
        comet.drawn = true;
      });

      // Tremor e a página por trás clareando antes do salto
      const s = Math.max(0, (p - 0.6) / 0.4);
      const shake = reduce ? 0 : s * 6;
      stageRef.current.style.transform = `translate(${(Math.random() - 0.5) * shake}px, ${(Math.random() - 0.5) * shake}px)`;
      veilRef.current.style.backgroundColor = `rgba(234,251,255,${s * 0.3})`;

      glowRef.current.style.opacity = String(p ** 1.5);
      const flicker = !reduce && p > 0.4 && Math.random() < 0.05 * p ? 0.25 : 0;
      flashRef.current.style.opacity = String(p > 0.85 ? ((p - 0.85) / 0.15) ** 2 : flicker);

      if (p < 1) frame = requestAnimationFrame(tick);
      else callbacks.current.onDone?.();
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.body.style.overflow = overflow;
    };
  }, [originRef]);

  return createPortal(
    <div aria-hidden="true" className="fixed inset-0 z-[80] pointer-events-auto">
      <div ref={veilRef} className="absolute inset-0" />
      <div ref={stageRef} className="absolute inset-0">
        <canvas ref={sharpRef} className="absolute inset-0 w-full h-full" />
        <canvas ref={trailRef} className="absolute inset-0 w-full h-full" />
      </div>
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0"
        style={{ boxShadow: `inset 0 0 160px 20px rgba(${CYAN},0.5)` }}
      />
      <div ref={flashRef} className="absolute inset-0 opacity-0 bg-[#EAFBFF]" />
    </div>,
    document.body,
  );
}
