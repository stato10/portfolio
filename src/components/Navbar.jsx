import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setScrolled(currentScrollY > 50)

      // Determine active section based on scroll position
      const sections = ['portfolio', 'about', 'contact']
      let current = ''
      
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          // More accurate detection - section is active when it's near the top
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = sectionId
          }
        }
      })

      // If at top, set home as active
      if (currentScrollY < 150) {
        current = 'home'
      }

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => setIsOpen(false)

  const navLinks = [
    { name: 'HOME', path: '/', section: 'home' },
    { name: 'WORK', hash: '#portfolio', section: 'portfolio' },
    { name: 'ABOUT', hash: '#about', section: 'about' },
    { name: 'CONTACT', hash: '#contact', section: 'contact' },
  ]

  // Calculate background opacity based on scroll
  const bgOpacity = Math.min(scrollY / 200, 0.9)
  const borderOpacity = Math.min(scrollY / 100, 0.35)

  return (
    <motion.header
      className="fixed top-4 left-0 w-full z-[100] flex justify-center pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.nav
        className={`pointer-events-auto relative flex items-center justify-between px-4 md:px-5 py-2 md:py-2.5 rounded-full ${
          isOpen ? 'w-[90%] md:w-auto rounded-2xl flex-col md:flex-row md:rounded-full' : 'w-auto'
        }`}
        animate={{
          backgroundColor: scrolled || isOpen 
            ? `rgba(238, 233, 218, ${Math.min(bgOpacity + 0.3, 0.95)})` 
            : 'rgba(238, 233, 218, 0)',
          borderColor: scrolled || isOpen
            ? `rgba(96, 150, 180, ${borderOpacity + 0.2})`
            : 'rgba(96, 150, 180, 0)',
          backdropFilter: scrolled || isOpen ? 'blur(12px)' : 'blur(0px)',
          boxShadow: scrolled || isOpen 
            ? `0 10px 40px rgba(96, 150, 180, ${bgOpacity * 0.3})` 
            : '0 0 0 rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="text-base md:text-lg font-display tracking-wider text-primary mr-4 md:mr-6"
          >
            STATO
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary p-1"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </div>
          </button>
        </div>

        {/* Desktop Links */}
        <ul className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 md:gap-5 list-none mt-4 md:mt-0 items-center`}>
          {navLinks.map((link) => {
            const isActive = link.path 
              ? location.pathname === link.path && activeSection === 'home'
              : activeSection === link.section

            return (
              <li key={link.name}>
                {link.path ? (
                  <Link
                    to={link.path}
                    onClick={handleLinkClick}
                    className={`relative group text-xs md:text-sm font-medium transition-colors ${
                      isActive ? 'text-primary' : 'text-text-muted hover:text-primary'
                    }`}
                  >
                    {link.name}
                    <motion.span 
                      className="absolute -bottom-1 left-0 h-px bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? '100%' : 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                ) : (
                  <a
                    href={link.hash}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick()
                      const element = document.getElementById(link.hash.substring(1))
                      if (element) {
                      const navbarHeight = 100 // Navbar height with top offset and padding
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                      const offsetPosition = elementPosition - navbarHeight

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        })
                      }
                    }}
                    className={`relative group text-xs md:text-sm font-medium transition-colors cursor-pointer ${
                      isActive ? 'text-primary' : 'text-text-muted hover:text-primary'
                    }`}
                  >
                    {link.name}
                    <motion.span 
                      className="absolute -bottom-1 left-0 h-px bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? '100%' : 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </motion.nav>
    </motion.header>
  )
}

export default Navbar

