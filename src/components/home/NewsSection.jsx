import { motion } from "framer-motion";
import { news, books, games } from "../../data/content";

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

export default function NewsSection() {
  return (
    <section id="novidades" className="py-28 px-6 bg-dark-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
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
              <p className="font-cinzel text-[10px] tracking-widest text-white/20 whitespace-nowrap mt-0.5 w-20 shrink-0">
                {item.date}
              </p>
              <div>
                <span
                  className={`font-cinzel text-[9px] tracking-[0.3em] uppercase border px-2 py-0.5 mr-3 ${tagColor[item.tag] ?? "text-white/30 border-dark-500"}`}
                >
                  {item.tag}
                </span>
                {relatedTitle(item) && (
                  <span className="text-white/25 text-xs mr-3">
                    {relatedTitle(item)}
                  </span>
                )}
                <span className="text-white/50 text-sm">{item.text}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
