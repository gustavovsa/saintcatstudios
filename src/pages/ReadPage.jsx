import { Link, useParams } from "react-router-dom";
import { asset } from "../utils/asset";
import { motion } from "framer-motion";
import { books } from "../data/content";
import Fragment from "../components/fragments/Fragment";
import PdfPages from "../components/reader/PdfPages";

export default function ReadPage() {
  const { slug } = useParams();
  const book = books.find((item) => item.slug === slug);

  if (!book?.prologue?.available) {
    return (
      <main className="min-h-screen bg-dark-950 pt-32 px-6 text-center">
        <p className="font-cinzel text-white/60">Prólogo não disponível.</p>
        <Link
          to={book ? `/livros/${book.slug}` : "/"}
          className="inline-block mt-6 text-gold hover:text-gold-light"
        >
          Voltar
        </Link>
      </main>
    );
  }

  const { prologue } = book;

  return (
    <main className="min-h-screen bg-dark-950 pt-20 pb-32">
      {/* Header da leitura */}
      <div className="max-w-2xl mx-auto px-6 pt-10 pb-8 border-b border-dark-700 flex items-center justify-between">
        <div>
          <p className="font-cinzel text-gold text-[10px] tracking-[0.5em] uppercase mb-1">
            {book.title}
          </p>
          <p className="font-cinzel text-white/55 text-xs tracking-widest">
            {prologue.title || "Prólogo"}
            {/* Fragmento 12 */}
            {book.id === "the-storm-fall" && (
              <Fragment id={12} className="relative ml-1" />
            )}
          </p>
        </div>
        <Link
          to={`/livros/${book.slug}`}
          className="font-cinzel text-[10px] tracking-widest uppercase text-white/50 hover:text-white/90 transition-colors"
        >
          ← Voltar
        </Link>
      </div>

      {/* Texto */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto md:px-6 pt-8"
      >
        <div className="flex justify-end gap-4 mb-4 px-6 md:px-0">
          <a
            href={asset(prologue.pdfUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-cinzel text-[10px] tracking-widest uppercase text-white/70 hover:text-gold transition-colors"
          >
            Abrir em nova aba
          </a>
          <a
            href={asset(prologue.pdfUrl)}
            download
            className="font-cinzel text-[10px] tracking-widest uppercase text-white/70 hover:text-gold transition-colors"
          >
            Baixar PDF
          </a>
        </div>
        {/* Caixa de leitura do tamanho da tela (no celular, de borda a borda) */}
        <PdfPages
          url={asset(prologue.pdfUrl)}
          className="h-[calc(100svh-7rem)] bg-dark-900 border-y md:border border-dark-700"
          fallback={
            <p className="py-24 px-6 text-center text-white/70">
              Não foi possível mostrar o prólogo aqui.{" "}
              <a
                href={asset(prologue.pdfUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light"
              >
                Abra o PDF em uma nova aba.
              </a>
            </p>
          }
        />

        <div className="relative text-center py-16 px-6 border-t border-dark-700 mt-12">
          {/* Fragmento 13 */}
          {book.id === "the-storm-fall" && (
            <Fragment id={13} className="absolute bottom-4 right-6" />
          )}
          <p className="font-cinzel text-white/55 text-xs tracking-[0.4em] uppercase mb-5">
            Gostou?
          </p>
          <Link
            to={`/livros/${book.slug}`}
            className="font-cinzel text-[11px] tracking-[0.25em] uppercase px-8 py-3 border border-white/20 text-white/60 hover:border-gold/50 hover:text-gold transition-all duration-300"
          >
            Voltar para {book.title}
          </Link>
        </div>
      </motion.article>
    </main>
  );
}
