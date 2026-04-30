import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINK_CLASSES =
  'relative px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-200 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/60'

function scrollToHero() {
  const el = document.getElementById('hero')
  const offset = 96
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 24)

      const sections = ['portfolio', 'about', 'contact']
      let current = ''

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 140 && rect.bottom >= 140) {
            current = sectionId
          }
        }
      })

      if (currentScrollY < 120) {
        current = 'home'
      }

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = () => setIsOpen(false)

  /** React Router does nothing on `<Link to="/">` when already on `/` — scroll to hero instead. */
  const handleHomeClick = (e) => {
    handleLinkClick()
    if (location.pathname === '/') {
      e.preventDefault()
      scrollToHero()
      return
    }
    setTimeout(scrollToHero, 150)
  }

  const navLinks = [
    { name: 'Home', path: '/', section: 'home' },
    { name: 'Work', hash: '#portfolio', section: 'portfolio' },
    { name: 'About', hash: '#about', section: 'about' },
    { name: 'Contact', hash: '#contact', section: 'contact' },
  ]

  const scrollToHash = (hash) => {
    const id = hash.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      const navbarHeight = 96
      const top = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const linkIsActive = (link) =>
    link.path
      ? link.path === '/' && location.pathname === '/'
      : activeSection === link.section && location.pathname === '/'

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pt-4 md:px-6 md:pt-5 pointer-events-none"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          className={[
            'pointer-events-auto flex w-full max-w-[1200px] items-center justify-between gap-4 rounded-2xl border px-4 py-3 md:gap-8 md:px-6 md:py-3.5',
            'transition-[background-color,border-color,box-shadow] duration-300 ease-out',
            scrolled || isOpen
              ? 'border-white/[0.1] bg-surface/85 shadow-hub backdrop-blur-xl md:backdrop-blur-2xl'
              : 'border-white/[0.06] bg-bg-primary/25 shadow-none backdrop-blur-md md:bg-bg-primary/20',
          ].join(' ')}
        >
          <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-6">
            <Link
              to="/"
              onClick={handleHomeClick}
              className="group flex shrink-0 items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-lg"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/25 bg-primary/[0.08] text-xs font-display text-primary transition-colors group-hover:border-primary/45 group-hover:bg-primary/[0.12]">
                AS
              </span>
              <span className="hidden min-w-0 sm:block">
                <span className="block font-display text-sm tracking-wider text-text-primary transition-colors group-hover:text-primary md:text-base">
                  STATO
                </span>
                <span className="block truncate text-[10px] font-sans uppercase tracking-[0.2em] text-text-muted">
                  Full Stack
                </span>
              </span>
            </Link>

            <span className="hidden h-8 w-px shrink-0 bg-white/10 md:block" aria-hidden />
          </div>

          <ul className="hidden list-none items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = linkIsActive(link)
              const base = NAV_LINK_CLASSES
              const inactive = 'text-zinc-400 hover:text-text-primary hover:bg-white/[0.04]'
              const activeCls = 'text-primary bg-primary/[0.1] ring-1 ring-primary/25'

              return (
                <li key={link.name}>
                  {link.path ? (
                    <Link
                      to={link.path}
                      onClick={link.path === '/' ? handleHomeClick : handleLinkClick}
                      className={`${base} ${active ? activeCls : inactive}`}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.hash}
                      onClick={(e) => {
                        e.preventDefault()
                        handleLinkClick()
                        scrollToHash(link.hash)
                      }}
                      className={`${base} ${active ? activeCls : inactive} cursor-pointer`}
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              to="/resume"
              onClick={handleLinkClick}
              className={`hidden rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors lg:inline-flex ${
                location.pathname === '/resume'
                  ? 'text-primary ring-1 ring-primary/30 bg-primary/[0.08]'
                  : 'text-zinc-500 hover:bg-white/[0.05] hover:text-text-primary'
              }`}
            >
              Résumé
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen((o) => !o)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-text-primary transition-colors hover:border-primary/35 hover:bg-primary/[0.06] hover:text-primary md:hidden"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">Menu</span>
              <span className="flex h-4 w-5 flex-col justify-center gap-1.5">
                <motion.span
                  className="block h-0.5 w-full origin-center rounded-full bg-current"
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-0.5 w-full rounded-full bg-current"
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-0.5 w-full origin-center rounded-full bg-current"
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[95] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute left-4 right-4 top-[calc(5rem+env(safe-area-inset-top))] overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-hub"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="flex list-none flex-col divide-y divide-white/[0.06] p-2">
                {navLinks.map((link) => {
                  const active = linkIsActive(link)
                  const itemCls =
                    'flex w-full items-center justify-between rounded-xl px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]'
                  const activeCls = 'bg-primary/[0.1] text-primary'
                  const idleCls = 'text-text-primary hover:bg-white/[0.04]'

                  return (
                    <li key={link.name}>
                      {link.path ? (
                        <Link
                          to={link.path}
                          onClick={link.path === '/' ? handleHomeClick : handleLinkClick}
                          className={`${itemCls} ${active ? activeCls : idleCls}`}
                        >
                          {link.name}
                          <span className="text-text-muted">{active ? '●' : '→'}</span>
                        </Link>
                      ) : (
                        <a
                          href={link.hash}
                          onClick={(e) => {
                            e.preventDefault()
                            handleLinkClick()
                            scrollToHash(link.hash)
                          }}
                          className={`${itemCls} cursor-pointer ${active ? activeCls : idleCls}`}
                        >
                          {link.name}
                          <span className="text-text-muted">{active ? '●' : '→'}</span>
                        </a>
                      )}
                    </li>
                  )
                })}
                <li>
                  <Link
                    to="/resume"
                    onClick={handleLinkClick}
                    className={`${itemCls} ${location.pathname === '/resume' ? activeCls : idleCls}`}
                  >
                    Résumé
                    <span className="text-text-muted">{location.pathname === '/resume' ? '●' : '→'}</span>
                  </Link>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
