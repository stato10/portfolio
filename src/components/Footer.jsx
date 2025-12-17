import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-surface py-8 text-center">
      <div className="container-custom">
        <nav className="flex flex-wrap justify-center gap-6 mb-4">
          <a 
            href="#hero" 
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-text-muted hover:text-primary transition-colors text-sm"
          >
            Home
          </a>
          <a 
            href="#about-me" 
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById('about-me')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="text-text-muted hover:text-primary transition-colors text-sm"
          >
            About
          </a>
          <a 
            href="#portfolio" 
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById('portfolio')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="text-text-muted hover:text-primary transition-colors text-sm"
          >
            Resume
          </a>
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById('contact')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="text-text-muted hover:text-primary transition-colors text-sm"
          >
            Contact
          </a>
          <Link to="/blog" className="text-text-muted hover:text-primary transition-colors text-sm">
            Blog
          </Link>
        </nav>
        <p className="text-text-muted text-sm">
          &copy; {new Date().getFullYear()} Avraham Stato. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer

