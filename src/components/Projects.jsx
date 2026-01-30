import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import project1 from '../assets/project1.png'

const projects = [
  {
    id: 2,
    title: 'AI INTERVIEW COACH',
    category: 'AI Application',
    year: '2025',
    description: 'A comprehensive interview preparation platform featuring a realistic AI avatar. Candidates can practice with an intelligent coach that provides real-time feedback on answers, body language, and speaking pace.',
    img: 'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1769536830/Screenshot_2026-01-27_195603_jab8yn.png',
    link: 'https://github.com/stato10/interview-avatar-AI',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Python', 'FastAPI', 'LiveKit', 'OpenAI GPT-4o'],
  },
  {
    id: 7,
    title: 'AI RECRUITER',
    category: 'Automation',
    year: '2024',
    description: 'An intelligent chatbot that automates the candidate screening process. It conducts initial interviews, evaluates responses for job fit, and autonomously handles communication—sending approval emails for the next stage or polite rejection notices based on real-time decisions.',
    img: 'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1765828845/pexels-theshantanukr-16474960_fdtvua.jpg',
    link: 'https://www.loom.com/share/bf342f75364d4986a365b0f6e0340cb1',
    tags: ['Make.com', 'Twilio', 'OpenAI'],
  },
  {
    id: 3,
    title: 'SOLAR FORECAST',
    category: 'Machine Learning',
    year: '2025',
    description: 'A high-precision machine learning model specifically designed to predict solar energy generation. By analyzing weather patterns and historical data, it helps optimize energy grid management and storage.',
    img: 'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1749750619/Screenshot_2025-06-12_154225_fgduws.png',
    link: 'https://github.com/stato10/solar',
    tags: ['React', 'TailwindCSS', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'OpenAI'],
  },
  {
    id: 1,
    title: 'PLAY_CV',
    category: 'AI Application',
    year: '2025',
    description: 'An innovative AI-powered application that transforms traditional CVs into interactive, gamified experiences. It uses advanced parsing to analyze resumes and presents them in a dynamic format that stands out to recruiters.',
    img: 'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1749750617/Screenshot_2025-06-12_153316_pujcpr.png',
    link: 'https://github.com/stato10/Play_cv',
    tags: ['React', 'TailwindCSS', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'OpenAI', 'MongoDB', 'GCP'],
  },
  {
    id: 4,
    title: 'CRITICS MEDIA',
    category: 'Web Platform',
    year: '2025',
    description: 'A modern media aggregation platform for film and TV critics. Features a sleek, responsive design that allows users to browse reviews, watch trailers, and engage with a community of entertainment enthusiasts.',
    img: 'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1753432718/Screenshot_2025-07-25_113126_a9imp7.png',
    link: 'https://github.com/stato10/criticsmedia',
    tags: ['PHP', 'WordPress'],
  },
  {
    id: 5,
    title: 'GOV SYSTEM',
    category: 'Enterprise',
    year: '2024',
    description: 'A robust enterprise solution designed for government administrative processes. It streamlines workflows, manages secure data, and improves inter-departmental communication with a focus on security and reliability.',
    img: 'https://i.ytimg.com/vi/YLsIIddZV_E/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAblNA_tdqn8Yk_iMfW1xQDykZLGw',
    link: null,
    tags: ['SaaS', 'Security', 'Database'],
  },
  {
    id: 6,
    title: 'PERFECT DRESS',
    category: 'E-Commerce',
    year: '2024',
    description: 'An elegant e-commerce boutique specializing in formal wear. The site features a sophisticated filtering system, high-resolution galleries, and a seamless checkout process designed to enhance the shopping experience.',
    img: project1,
    link: 'https://stato10.github.io/PerfectDress/',
    tags: ['React', 'TailwindCSS', 'JavaScript', 'HTML', 'CSS'],
  },
]

function Projects() {
  return (
    <section id="portfolio" className="bg-bg-primary py-32 relative z-10 scroll-mt-24">
      <div className="container-custom mx-auto px-4 md:px-8">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-primary/30 pb-8 gap-6">
          <div>
            <h2 className="text-4xl md:text-7xl font-display text-primary mb-2">
              SELECTED WORKS
            </h2>
            <p className="text-text-muted max-w-lg">
              A collection of projects exploring the intersection of design, artificial intelligence, and user experience.
            </p>
          </div>
          <span className="hidden md:block text-text-muted font-sans text-sm tracking-widest uppercase">
            (2024 — 2025)
          </span>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0
  const ref = useRef(null)

  // Parallax effect for the card
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
    >
      {/* Image Side */}
      <div className="w-full md:w-3/5 group cursor-pointer relative">
        <a href={project.link || '#'} target={project.link ? "_blank" : "_self"} rel="noopener noreferrer" className="block overflow-hidden rounded-2xl border border-primary/20">
          <div className="relative aspect-[16/10] overflow-hidden bg-bg-secondary">
            {/* Overlay */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 z-10 transition-colors duration-500" />

            {/* Image */}
            <motion.img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Visit Button Overlay */}
            {project.link && (
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="bg-bg-primary/90 backdrop-blur-sm text-primary px-6 py-3 rounded-full font-display uppercase tracking-wider flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  View Project
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1H11M11 1V11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </a>
      </div>

      {/* Content Side */}
      <div className="w-full md:w-2/5 flex flex-col items-start text-left">
        <span className="font-sans text-primary/80 text-sm tracking-widest uppercase mb-4 border border-primary/30 px-3 py-1 rounded-full">
          {project.category}
        </span>

        <h3 className="text-4xl md:text-5xl font-display text-primary mb-6">
          {project.title}
        </h3>

        <p className="text-text-muted leading-relaxed mb-8 text-lg">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {project.tags && project.tags.map(tag => (
            <span key={tag} className="text-xs font-sans text-text-muted/80 bg-bg-secondary px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <span className="font-sans text-text-muted">
            {project.year}
          </span>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-primary hover:text-white transition-colors border-b border-primary/30 hover:border-primary pb-0.5"
            >
              <span className="font-display uppercase tracking-wide text-sm">Case Study</span>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform">
                <path d="M1 1H11M11 1V11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Projects
