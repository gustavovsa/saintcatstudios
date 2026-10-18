import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

const heroSlides = [
  { src: "/images/herosection/sc/tsf/Ana 3.png", position: "center" },
  { src: "/images/herosection/sc/tsf/Carol 3.png", position: "center" },
  { src: "/images/herosection/sc/tsf/Dayllon 3.png", position: "center" },
  { src: "/images/herosection/sc/tsf/Gusto 3.png", position: "center" },
  { src: "/images/herosection/sc/tsf/H 3.png", position: "center" },
  { src: "/images/herosection/sc/tsf/Laura 3.png", position: "center" },
];

const slideDuration = 10000;
const panDuration = 12000;
const fadeDuration = 1.5;

function HeroSlide({ slide, index, isActive }) {
  const controls = useAnimationControls();
  const startX = index % 2 === 0 ? "12vw" : "24vw";
  const endX = index % 2 === 0 ? "24vw" : "12vw";
  const scale = 1.08;

  useEffect(() => {
    if (!isActive) {
      controls.start({
        opacity: 0,
        transition: { opacity: { duration: fadeDuration } },
      });
      return;
    }

    controls.set({
      opacity: 0,
      x: startX,
      scale,
    });
    controls.start({
      opacity: 0.32,
      x: endX,
      scale,
      transition: {
        opacity: { duration: fadeDuration, ease: "easeInOut" },
        x: { duration: panDuration / 1000, ease: "linear" },
        scale: { duration: panDuration / 1000, ease: "linear" },
      },
    });
  }, [
    controls,
    endX,
    isActive,
    scale,
    startX,
  ]);

  return (
    <motion.img
      src={encodeURI(slide.src)}
      alt=""
      aria-hidden="true"
      className="absolute top-0 left-[-25%] h-full w-[150%] object-cover"
      initial={{ opacity: 0 }}
      animate={controls}
      style={{ objectPosition: slide.position }}
    />
  );
}

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, slideDuration); // Tempo entre a troca de imagens, em milissegundos.

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <HeroSlide
            key={slide.src}
            slide={slide}
            index={index}
            isActive={index === activeSlide}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-radial from-dark-800/30 via-dark-950 to-dark-950" />
        {/* Glow sutil no centro */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-ice/5 blur-[120px] animate-glow-pulse" />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.p
          {...fade(0.3)}
          className="font-cinzel text-gold text-[10px] tracking-[0.5em] uppercase mb-8"
        >
          A Writer's Story
        </motion.p>

        <motion.h1
          {...fade(0.5)}
          className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-[1.15] mb-6"
        >
          O universo que começou
          <br />
          <span className="text-gradient-gold">antes do tempo</span>
        </motion.h1>

        <motion.p
          {...fade(0.75)}
          className="text-white/40 text-sm md:text-base leading-relaxed mb-12 max-w-md mx-auto"
        >
          Livros, jogos e histórias que atravessam eras.
        </motion.p>

        <motion.div
          {...fade(0.9)}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="#livros"
            className="font-cinzel text-[11px] tracking-[0.25em] uppercase px-8 py-3
                       bg-gold text-dark-950 hover:bg-gold-light transition-colors duration-300"
          >
            Explorar
          </a>
          <a
            href="#novidades"
            className="font-cinzel text-[11px] tracking-[0.25em] uppercase px-8 py-3
                       border border-white/15 text-white/40 hover:border-gold/40 hover:text-gold
                       transition-all duration-300"
          >
            Novidades
          </a>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-transparent to-gold/30 mx-auto"
        />
      </motion.div>
    </section>
  );
}
