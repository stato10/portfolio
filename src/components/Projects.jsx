import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import project1 from '../assets/project1.png'

const projects = [
  {
    id: 1,
    title: 'PLAY_CV',
    category: 'AI APPLICATION',
    year: '2025',
    img: 'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1749750617/Screenshot_2025-06-12_153316_pujcpr.png',
    link: 'https://github.com/stato10/Play_cv',
  },
  {
    id: 2,
    title: 'AI INTERVIEW COACH & AVATAR',
    category: 'AI APPLICATION',
    year: '2025',
    img: 'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1769536830/Screenshot_2026-01-27_195603_jab8yn.png',
    images: [
      'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1769536830/Screenshot_2026-01-27_195603_jab8yn.png',
      'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1769536828/Screenshot_2026-01-27_195541_u29i0w.png',
    ],
    link: 'https://github.com/stato10/interview-avatar-AI',
  },
  {
    id: 3,
    title: 'SOLAR FORECAST',
    category: 'MACHINE LEARNING',
    year: '2025',
    img: 'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1749750619/Screenshot_2025-06-12_154225_fgduws.png',
    link: 'https://github.com/stato10/solar',
  },
  {
    id: 4,
    title: 'CRITICS MEDIA',
    category: 'WEB PLATFORM',
    year: '2025',
    img: 'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1753432718/Screenshot_2025-07-25_113126_a9imp7.png',
    link: 'https://github.com/stato10/criticsmedia',
  },
  {
    id: 5,
    title: 'GOV SYSTEM',
    category: 'ENTERPRISE',
    year: '2024',
    img: 'https://i.ytimg.com/vi/YLsIIddZV_E/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAblNA_tdqn8Yk_iMfW1xQDykZLGw',
    link: null,
  },
  {
    id: 6,
    title: 'PERFECT DRESS',
    category: 'E-COMMERCE',
    year: '2024',
    img: project1,
    link: 'https://stato10.github.io/PerfectDress/',
  },
  {
    id: 7,
    title: 'AUTO SCREENING',
    category: 'AUTOMATION',
    year: '2024',
    img: 'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1765828845/pexels-theshantanukr-16474960_fdtvua.jpg',
    link: null,
  },
]

function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <section id="portfolio" className="bg-bg-primary py-32 relative z-10 scroll-mt-24">
      <div className="container-custom mx-auto px-4 md:px-8">
        <div className="mb-20 flex items-end justify-between border-b border-primary/30 pb-8">
          <h2 className="text-4xl md:text-6xl font-display text-primary">
            SELECTED<br />WORKS
          </h2>
          <span className="hidden md:block text-text-muted font-sans text-sm tracking-widest uppercase">
            (2024 — 2025)
          </span>
        </div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              setHoveredProject={setHoveredProject}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ project, index, setHoveredProject }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = project.images || [project.img]
  const intervalRef = useRef(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    setHoveredProject(project)
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
      }, 2000) // Change image every 2 seconds
    }
  }

  const handleMouseLeave = () => {
    setHoveredProject(null)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setCurrentImageIndex(0) // Reset to first image
  }

  return (
    <motion.a
      href={project.link || '#'}
      target={project.link ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="group relative flex flex-col md:flex-row items-center justify-between py-12 border-b border-primary/30 cursor-pointer overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Hover Background Image Reveal */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={project.title}
            className="w-full h-full object-cover grayscale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>

      {/* Index Number */}
      <div className="relative z-10 w-full md:w-1/12 mb-4 md:mb-0">
        <span className="font-sans text-xs md:text-sm text-text-muted group-hover:text-primary transition-colors">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Title */}
      <div className="relative z-10 w-full md:w-5/12 mb-4 md:mb-0">
        <h3 className="text-3xl md:text-5xl font-display text-primary group-hover:text-text-primary transition-colors group-hover:translate-x-4 duration-500">
          {project.title}
        </h3>
      </div>

      {/* Category */}
      <div className="relative z-10 w-full md:w-3/12 mb-4 md:mb-0">
        <span className="font-sans text-xs md:text-sm text-text-muted uppercase tracking-widest group-hover:text-primary transition-colors">
          {project.category}
        </span>
      </div>

      {/* Year & Arrow */}
      <div className="relative z-10 w-full md:w-2/12 flex justify-between md:justify-end items-center gap-8">
        <span className="font-sans text-xs md:text-sm text-text-muted group-hover:text-primary transition-colors">
          {project.year}
        </span>
        <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 transform group-hover:-rotate-45">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary group-hover:text-bg-primary transition-colors"
          >
            <path d="M1 1H11M11 1V11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </motion.a>
  )
}

export default Projects
