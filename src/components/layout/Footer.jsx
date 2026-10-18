import { Link, Links } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-700 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-cinzel text-gold text-xs tracking-[0.4em] uppercase mb-1">
            A Writer's Story
          </p>
          <p className="text-white/20 text-xs">
            Um universo em construção.
          </p>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            to="/livros/the-storm-fall"
            className="font-cinzel text-[11px] tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors"
          >
            The Storm Fall
          </Link>
          {/* Adicionar links conforme o universo cresce */}
          {/*
          <Link
            to="/livros/the-mystic"
            className="font-cinzel text-[11px] tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors"
          >
          The Mystic
          </Link>
          */}
        </nav>

        <p className="text-white/15 text-xs font-cinzel tracking-widest">
          © {new Date().getFullYear()} Saint Cat
        </p>
      </div>
    </footer>
  )
}
