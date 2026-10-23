import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useFragments } from "../components/fragments/FragmentsProvider";
import { localizadorReward, localizadorSignup } from "../data/fragments";

// Página escondida: o outro lado do teletransporte do Localizador
export default function LocalizadoPage() {
  const { complete } = useFragments();
  const { state } = useLocation();
  const arrived = state?.arrived;

  if (!complete) {
    return (
      <main className="min-h-screen bg-dark-950 pt-32 px-6 text-center">
        <p className="font-cinzel text-white/60">O Localizador ainda não te trouxe até aqui.</p>
        <Link to="/" className="inline-block mt-6 text-gold hover:text-gold-light">
          Voltar
        </Link>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-dark-950 pt-32 pb-32 px-6 overflow-hidden">
      {/* Chegada: o clarão do teletransporte se desfaz */}
      {arrived && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="fixed inset-0 z-[80] bg-[#EAFBFF] pointer-events-none"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-24 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20 animate-glow-pulse"
        style={{ background: "radial-gradient(circle, #A2C4E0, transparent 65%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: arrived ? 24 : 12, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: arrived ? 0.8 : 0, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-xl mx-auto text-center"
      >
        <p className="font-cinzel text-ice text-[10px] tracking-[0.5em] uppercase mb-4">
          13 de 13 fragmentos
        </p>
        <h1 className="font-cinzel text-3xl md:text-4xl font-medium text-white mb-6">
          {localizadorReward.title}
        </h1>
        <p className="text-white/75 leading-[1.9] whitespace-pre-line">
          {localizadorReward.text}
        </p>

        {localizadorReward.perks.length > 0 && (
          <ul className="mt-10 space-y-3 text-left max-w-sm mx-auto">
            {localizadorReward.perks.map((perk) => (
              <li key={perk} className="flex gap-3 text-white/80 text-sm">
                <span className="text-ice">◆</span>
                {perk}
              </li>
            ))}
          </ul>
        )}

        <SignupForm />
      </motion.div>
    </main>
  );
}

function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const { action, emailField, privacy } = localizadorSignup;

  if (!action) {
    return (
      <p className="mt-12 font-cinzel text-[11px] tracking-[0.3em] uppercase text-white/55">
        As inscrições abrem em breve
      </p>
    );
  }

  if (status === "sent") {
    return (
      <p className="mt-12 font-cinzel text-sm text-ice">
        Pronto. Você vai ouvir falar da gente.
      </p>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // no-cors: os serviços de formulário não liberam ler a resposta,
      // então só dá pra saber se a mensagem saiu
      await fetch(action, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({ [emailField]: email }),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submit} className="mt-12">
      <label htmlFor="localizado-email" className="sr-only">
        Seu e-mail
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="localizado-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className="flex-1 bg-dark-900 border border-dark-600 focus:border-ice/60 outline-none px-4 py-3 text-white placeholder:text-white/35 text-sm"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="font-cinzel text-[11px] tracking-[0.25em] uppercase px-6 py-3 border border-ice/40 text-ice hover:bg-ice/10 hover:border-ice/70 transition-all duration-300 disabled:opacity-50"
        >
          {status === "sending" ? "Enviando…" : "Entrar"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-300/80">Não deu pra enviar. Tenta de novo?</p>
      )}
      <p className="mt-4 text-white/45 text-xs leading-relaxed">{privacy}</p>
    </form>
  );
}
