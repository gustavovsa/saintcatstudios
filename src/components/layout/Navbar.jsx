import { useState, useEffect } from 'react'
import { asset } from '../../utils/asset'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Início',    href: import.meta.env.BASE_URL + '#inicio' },
  { label: 'Livros',    href: import.meta.env.BASE_URL + '#livros' },
  { label: 'Jogos',     href: import.meta.env.BASE_URL + '#jogos' },
  { label: 'Novidades', href: import.meta.env.BASE_URL + '#novidades' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fecha menu ao trocar de rota
  useEffect(() => setOpen(false), [pathname])

  return (
    <motion.header
      initial={{ y: -72 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-dark-950/95 backdrop-blur-md border-b border-dark-700'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          aria-label="Saint Cat - Início"
          className="flex items-center gap-3 group"
        >
          <motion.img
            src={asset('/images/site/logo gato.png')}
            alt=""
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.08, rotate: -4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-9 w-auto object-contain"
          />
          <motion.img
            src={asset('/images/site/logo sc.png')}
            alt=""
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="h-auto w-28 object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-90"
          />
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-cinzel text-[11px] tracking-[0.25em] uppercase text-white/65 hover:text-gold transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={
                open
                  ? i === 0 ? { rotate: 45,  y: 6,  opacity: 1 }
                  : i === 1 ? { opacity: 0 }
                  : { rotate: -45, y: -6, opacity: 1 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.2 }}
              className="block h-px w-5 bg-white/50 origin-center"
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-dark-950 border-t border-dark-700"
          >
            <div className="flex flex-col px-6 py-5 gap-5">
              {links.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="font-cinzel text-xs tracking-[0.25em] uppercase text-white/65 hover:text-gold transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
