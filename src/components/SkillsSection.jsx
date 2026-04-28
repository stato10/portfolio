import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function SkillsSection() {
  const root = useRef(null)

  const skillCategories = [
    {
      title: 'Frontend',
      description: 'Building immersive user interfaces',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      skills: [
        'React', 'TailwindCSS', 'TypeScript', 'HTML5/CSS3',
        'Next.js', 'Redux', 'UI/UX Design', 'Material-UI',
        'Styled Components', 'Responsive Design',
      ],
    },
    {
      title: 'Backend & Databases',
      description: 'Robust server-side architecture',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      skills: [
        'Node.js', 'Express', 'MongoDB', 'SQL',
        'PostgreSQL', 'REST APIs', 'GraphQL', 'Redis',
        'Java', 'Spring Boot', 'Mongoose',
      ],
    },
    {
      title: 'AI & Cloud',
      description: 'Integrating intelligence and scale',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      skills: [
        'OpenAI API', 'Google Cloud (GCP)', 'AWS', 'GitHub Actions',
        'Docker', 'Kubernetes', 'CI/CD', 'Linux',
        'Vite', 'Webpack',
      ],
    },
    {
      title: 'Automation',
      description: 'Streamlining workflows and processes',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      skills: [
        'Python', 'PowerShell', 'Bash', 'Make.com',
        'n8n', 'Zepair', 'Selenium', 'Scripting',
      ],
    },
  ]

  const otherSkills = [
    'Git', 'Jest', 'Postman', 'Agile/Scrum', 'Unit Testing',
    'Code Review', 'Problem Solving', 'Team Collaboration',
  ]

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const head = root.current?.querySelector('.skills-header')
      const cards = root.current?.querySelectorAll('[data-skill-card]')
      const footer = root.current?.querySelector('.skills-footer')

      if (reduce) return

      if (head) {
        gsap.from(head.children, {
          opacity: 0,
          y: 36,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: head,
            start: 'top 85%',
            once: true,
          },
        })
      }

      if (cards?.length) {
        gsap.set(cards, { opacity: 0, y: 40 })
        ScrollTrigger.batch(cards, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.1,
              ease: 'power3.out',
            })
          },
        })
      }

      if (footer) {
        gsap.from(footer, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            once: true,
          },
        })
      }
    },
    { scope: root }
  )

  return (
    <section id="skills" ref={root} className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="absolute top-20 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container-custom mx-auto px-4">
        <div className="skills-header text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display text-primary mb-6">
            TECHNICAL
            <br />
            EXPERTISE
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto font-light">
            A curated technology stack for scalable, intelligent, and user-centric applications—revealed as you scroll.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              data-skill-card
              className="group bg-surface/90 p-8 rounded-2xl border border-white/[0.08] hover:border-primary/35 transition-all duration-300 relative overflow-hidden shadow-hub"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-display text-primary text-opacity-90 group-hover:text-opacity-100 uppercase tracking-widest">
                      {category.title}
                    </h3>
                    <p className="text-xs text-text-muted font-sans uppercase tracking-wider mt-1">{category.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-4 py-2 rounded-lg bg-bg-primary/90 text-text-primary/90 text-base font-medium font-sans border border-white/[0.08] hover:border-primary/40 hover:text-primary hover:bg-primary/[0.06] transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="skills-footer text-center bg-surface/80 py-8 rounded-2xl border border-white/[0.08] max-w-4xl mx-auto shadow-hub">
          <h4 className="text-sm font-sans text-primary uppercase tracking-widest mb-4 opacity-70">Development Tools & Methodologies</h4>
          <div className="flex flex-wrap justify-center gap-6 px-4">
            {otherSkills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-lg bg-bg-primary/90 text-text-primary/80 border border-white/[0.08] hover:border-primary/35 hover:text-primary hover:bg-primary/[0.06] transition-colors duration-300 text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
