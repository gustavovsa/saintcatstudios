import { useEffect, useRef } from "react";

// Chuva em canvas cobrindo a tela inteira (não bloqueia cliques)
const DROPS_PER_PIXEL = 0.00012; // densidade: gotas por pixel da tela
const WIND = -0.25; // inclinação: negativo = vento da direita
const COLOR = "162, 196, 224"; // azul gelo (ice) em RGB
const PARALLAX = 1; // quanto as gotas acompanham o scroll (0 = nada, 1 = presas à página)
const LAYERS = 4; // camadas de profundidade; cada uma é desenhada de uma vez só

export default function Rain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Quem prefere menos movimento vê uma chuva mais leve e lenta
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const density = calm ? DROPS_PER_PIXEL / 2 : DROPS_PER_PIXEL;
    const speedFactor = calm ? 0.5 : 1;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let drops = [];
    let frame;
    let lastScroll = window.scrollY;

    const newDrop = (randomY) => {
      const depth = Math.random(); // 0 = longe, 1 = perto
      return {
        depth,
        layer: Math.min(LAYERS - 1, Math.floor(depth * LAYERS)),
        x: Math.random() * (width + height * Math.abs(WIND)),
        y: randomY ? Math.random() * height : -20,
        length: 10 + depth * 18,
        speed: (8 + depth * 10) * speedFactor,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(width * height * density);
      drops = Array.from({ length: count }, () => newDrop(true));
    };

    const draw = () => {
      // Quanto a página rolou desde o último quadro
      const scrollDelta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";

      // Gotas da mesma camada têm a mesma cor e espessura: um traço só pra todas
      for (let layer = 0; layer < LAYERS; layer++) {
        const depth = (layer + 0.5) / LAYERS;
        ctx.strokeStyle = `rgba(${COLOR}, ${0.08 + depth * 0.22})`;
        ctx.lineWidth = 0.6 + depth * 0.8;
        ctx.beginPath();
        for (const drop of drops) {
          if (drop.layer !== layer) continue;
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x + WIND * drop.length, drop.y + drop.length);
        }
        ctx.stroke();
      }

      for (const drop of drops) {
        drop.x += WIND * drop.speed;
        // Paralaxe: gotas mais próximas acompanham mais o scroll
        drop.y += drop.speed - scrollDelta * PARALLAX * (0.3 + drop.depth * 0.7);

        // Quem sai por baixo volta pelo topo, e vice-versa (ao rolar pra baixo)
        if (drop.y > height) {
          Object.assign(drop, newDrop(false));
        } else if (drop.y < -drop.length * 2) {
          Object.assign(drop, newDrop(false), { y: height });
        }
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-40"
    />
  );
}
