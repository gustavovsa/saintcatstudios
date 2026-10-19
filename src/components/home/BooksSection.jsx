import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { books } from '../../data/content'
import { asset } from '../../utils/asset'

const variants = {
  enter: dir => ({ opacity: 0, x: dir > 0 ? 50 : -50 }),
  center:      { opacity: 1, x: 0 },
  exit:  dir => ({ opacity: 0, x: dir > 0 ? -50 : 50 }),
}

export default function BooksSection() {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [compact, setCompact] = useState(false)

  const book = books[idx]
  const multi = books.length > 1

  const go = (d) => {
    setDir(d)
    setIdx(i => (i + d + books.length) % books.length)
  }

  return (
    <section id="livros" className="py-28 px-6 bg-dark-950">
      <div className="max-w-7xl mx-auto">

        {/* Cabeçalho da seção */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <p className="font-cinzel text-gold text-[10px] tracking-[0.5em] uppercase mb-3">Universo</p>
            <h2 className="font-cinzel text-3xl md:text-4xl font-medium text-white">Livros</h2>
          </div>
          {multi && (
            <button
              onClick={() => setCompact(c => !c)}
              className="font-cinzel text-[11px] tracking-widest uppercase text-white/25 hover:text-white/60 transition-colors"
            >
              {compact ? 'Expandir' : 'Ver todos'}
            </button>
          )}
        </div>

        <AnimatePresence mode="wait" custom={dir}>
          {!compact ? (
            /* ── Vista expandida (um livro por vez) ── */
            <motion.div
              key={`book-${idx}`}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            >
              {/* Capa */}
              <div className="flex justify-center">
                <div className="relative group cursor-default">
                  {/* Glow por trás da capa */}
                  <div
                    className="absolute -inset-8 blur-3xl opacity-15 transition-opacity duration-700 group-hover:opacity-25 rounded-full animate-glow-pulse"
                    style={{ background: book.accentColor }}
                  />
                  {book.cover ? (
                    <motion.img
                      src={asset(book.cover)}
                      alt={book.coverAlt}
                      className="relative w-52 md:w-64 shadow-2xl animate-float"
                    />
                  ) : (
                    /* Placeholder enquanto não tem capa */
                    <div className="relative w-52 md:w-64 aspect-[2/3] bg-dark-800 border border-dark-600 flex items-center justify-center animate-float">
                      <span className="font-cinzel text-white/15 text-xs tracking-widest">Em breve</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Texto */}
              <div>
                <p
                  className="font-cinzel text-[10px] tracking-[0.4em] uppercase mb-4"
                  style={{ color: book.accentColor }}
                >
                  {book.genre}
                </p>

                <h3 className="font-cinzel text-3xl md:text-4xl font-medium text-white mb-2">
                  {book.title}
                </h3>
                <p className="font-cinzel text-white/25 text-sm tracking-wide mb-1">{book.subtitle}</p>
                <p className="font-cinzel text-white/15 text-xs tracking-widest mb-8">{book.series}</p>

                <p className="text-white/45 text-sm leading-relaxed mb-10 max-w-md whitespace-pre-line">
                  {/* Mostra só o primeiro parágrafo na home */}
                  {book.synopsis.split('\n\n')[0]}
                </p>

                <div className="flex items-center gap-5 flex-wrap">
                  <Link
                    to={`/livros/${book.slug}`}
                    className="font-cinzel text-[11px] tracking-[0.25em] uppercase px-7 py-3
                               border border-white/20 text-white/50 hover:border-gold/50 hover:text-gold
                               transition-all duration-300"
                  >
                    Conhecer →
                  </Link>

                  {book.available ? (
                    <a
                      href={book.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-cinzel text-[11px] tracking-[0.25em] uppercase px-7 py-3
                                 bg-gold text-dark-950 hover:bg-gold-light transition-colors duration-300"
                    >
                      Comprar
                    </a>
                  ) : (
                    <span className="font-cinzel text-[11px] tracking-widest uppercase text-white/15">
                      {book.status}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

          ) : (
            /* ── Vista compacta (grid de capas) ── */
            <motion.div
              key="compact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            >
              {books.map(b => (
                <Link key={b.id} to={`/livros/${b.slug}`} className="group block">
                  <div className="aspect-[2/3] bg-dark-800 border border-dark-700 overflow-hidden mb-3">
                    {b.cover && (
                      <img
                        src={asset(b.cover)}
                        alt={b.coverAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <p className="font-cinzel text-xs text-white/40 group-hover:text-gold transition-colors">
                    {b.title}
                  </p>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navegação do carrossel */}
        {multi && !compact && (
          <div className="flex items-center justify-center gap-6 mt-16">
            <button
              onClick={() => go(-1)}
              className="font-cinzel text-white/25 hover:text-gold transition-colors text-lg"
              aria-label="Livro anterior"
            >
              ←
            </button>
            <div className="flex gap-2 items-center">
              {books.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i) }}
                  aria-label={`Ir para livro ${i + 1}`}
                  className={`h-px rounded-full transition-all duration-400 ${
                    i === idx ? 'w-6 bg-gold' : 'w-1.5 bg-dark-500 hover:bg-dark-400'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="font-cinzel text-white/25 hover:text-gold transition-colors text-lg"
              aria-label="Próximo livro"
            >
              →
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
