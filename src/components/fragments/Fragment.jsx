import { useFragments } from "./FragmentsProvider";

// Brilho azul discreto que revela um fragmento ao ser clicado.
// `className` posiciona o brilho onde ele estiver escondido.
export default function Fragment({ id, className = "" }) {
  const { found, discover } = useFragments();
  const isFound = found.includes(id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        discover(id);
      }}
      aria-label={isFound ? `Fragmento ${id} (encontrado)` : "Fragmento escondido"}
      className={`group/fragment z-20 inline-flex h-5 w-5 items-center justify-center align-middle cursor-pointer ${className}`}
    >
      <span
        className={`block h-1.5 w-1.5 rounded-full bg-ice-light transition-transform duration-300 group-hover/fragment:scale-150 ${
          isFound
            ? "opacity-30"
            : "shadow-[0_0_8px_2px_rgba(162,196,224,0.6)] animate-fragment-pulse motion-reduce:animate-none motion-reduce:opacity-70"
        }`}
      />
    </button>
  );
}
