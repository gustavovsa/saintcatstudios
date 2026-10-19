import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fragments } from "../../data/fragments";

// Progresso dos Fragmentos, salvo no navegador de quem visita
const STORAGE_KEY = "saintcat:fragmentos";
const TOTAL = fragments.length;

const FragmentsContext = createContext(null);

function loadFound() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved.filter((id) => fragments.some((f) => f.id === id)) : [];
  } catch {
    return [];
  }
}

function saveFound(found) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // Navegador bloqueou o armazenamento: o jogo segue, só não guarda
  }
}

export function useFragments() {
  return useContext(FragmentsContext);
}

export function FragmentsProvider({ children }) {
  const [found, setFound] = useState(loadFound);
  const [openId, setOpenId] = useState(null);

  const discover = useCallback((id) => {
    setFound((current) => {
      if (current.includes(id)) return current;
      const next = [...current, id];
      saveFound(next);
      return next;
    });
    setOpenId(id);
  }, []);

  const value = {
    found,
    total: TOTAL,
    complete: found.length === TOTAL,
    discover,
  };

  return (
    <FragmentsContext.Provider value={value}>
      {children}
      <FragmentCounter count={found.length} />
      <FragmentDialog
        fragment={fragments.find((f) => f.id === openId)}
        count={found.length}
        onClose={() => setOpenId(null)}
      />
    </FragmentsContext.Provider>
  );
}

// Contador discreto; só aparece depois do primeiro fragmento encontrado
function FragmentCounter({ count }) {
  if (count === 0) return null;
  const complete = count === TOTAL;

  return (
    <div
      title="Fragmentos encontrados"
      className={`fixed bottom-4 left-4 z-50 font-cinzel text-[11px] tracking-widest px-3 py-1.5 border bg-dark-950/80 backdrop-blur-sm ${
        complete ? "text-gold border-gold/40" : "text-ice/80 border-ice/20"
      }`}
    >
      ◆ {count}/{TOTAL}
    </div>
  );
}

function FragmentDialog({ fragment, count, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!fragment) return;
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [fragment, onClose]);

  const complete = count === TOTAL;

  return (
    <AnimatePresence>
      {fragment && (
        <motion.div
          key="fragment-dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center px-6 bg-dark-950/80 backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="fragment-title"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-dark-900 border border-ice/25 p-8 shadow-[0_0_60px_-10px_rgba(162,196,224,0.35)]"
          >
            <p className="font-cinzel text-ice text-[10px] tracking-[0.4em] uppercase mb-3">
              Fragmento {fragment.id} de {TOTAL}
            </p>
            <h2
              id="fragment-title"
              className="font-cinzel text-xl font-medium text-white mb-5"
            >
              {fragment.title}
            </h2>
            <p className="text-white/75 text-sm leading-[1.9] whitespace-pre-line">
              {fragment.text}
            </p>

            <div className="mt-8 pt-5 border-t border-dark-700 flex items-center justify-between gap-4">
              {complete ? (
                <a
                  href={import.meta.env.BASE_URL + "#jogos"}
                  onClick={onClose}
                  className="font-cinzel text-[11px] tracking-widest text-gold hover:text-gold-light"
                >
                  Todos encontrados. O Localizador despertou →
                </a>
              ) : (
                <p className="font-cinzel text-[11px] tracking-widest text-white/50">
                  {count}/{TOTAL} encontrados
                </p>
              )}
              <button
                ref={closeRef}
                onClick={onClose}
                className="font-cinzel text-[10px] tracking-widest uppercase text-white/55 hover:text-white/90 transition-colors"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
