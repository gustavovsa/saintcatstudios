import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useFragments } from "./FragmentsProvider";
import Activation from "./Activation";
import { asset } from "../../utils/asset";

const MODEL = "/models/O Localizador.glb";
const GLOW = [0.3, 0.45, 0.6]; // brilho azul gelo do vidro quando desperta

// Modelo 3D do Localizador: apagado enquanto faltam fragmentos,
// brilha e gira mais rápido quando os 13 são encontrados.
// Depois disso, pode ser ativado: teletransporta pra /localizado
export default function Localizador() {
  const { found, total, complete } = useFragments();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const modelRef = useRef(null);
  const viewerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [activating, setActivating] = useState(false);

  // Durante a ativação: gira cada vez mais rápido e o vidro vai ao branco
  const charge = useCallback((p) => {
    const viewer = viewerRef.current;
    if (!viewer?.loaded) return;
    viewer.setAttribute("rotation-per-second", `${60 + 1500 * p * p}deg`);
    const k = Math.min(p * 1.5, 1);
    for (const material of viewer.model.materials) {
      if (material.pbrMetallicRoughness.baseColorTexture?.texture) continue;
      material.setEmissiveFactor(GLOW.map((c) => c + (1 - c) * k));
    }
  }, []);

  const teleport = useCallback(() => {
    navigate("/localizado", { state: { arrived: true } });
  }, [navigate]);

  // Só baixa o visualizador 3D quando a seção chega perto da tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        // O modelo é comprimido com Draco; o decodificador vem de public/draco/
        // (sem isso o model-viewer buscaria no servidor do Google)
        window.ModelViewerElement = {
          ...window.ModelViewerElement,
          dracoDecoderLocation: asset("/draco/"),
        };
        import("@google/model-viewer").then(() => setReady(true));
      },
      { rootMargin: "400px" },
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // Acende o vidro quando desperta (o metal texturizado fica como está)
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const applyGlow = () => {
      for (const material of viewer.model?.materials ?? []) {
        if (material.pbrMetallicRoughness.baseColorTexture?.texture) continue;
        material.setEmissiveFactor(complete ? GLOW : [0, 0, 0]);
      }
    };

    if (viewer.loaded) applyGlow();
    viewer.addEventListener("load", applyGlow);
    return () => viewer.removeEventListener("load", applyGlow);
  }, [ready, complete]);

  return (
    <div ref={wrapperRef} className="relative w-64 md:w-80 flex flex-col items-center">
      {/* Halo atrás do modelo */}
      <div
        className={`absolute inset-0 rounded-full blur-3xl transition-opacity duration-1000 ${
          complete ? "opacity-40 animate-glow-pulse" : "opacity-0"
        }`}
        style={{ background: "radial-gradient(circle, #A2C4E0, transparent 65%)" }}
      />

      <motion.div
        animate={complete ? { y: -8, scale: 1.05 } : { y: 0, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        ref={modelRef}
        className="relative w-full aspect-square"
        style={{
          filter: complete
            ? "drop-shadow(0 0 24px rgba(162,196,224,0.8))"
            : "brightness(0.55) saturate(0.6)",
          transition: "filter 1.5s ease",
        }}
      >
        {ready && (
          <model-viewer
            ref={viewerRef}
            src={asset(MODEL)}
            alt="O Localizador"
            camera-controls
            disable-zoom
            disable-pan
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second={complete ? "60deg" : "12deg"}
            interaction-prompt="none"
            shadow-intensity="0"
            exposure={complete ? "1.4" : "0.9"}
            style={{ width: "100%", height: "100%", background: "transparent" }}
          />
        )}
      </motion.div>

      <p
        className={`relative mt-2 font-cinzel text-[10px] tracking-[0.4em] uppercase transition-colors duration-1000 ${
          complete ? "text-gold" : "text-white/45"
        }`}
      >
        O Localizador · {found.length}/{total}
      </p>

      <AnimatePresence>
        {complete && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mt-5"
          >
            <button
              onClick={() => setActivating(true)}
              disabled={activating}
              className="font-cinzel text-[11px] tracking-[0.3em] uppercase px-6 py-2.5 border border-ice/40 text-ice hover:bg-ice/10 hover:border-ice/70 shadow-[0_0_24px_-6px_rgba(162,196,224,0.6)] transition-all duration-300 disabled:opacity-50"
            >
              Ativar o Localizador
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {activating && (
        <Activation originRef={modelRef} onProgress={charge} onDone={teleport} />
      )}
    </div>
  );
}
