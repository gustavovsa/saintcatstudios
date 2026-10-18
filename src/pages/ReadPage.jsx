import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { books } from "../data/content";

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
          <p className="font-cinzel text-white/30 text-xs tracking-widest">
            {prologue.title || "Prólogo"}
          </p>
        </div>
        <Link
          to={`/livros/${book.slug}`}
          className="font-cinzel text-[10px] tracking-widest uppercase text-white/25 hover:text-white/60 transition-colors"
        >
          ← Voltar
        </Link>
      </div>

      {/* Texto */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto px-6 pt-8"
      >
        <div className="flex justify-end gap-4 mb-4">
          <a
            href={encodeURI(prologue.pdfUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-cinzel text-[10px] tracking-widest uppercase text-white/50 hover:text-gold transition-colors"
          >
            Abrir em nova aba
          </a>
          <a
            href={encodeURI(prologue.pdfUrl)}
            download
            className="font-cinzel text-[10px] tracking-widest uppercase text-white/50 hover:text-gold transition-colors"
          >
            Baixar PDF
          </a>
        </div>
        <iframe
          src={encodeURI(prologue.pdfUrl)}
          title={`${book.title} — ${prologue.title || "Prólogo"}`}
          className="w-full min-h-[75vh] aspect-[8.5/11] border border-dark-700 bg-white"
        >
          <p className="p-6 text-dark-950">
            Seu navegador não conseguiu exibir o PDF.{" "}
            <a
              href={encodeURI(prologue.pdfUrl)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abra o arquivo em uma nova aba.
            </a>
          </p>
        </iframe>

        <div className="text-center py-16 border-t border-dark-700 mt-12">
          <p className="font-cinzel text-white/30 text-xs tracking-[0.4em] uppercase mb-5">
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
