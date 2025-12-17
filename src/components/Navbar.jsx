import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const handleLinkClick = () => setIsOpen(false)

  const isActive = (path) => location.pathname === path

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg-primary/90 backdrop-blur-sm border-b border-white/5">
      <nav className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            onClick={handleLinkClick}
            className="group relative text-2xl font-bold tracking-tight transition-all duration-300"
          >
            <span className="relative inline-flex items-center">
              <span 
                className="inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                style={{
                  backgroundSize: '200% auto',
                  animation: 'gradient 3s ease infinite',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Avraham
              </span>
              <span className="inline-block ml-2 text-text-primary group-hover:text-primary transition-colors duration-300">
                Stato
              </span>
              {/* Decorative underline with gradient */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary group-hover:w-full transition-all duration-500 ease-out"></span>
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 list-none">
            <li>
              <Link 
                to="/" 
                className={`text-sm font-medium uppercase transition-colors ${
                  isActive('/') ? 'text-primary' : 'text-text-muted hover:text-primary'
                }`}
              >
                HOME
              </Link>
            </li>
            <li>
              <a 
                href="#portfolio" 
                className={`text-sm font-medium uppercase transition-colors ${
                  'text-text-muted hover:text-primary'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById('portfolio')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                WORK
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`text-sm font-medium uppercase transition-colors ${
                  'text-text-muted hover:text-primary'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById('about')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                ABOUT
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={`text-sm font-medium uppercase transition-colors ${
                  'text-text-muted hover:text-primary'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById('contact')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                CONTACT
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-primary hover:text-primary transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-surface transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ul className="flex flex-col gap-6 p-8 list-none">
            <li>
              <Link 
                to="/" 
                onClick={handleLinkClick}
                className={`text-base font-medium uppercase block ${
                  isActive('/') ? 'text-primary' : 'text-text-muted hover:text-primary'
                }`}
              >
                HOME
              </Link>
            </li>
            <li>
              <a 
                href="#portfolio" 
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick()
                  const element = document.getElementById('portfolio')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="text-base font-medium uppercase block text-text-muted hover:text-primary"
              >
                WORK
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick()
                  const element = document.getElementById('about')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="text-base font-medium uppercase block text-text-muted hover:text-primary"
              >
                ABOUT
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick()
                  const element = document.getElementById('contact')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="text-base font-medium uppercase block text-text-muted hover:text-primary"
              >
                CONTACT
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

