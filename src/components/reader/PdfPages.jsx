import { useEffect, useRef, useState } from "react";

// O pdf.js desenha o PDF no próprio site: funciona no celular, onde o
// navegador não mostra PDF dentro de iframe. Só é baixado na página de leitura
let pdfjsPromise;
function loadPdfjs() {
  pdfjsPromise ??= Promise.all([
    import("pdfjs-dist/legacy/build/pdf.mjs"),
    import("pdfjs-dist/legacy/build/pdf.worker.min.mjs?url"),
  ]).then(([pdfjs, worker]) => {
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
    return pdfjs;
  });
  return pdfjsPromise;
}

// Todas as páginas do PDF, uma embaixo da outra, na largura disponível
export default function PdfPages({ url, fallback }) {
  const [doc, setDoc] = useState(null);
  const [ratios, setRatios] = useState([]); // altura/largura de cada página
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let task;

    loadPdfjs()
      .then(async (pdfjs) => {
        task = pdfjs.getDocument(url);
        const pdf = await task.promise;
        const sizes = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const { width, height } = (await pdf.getPage(i)).getViewport({ scale: 1 });
          sizes.push(height / width);
        }
        if (cancelled) return;
        setDoc(pdf);
        setRatios(sizes);
      })
      .catch(() => !cancelled && setFailed(true));

    return () => {
      cancelled = true;
      task?.destroy();
    };
  }, [url]);

  if (failed) return fallback;

  if (!doc) {
    return (
      <p className="py-24 text-center font-cinzel text-xs tracking-[0.3em] uppercase text-white/50">
        Carregando…
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      {ratios.map((ratio, i) => (
        <PdfPage key={i} doc={doc} number={i + 1} ratio={ratio} />
      ))}
    </div>
  );
}

// Uma página: só desenha quando chega perto da tela, e redesenha
// se a largura mudar (girar o celular, redimensionar a janela)
function PdfPage({ doc, number, ratio }) {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const [near, setNear] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const box = boxRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: "1000px 0px" },
    );
    const resizer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(box);
    resizer.observe(box);
    return () => {
      observer.disconnect();
      resizer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!near || !width) return;
    let cancelled = false;
    let task;

    doc.getPage(number).then((page) => {
      if (cancelled) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale: (width * dpr) / page.getViewport({ scale: 1 }).width });
      const canvas = canvasRef.current;
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      task = page.render({ canvasContext: canvas.getContext("2d"), viewport });
      task.promise.catch(() => {}); // cancelado ao sair da página ou redimensionar
    });

    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, number, near, width]);

  return (
    <div ref={boxRef} className="relative w-full bg-white" style={{ aspectRatio: `1 / ${ratio}` }}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Página ${number}`}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
