import { motion, useReducedMotion } from "framer-motion";
import { news, books, games } from "../../data/content";
import { asset } from "../../utils/asset";

const relatedTitle = (item) => {
  if (item.bookId) {
    return books.find((book) => book.id === item.bookId)?.title;
  }

  const game = games.find((entry) => entry.id === item.gameId);
  return game ? `${game.title} — ${game.subtitle}` : null;
};

const tagColor = {
  Livro: "text-ice border-ice/30",
  Jogo: "text-gold border-gold/30",
};

// Imagem ou vídeo curto opcional de uma novidade (campos image / video no content.js)
function NewsMedia({ item }) {
  const reduceMotion = useReducedMotion();
  const className =
    "block mt-4 max-h-60 w-auto max-w-full border border-dark-600 object-cover";

  if (item.video) {
    // Toca como GIF; quem prefere menos movimento recebe o play manual
    return (
      <video
        src={asset(item.video)}
        aria-label={item.mediaAlt}
        className={className}
        muted
        loop
        playsInline
        autoPlay={!reduceMotion}
        controls={reduceMotion}
        preload="metadata"
      />
    );
  }

  if (item.image) {
    return (
      <img
        src={asset(item.image)}
        alt={item.mediaAlt ?? ""}
        loading="lazy"
        className={className}
      />
    );
  }

  return null;
}

export default function NewsSection() {
  return (
    <section id="novidades" className="py-20 px-6 bg-dark-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="font-cinzel text-gold text-[10px] tracking-[0.5em] uppercase mb-3">
            Bastidores
          </p>
          <h2 className="font-cinzel text-3xl md:text-4xl font-medium text-white">
            Novidades
          </h2>
        </div>

        <div className="max-w-2xl space-y-0">
          {news.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-6 py-6 border-b border-dark-700 last:border-0"
            >
              <p className="font-cinzel text-[10px] tracking-widest text-white/45 whitespace-nowrap mt-0.5 w-20 shrink-0">
                {item.date}
              </p>
              <div className="min-w-0 flex-1">
                <span
                  className={`font-cinzel text-[9px] tracking-[0.3em] uppercase border px-2 py-0.5 mr-3 ${tagColor[item.tag] ?? "text-white/55 border-dark-500"}`}
                >
                  {item.tag}
                </span>
                {relatedTitle(item) && (
                  <span className="text-white/50 text-xs mr-3">
                    {relatedTitle(item)}
                  </span>
                )}
                <span className="text-white/70 text-sm">{item.text}</span>
                <NewsMedia item={item} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
