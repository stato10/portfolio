import { useState } from 'react'
import project1 from '../assets/project1.png'
import project2 from '../assets/project2.png'
import project3 from '../assets/project3.png'
import project4 from '../assets/project4.png'
import project5 from '../assets/project5.png'
import project6 from '../assets/project6.png'

const projects = [
  {
    id: 2,
    img: 'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1749750617/Screenshot_2025-06-12_153316_pujcpr.png',
    title: 'Play_CV - AI-Powered CV Enhancement',
    description: 'Full-stack application that helps users create and optimize their CVs using AI. Features secure authentication, real-time editing, and intelligent suggestions.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'OpenAI API', 'React'],
    link: null,
    github: 'https://github.com/stato10/Play_cv',
  },
  {
    id: 3,
    img: 'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1749750619/Screenshot_2025-06-12_154225_fgduws.png',
    title: 'Solar Forecast System',
    description: 'Machine learning system that predicts solar energy output based on weather data and historical patterns. Includes real-time monitoring dashboard and REST API integration.',
    technologies: ['Python', 'Machine Learning', 'REST API', 'Data Analytics', 'Dashboard'],
    link: null,
    github: 'https://github.com/stato10/solar',
  },
  {
    id: 4,
    img: 'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1753432718/Screenshot_2025-07-25_113126_a9imp7.png',
    title: 'Critics Media Platform',
    description: 'Complete digital media platform with custom WordPress development, optimized for performance and SEO. Features content management and user engagement tools.',
    technologies: ['WordPress', 'PHP', 'SEO', 'Performance Optimization', 'Content Management'],
    link: null,
    github: 'https://github.com/stato10/criticsmedia',
  },
  {
    id: 5,
    img: 'https://i.ytimg.com/vi/YLsIIddZV_E/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAblNA_tdqn8Yk_iMfW1xQDykZLGw',
    title: 'Government Management System',
    description: 'Scalable government management system with microservices architecture, secure authentication, and comprehensive data management capabilities.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Microservices', 'Security'],
    link: null,
    github: null,
  },
  // {
  //   id: 6,
  //   img: project6,
  //   title: 'E-commerce Backend API',
  //   description: 'RESTful API for e-commerce platform with user authentication, product management, order processing, and payment integration.',
  //   technologies: ['Node.js', 'Express.js', 'JWT', 'REST API', 'Payment Integration'],
  //   link: null,
  //   github: null,
  // },
  {
    id: 7,
    img: project1,
    title: 'PerfectDress',
    description: 'E-commerce platform for fashion and apparel. Features product catalog, shopping cart, user authentication, and seamless checkout experience. Built with React, Vite, Tailwind CSS, and Framer Motion.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'E-commerce', 'Shopping Cart'],
    link: 'https://stato10.github.io/PerfectDress/',
    github: 'https://github.com/stato10/PerfectDress',
    previewUrl: 'https://stato10.github.io/PerfectDress/',
    hasPreview: true,
  },
  {
    id: 8,
    img: 'https://res.cloudinary.com/dpz2lh8hu/image/upload/v1765828845/pexels-theshantanukr-16474960_fdtvua.jpg',
    title: 'Automated Candidate Screening System',
    description: 'This project demonstrates an automated candidate screening flow using a conversational chatbot and workflow automation. The chatbot collects structured personal and professional data and allows candidates to select an interview time. The data is analyzed using AI to evaluate role fit and generate a hiring recommendation. Based on the decision, the system automatically schedules a calendar event and sends tailored emails. The solution showcases end-to-end automation, decision logic, and real-world hiring workflows.',
    technologies: ['Chatbot', 'AI', 'Workflow Automation', 'Decision Logic', 'Email Automation', 'Calendar Integration'],
    link: null,
    github: null,
    videoUrl: 'https://www.loom.com/embed/bf342f75364d4986a365b0f6e0340cb1',
    hasVideo: true,
  },
]

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  const handleProjectClick = (project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <>
      <section id="portfolio" className="section-padding bg-bg-primary relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-xs uppercase tracking-[0.2em] text-primary/60 font-medium">Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              <span className="text-text-muted opacity-30 text-2xl md:text-3xl">FEATURED</span>
              <span className="block text-primary mt-2">PROJECTS</span>
            </h2>
            <p className="text-text-muted text-sm max-w-2xl mx-auto leading-relaxed">
              Explore my portfolio of innovative projects and solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleProjectClick(project)}
                className={`
                  group relative bg-surface rounded-xl overflow-hidden cursor-pointer
                  transform transition-all duration-500 ease-out
                  ${hoveredId === project.id 
                    ? 'scale-105 shadow-2xl shadow-primary/20 z-10' 
                    : 'hover:scale-102 hover:shadow-xl'
                  }
                  border border-surface hover:border-primary/50
                `}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Project Image or Preview */}
                <div className="relative h-48 overflow-hidden bg-bg-primary">
                  {project.hasPreview && project.previewUrl ? (
                    <iframe
                      src={project.previewUrl}
                      className="pointer-events-none"
                      style={{
                        width: '200%',
                        height: '200%',
                        border: 'none',
                        transform: 'scale(0.5)',
                        transformOrigin: 'top left',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                      title={`${project.title} Preview`}
                      loading="lazy"
                      sandbox="allow-same-origin allow-scripts"
                    />
                  ) : (
                    <img
                      src={project.img}
                      alt={project.title}
                      className={`
                        w-full h-full object-cover transition-transform duration-700
                        ${hoveredId === project.id ? 'scale-125' : 'scale-100'}
                      `}
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        e.target.src = project1
                      }}
                    />
                  )}
                  <div className={`
                    absolute right-0 bottom-0 w-full h-full bg-gradient-to-t from-bg-primary/90 via-bg-primary/50 to-transparent
                    transition-opacity duration-300
                    ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'}
                  `}></div>
                  
                  {/* Overlay Content */}
                  <div className={`
                    absolute bottom-4 left-4 right-4 transform transition-all duration-300
                    ${hoveredId === project.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                  `}>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs rounded-md border border-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-primary transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-xs mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-bg-primary text-text-muted text-xs rounded border border-surface"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-bg-primary text-text-muted text-xs rounded border border-surface">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {project.hasVideo && (
                        <span className="text-primary/80 font-medium text-xs uppercase tracking-wider flex items-center gap-2">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                          <span>Video</span>
                        </span>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-primary/80 hover:text-primary font-medium text-xs uppercase tracking-wider flex items-center gap-2 transition-all group/link"
                        >
                          <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span>Live</span>
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-primary/80 hover:text-primary font-medium text-xs uppercase tracking-wider flex items-center gap-2 transition-all group/link"
                        >
                          <svg className="w-3.5 h-3.5 group-hover/link:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          <span>Code</span>
                        </a>
                      )}
                      {!project.link && !project.github && !project.hasVideo && (
                        <button className="text-primary/80 hover:text-primary font-medium text-xs uppercase tracking-wider flex items-center gap-2 transition-all group/btn">
                          <span>View Details</span>
                          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className={`
                  absolute inset-0 border-2 border-primary rounded-xl pointer-events-none
                  transition-opacity duration-300
                  ${hoveredId === project.id ? 'opacity-100' : 'opacity-0'}
                `}></div>
              </div>
            ))}
          </div>

          {/* Continue Exploring */}
          <div className="text-center mt-12">
            <p className="text-text-muted italic text-sm">
              <em className="font-semibold" style={{ lineHeight: '50px' }}>Continue Exploring?</em>
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-bg-primary/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-surface rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-primary/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-surface border-b border-primary/30 p-4 flex justify-between items-center z-10">
              <h3 className="text-2xl font-bold text-primary">{selectedProject.title}</h3>
              <button
                onClick={closeModal}
                className="text-text-muted hover:text-primary text-2xl font-bold transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="relative h-96 mb-6 rounded-lg overflow-hidden bg-bg-primary border border-primary/20">
                {selectedProject.hasVideo && selectedProject.videoUrl ? (
                  <iframe
                    src={selectedProject.videoUrl}
                    className="w-full h-full"
                    style={{ border: 'none' }}
                    title={`${selectedProject.title} Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : selectedProject.hasPreview && selectedProject.previewUrl ? (
                  <iframe
                    src={selectedProject.previewUrl}
                    className="w-full h-full"
                    style={{ border: 'none' }}
                    title={`${selectedProject.title} Preview`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={selectedProject.img}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <p className="text-text-muted mb-6 leading-relaxed">
                {selectedProject.description}
              </p>
              
              <div className="mb-6">
                <h4 className="text-primary font-semibold mb-3">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-bg-primary text-primary text-sm rounded-md border border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Action Links */}
              <div className="flex flex-wrap gap-3">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 px-6 py-3 bg-primary text-bg-primary rounded-lg font-medium text-sm uppercase tracking-wider hover:bg-accent transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
                  >
                    <svg className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>View Live Project</span>
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium text-sm uppercase tracking-wider hover:bg-primary hover:text-bg-primary transition-all duration-300"
                  >
                    <svg className="w-4 h-4 group-hover/link:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span>View on GitHub</span>
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Projects
