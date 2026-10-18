import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { books, characters, reviews, progress, faq } from "../data/content";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

// ─── Componente de label de seção ─────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p className="font-cinzel text-[10px] tracking-[0.5em] uppercase text-gold mb-4">
      {children}
    </p>
  );
}

// ─── 1. Hero ──────────────────────────────────────────────────────────────────
function BookHero({ book }) {
  return (
    <section className="relative min-h-[90vh] flex items-end pb-20 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950">
        {book.heroBackground && (
          <img
            src={encodeURI(book.heroBackground)}
            alt=""
            className="w-full h-full object-cover"
            style={{
              opacity: book.heroBackgroundOpacity ?? 0.18,
              objectPosition: book.heroBackgroundPosition ?? "center",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-dark-950/30" />
        <div
          className="absolute inset-0 opacity-10 blur-[100px] animate-glow-pulse"
          style={{
            background: `radial-gradient(ellipse at 50% 60%, ${book.accentColor}, transparent 60%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        {/* Capa flutuando */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center md:justify-start"
        >
          <div className="relative">
            <div
              className="absolute -inset-8 blur-3xl opacity-20 animate-glow-pulse rounded-full"
              style={{ background: book.accentColor }}
            />
            {book.cover ? (
              <img
                src={book.cover}
                alt={book.coverAlt}
                className="relative w-52 md:w-64 shadow-2xl animate-float"
              />
            ) : (
              <div className="relative w-52 md:w-64 aspect-[2/3] bg-dark-800 border border-dark-600 flex items-center justify-center animate-float">
                <span className="font-cinzel text-white/15 text-xs">
                  capa em breve
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-cinzel text-[10px] tracking-[0.4em] uppercase mb-4"
            style={{ color: book.accentColor }}
          >
            {book.series}
          </p>
          <h1 className="font-cinzel text-4xl md:text-5xl font-medium text-white mb-2">
            {book.title}
          </h1>
          <p className="font-cinzel text-white/30 text-sm tracking-wide mb-8">
            {book.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            {book.available && book.buyLink ? (
              <a
                href={book.buyLink}
                className="font-cinzel text-[11px] tracking-[0.25em] uppercase px-8 py-3 bg-gold text-dark-950 hover:bg-gold-light transition-colors"
              >
                Garantir exemplar
              </a>
            ) : (
              <span className="font-cinzel text-[11px] tracking-widest uppercase px-8 py-3 border border-dark-500 text-white/20 cursor-default">
                Em breve
              </span>
            )}
            {book.prologue?.available && (
              <Link
                to={`/livros/${book.slug}/ler`}
                className="font-cinzel text-[11px] tracking-[0.25em] uppercase px-8 py-3 border border-white/20 text-white/50 hover:border-gold/50 hover:text-gold transition-all duration-300"
              >
                Ler prólogo
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 2. Sinopse ───────────────────────────────────────────────────────────────
function Synopsis({ book }) {
  return (
    <section className="py-24 px-6 bg-dark-950">
      <div className="max-w-2xl mx-auto">
        <motion.div {...fadeUp()}>
          <SectionLabel>A história</SectionLabel>
          <div className="space-y-5">
            {book.synopsis.split("\n\n").map((para, i) => (
              <p key={i} className="text-white/55 text-base leading-[1.9]">
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 3. Identificação emocional ───────────────────────────────────────────────
function EmotionalSection({ content }) {
  if (!content) return null;

  return (
    <section className="py-24 px-6 bg-dark-900">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div {...fadeUp()}>
          <blockquote className="font-cinzel text-xl md:text-2xl font-medium text-white/80 leading-[1.6] mb-8">
            {content.quote}
          </blockquote>
          <p className="text-white/35 text-sm leading-relaxed max-w-lg mx-auto">
            {content.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 4. Galeria de artes ──────────────────────────────────────────────────────
function Gallery({ images }) {
  if (images.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-dark-950 overflow-x-auto">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp()}>
          <SectionLabel>Arte & universo</SectionLabel>
        </motion.div>
        <div className="flex gap-4 pb-4">
          {images.map((img, i) => (
            <motion.img
              key={i}
              {...fadeUp(i * 0.08)}
              src={img.src}
              alt={img.alt}
              className="h-64 md:h-80 w-auto object-cover shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. Leitura gratuita ──────────────────────────────────────────────────────
function FreeRead({ book }) {
  if (!book.prologue?.available) return null;

  return (
    <section className="py-24 px-6 bg-dark-900">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div {...fadeUp()}>
          <SectionLabel>Leitura gratuita</SectionLabel>
          <h2 className="font-cinzel text-2xl md:text-3xl font-medium text-white mb-4">
            {book.prologue.heading || "Comece agora. Sem compromisso."}
          </h2>
          <p className="text-white/35 text-sm leading-relaxed mb-10">
            {book.prologue.description ||
              "O prólogo está disponível. Leia antes de decidir qualquer coisa."}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to={`/livros/${book.slug}/ler`}
              className="font-cinzel text-[11px] tracking-[0.25em] uppercase px-8 py-3 bg-gold text-dark-950 hover:bg-gold-light transition-colors"
            >
              Ler no site
            </Link>
            {book.prologue.pdfUrl && (
              <a
                href={encodeURI(book.prologue.pdfUrl)}
                download
                className="font-cinzel text-[11px] tracking-[0.25em] uppercase px-8 py-3 border border-white/20 text-white/50 hover:border-gold/50 hover:text-gold transition-all duration-300"
              >
                Baixar PDF
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 6. Personagens ───────────────────────────────────────────────────────────
function Characters({ characters: bookCharacters }) {
  if (bookCharacters.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-dark-950">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp()} className="mb-12">
          <SectionLabel>Os escolhidos</SectionLabel>
          <h2 className="font-cinzel text-2xl md:text-3xl font-medium text-white">
            Personagens
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {bookCharacters.map((char, i) => (
            <motion.div key={char.id} {...fadeUp(i * 0.07)} className="group">
              {/* Avatar */}
              <div className="aspect-square bg-dark-800 border border-dark-600 mb-3 overflow-hidden">
                {char.image ? (
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-cinzel text-white/10 text-2xl">
                      {char.name[0]}
                    </span>
                  </div>
                )}
              </div>
              <p className="font-cinzel text-sm font-medium text-white group-hover:text-gold transition-colors">
                {char.name}
              </p>
              <p className="text-white/30 text-xs leading-snug mt-1">
                {char.essence}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. Motivos para comprar ──────────────────────────────────────────────────
function WhyBuy({ reasons }) {
  if (reasons.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp()} className="mb-12">
          <SectionLabel>Por que ler</SectionLabel>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.08)}
              className="border border-dark-600 p-6 hover:border-gold/20 transition-colors duration-300"
            >
              <span className="text-gold text-2xl mb-4 block">{r.icon}</span>
              <h3 className="font-cinzel text-sm font-medium text-white mb-3">
                {r.title}
              </h3>
              <p className="text-white/35 text-xs leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 8. Avaliações ────────────────────────────────────────────────────────────
function Reviews({ reviews: bookReviews }) {
  if (bookReviews.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-dark-950">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp()} className="mb-12">
          <SectionLabel>Quem já leu</SectionLabel>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookReviews.map((r, i) => (
            <motion.div
              key={r.id}
              {...fadeUp(i * 0.1)}
              className="border-l-2 border-dark-600 pl-6 py-2"
            >
              <p className="text-white/50 text-sm leading-[1.9] mb-5 italic whitespace-pre-line">
                "{r.text}"
              </p>
              <p className="font-cinzel text-xs text-white/30">
                {r.author}, {r.age} anos
                {r.context && (
                  <span className="text-white/15"> — {r.context}</span>
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 9. Progresso ─────────────────────────────────────────────────────────────
function Progress({ bookProgress }) {
  if (!bookProgress) return null;

  return (
    <section className="py-24 px-6 bg-dark-900">
      <div className="max-w-2xl mx-auto">
        <motion.div {...fadeUp()} className="mb-12">
          <SectionLabel>Em produção</SectionLabel>
          <h2 className="font-cinzel text-2xl font-medium text-white">
            Acompanhe ao vivo
          </h2>
        </motion.div>

        {bookProgress && (
          <motion.div {...fadeUp(0.1)} className="mb-10">
            <div className="flex justify-between items-baseline mb-3">
              <p className="font-cinzel text-xs tracking-widest text-white/50">
                {bookProgress.label}
              </p>
              <p className="font-cinzel text-xs text-white/25">
                {bookProgress.percent}%
              </p>
            </div>
            <div className="h-px bg-dark-600 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${bookProgress.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gold/50 rounded-full"
              />
            </div>
            <p className="text-white/20 text-xs mt-2">
              {bookProgress.status} · {bookProgress.updatedAt}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── 10. Sobre o autor ────────────────────────────────────────────────────────
function Author({ author }) {
  if (!author) return null;

  return (
    <section className="py-24 px-6 bg-dark-950">
      <div className="max-w-2xl mx-auto">
        <motion.div
          {...fadeUp()}
          className="flex flex-col md:flex-row gap-10 items-start"
        >
          {/* Foto */}
          <div className="w-24 h-24 md:w-32 md:h-32 bg-dark-800 border border-dark-600 shrink-0 overflow-hidden">
            {author.image && (
              <img
                src={author.image}
                alt={author.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div>
            <SectionLabel>O autor</SectionLabel>
            <h2 className="font-cinzel text-xl font-medium text-white mb-5">
              {author.name}
            </h2>
            <div className="space-y-4 text-white/45 text-sm leading-[1.9]">
              {author.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 11. CTA final ────────────────────────────────────────────────────────────
function BookCTA({ book }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: integrar com Mailchimp / Resend / sua solução de e-mail
    console.log("E-mail capturado:", email);
    setSent(true);
  };

  return (
    <section className="py-28 px-6 bg-dark-900">
      <div className="max-w-xl mx-auto text-center">
        <motion.div {...fadeUp()}>
          {book.available && book.buyLink ? (
            <>
              <SectionLabel>Garanta o seu</SectionLabel>
              <h2 className="font-cinzel text-2xl md:text-3xl font-medium text-white mb-8">
                Pronto para entrar no universo?
              </h2>
              <a
                href={book.buyLink}
                className="font-cinzel text-[11px] tracking-[0.25em] uppercase px-10 py-4 bg-gold text-dark-950 hover:bg-gold-light transition-colors"
              >
                Garantir meu exemplar
              </a>
            </>
          ) : (
            <>
              <SectionLabel>Seja o primeiro a saber</SectionLabel>
              <h2 className="font-cinzel text-2xl md:text-3xl font-medium text-white mb-4">
                O livro está chegando.
              </h2>
              <p className="text-white/30 text-sm mb-10">
                Deixa seu e-mail. Quando estiver pronto, você é avisado antes de
                qualquer um.
              </p>
              {sent ? (
                <p className="font-cinzel text-gold text-sm tracking-widest">
                  Anotado. Você será o primeiro a saber.
                </p>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex gap-0 max-w-sm mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="flex-1 bg-dark-800 border border-dark-600 border-r-0 px-4 py-3 text-sm text-white/60 placeholder:text-white/20 outline-none focus:border-gold/30 transition-colors"
                  />
                  <button
                    type="submit"
                    className="font-cinzel text-[10px] tracking-widest uppercase px-6 py-3 bg-gold text-dark-950 hover:bg-gold-light transition-colors shrink-0"
                  >
                    Entrar
                  </button>
                </form>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 12. FAQ ──────────────────────────────────────────────────────────────────
function FAQ({ items }) {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 px-6 bg-dark-950">
      <div className="max-w-2xl mx-auto">
        <motion.div {...fadeUp()} className="mb-12">
          <SectionLabel>Dúvidas</SectionLabel>
        </motion.div>
        <div>
          {items.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.06)}
              className="border-b border-dark-700 last:border-0"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center py-5 text-left gap-4"
              >
                <span className="font-cinzel text-sm text-white/60 hover:text-white/90 transition-colors">
                  {item.q}
                </span>
                <span className="text-white/25 shrink-0 text-lg leading-none">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: open === i ? "auto" : 0,
                  opacity: open === i ? 1 : 0,
                }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="text-white/35 text-sm leading-[1.85] pb-5">
                  {item.a}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Página completa ──────────────────────────────────────────────────────────
export default function BookPage() {
  const { slug } = useParams();
  const book = books.find((item) => item.slug === slug);

  if (!book) {
    return (
      <main className="min-h-screen bg-dark-950 pt-32 px-6 text-center">
        <p className="font-cinzel text-white/60">Livro não encontrado.</p>
        <Link
          to="/"
          className="inline-block mt-6 text-gold hover:text-gold-light"
        >
          Voltar ao início
        </Link>
      </main>
    );
  }

  const bookCharacters = characters.filter((char) =>
    char.bookIds?.includes(book.id),
  );
  const bookReviews = reviews.filter((review) => review.bookId === book.id);
  const bookProgress = progress.books[book.id];
  const bookFaq = faq.filter((item) => item.bookIds?.includes(book.id));

  return (
    <main>
      <BookHero book={book} />
      <Synopsis book={book} />
      <EmotionalSection content={book.emotional} />
      <Gallery images={book.gallery} />
      <FreeRead book={book} />
      <Characters characters={bookCharacters} />
      <WhyBuy reasons={book.reasons} />
      <Reviews reviews={bookReviews} />
      <Progress bookProgress={bookProgress} />
      <Author author={book.author} />
      <BookCTA book={book} />
      <FAQ items={bookFaq} />
    </main>
  );
}
