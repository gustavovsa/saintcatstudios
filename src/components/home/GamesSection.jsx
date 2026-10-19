import { useState } from "react";
import { asset } from "../../utils/asset";
import { motion, AnimatePresence } from "framer-motion";
import { games, characters, reviews, progress, faq } from "../../data/content";

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 50 : -50 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -50 : 50 }),
};

export default function GamesSection() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const game = games[idx];
  const gameProgress = progress.games[game.id];
  const gameCharacters = characters.filter((char) =>
    char.gameIds?.includes(game.id),
  );
  const gameReviews = reviews.filter((review) => review.gameId === game.id);
  const gameFaq = faq.filter((item) => item.gameIds?.includes(game.id));
  const multi = games.length > 1;

  const go = (d) => {
    setDir(d);
    setIdx((i) => (i + d + games.length) % games.length);
  };

  return (
    <section
      id="jogos"
      className="relative isolate overflow-hidden py-28 px-6 bg-dark-900"
    >
      {game.heroBackground && (
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={asset(game.heroBackground)}
            alt=""
            className="w-full h-full object-cover mix-blend-screen"
            style={{
              opacity: game.heroBackgroundOpacity ?? 0.12,
              objectPosition: game.heroBackgroundPosition ?? "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/90 to-dark-900/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-transparent to-dark-900" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-20">
          <p className="font-cinzel text-gold text-[10px] tracking-[0.5em] uppercase mb-3">
            Universo
          </p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-medium text-white">
            Jogos
          </h2>
        </div>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={`game-${idx}`}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            {/* Art do jogo — lado direito no desktop */}
            <div className="md:order-2 flex justify-center">
              <div className="relative group">
                <div
                  className="absolute -inset-8 blur-3xl opacity-10 animate-glow-pulse rounded-full"
                  style={{ background: game.accentColor }}
                />
                {game.cover ? (
                  <img
                    src={asset(game.cover)}
                    alt={`${game.title} — arte`}
                    className="relative w-64 md:w-80 animate-float"
                  />
                ) : (
                  <div className="relative w-64 md:w-80 aspect-video bg-dark-800 border border-dark-600 flex items-center justify-center animate-float">
                    <span className="font-cinzel text-white/15 text-xs tracking-widest">
                      Arte em breve
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Texto */}
            <div className="md:order-1">
              <p
                className="font-cinzel text-[10px] tracking-[0.4em] uppercase mb-4"
                style={{ color: game.accentColor }}
              >
                {game.genre}
              </p>

              <h3 className="font-cinzel text-3xl md:text-4xl font-medium text-white mb-2">
                {game.title}
              </h3>
              <p className="font-cinzel text-white/25 text-sm tracking-wide mb-8">
                {game.subtitle}
              </p>
              <p className="text-white/45 text-sm leading-relaxed mb-10 max-w-md">
                {game.description}
              </p>

              {game.reasons?.length > 0 && (
                <div className="mb-10">
                  <h4 className="font-cinzel text-xs tracking-widest text-white/50 mb-4">
                    Por que jogar
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {game.reasons.map((reason) => (
                      <div
                        key={reason.title}
                        className="border border-dark-600 p-4"
                      >
                        <p className="font-cinzel text-sm text-white mb-2">
                          {reason.title}
                        </p>
                        <p className="text-white/35 text-xs leading-relaxed">
                          {reason.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progresso de desenvolvimento */}
              {gameProgress && (
                <div className="border border-dark-600 p-5">
                  <p className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">
                    Em desenvolvimento
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {gameProgress.items.map((item, i) => (
                      <span
                        key={i}
                        className={`font-cinzel text-[10px] tracking-wider px-3 py-1.5 border ${
                          item.done
                            ? "border-gold/30 text-gold/60"
                            : "border-dark-500 text-white/25"
                        }`}
                      >
                        {item.label}
                        {item.done
                          ? " ✓"
                          : item.detail
                            ? ` — ${item.detail}`
                            : ""}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/15 text-xs mt-4">
                    Atualizado em {gameProgress.updatedAt}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {gameCharacters.length > 0 && (
          <div className="mt-16">
            <h3 className="font-cinzel text-xl text-white/70 mb-8">
              Personagens do jogo
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {gameCharacters.map((char) => (
                <div key={char.id}>
                  <div className="aspect-square bg-dark-800 border border-dark-600 mb-3 overflow-hidden">
                    {char.image ? (
                      <img
                        src={asset(char.image)}
                        alt={char.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-cinzel text-white/10 text-2xl">
                          {char.name[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="font-cinzel text-sm text-white">{char.name}</p>
                  <p className="text-white/30 text-xs leading-snug mt-1">
                    {char.essence}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {gameReviews.length > 0 && (
          <div className="mt-16 max-w-3xl">
            <h3 className="font-cinzel text-xl text-white/70 mb-8">
              Avaliações do jogo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gameReviews.map((review) => (
                <blockquote
                  key={review.id}
                  className="border-l-2 border-dark-600 pl-6 py-2"
                >
                  <p className="text-white/50 text-sm leading-[1.9] mb-5 italic whitespace-pre-line">
                    "{review.text}"
                  </p>
                  <footer className="font-cinzel text-xs text-white/30">
                    {review.author}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        )}

        {gameFaq.length > 0 && (
          <div className="mt-16 max-w-2xl">
            <h3 className="font-cinzel text-xl text-white/70 mb-6">
              Dúvidas sobre o jogo
            </h3>
            {gameFaq.map((item, i) => (
              <details key={i} className="border-b border-dark-700 py-5">
                <summary className="font-cinzel text-sm text-white/60 hover:text-white/90 cursor-pointer">
                  {item.q}
                </summary>
                <p className="text-white/35 text-sm leading-[1.85] pt-4">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        )}

        {multi && (
          <div className="flex items-center justify-center gap-6 mt-16">
            <button
              onClick={() => go(-1)}
              className="font-cinzel text-white/25 hover:text-gold transition-colors text-lg"
            >
              ←
            </button>
            <div className="flex gap-2">
              {games.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDir(i > idx ? 1 : -1);
                    setIdx(i);
                  }}
                  className={`h-px rounded-full transition-all duration-400 ${i === idx ? "w-6 bg-gold" : "w-1.5 bg-dark-500"}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="font-cinzel text-white/25 hover:text-gold transition-colors text-lg"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
