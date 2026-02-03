import { useState } from 'react'
import { motion } from 'framer-motion'

function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState(null)

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
        'Styled Components', 'Responsive Design'
      ]
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
        'Java', 'Spring Boot', 'Mongoose'
      ]
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
        'Vite', 'Webpack'
      ]
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
        'n8n', 'Zepair', 'Selenium', 'Scripting'
      ]
    },
  ]

  const otherSkills = [
    'Git', 'Jest', 'Postman', 'Agile/Scrum', 'Unit Testing',
    'Code Review', 'Problem Solving', 'Team Collaboration'
  ]

  return (
    <section id="skills" className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container-custom mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-6xl font-display text-primary mb-6">
              TECHNICAL<br />EXPERTISE
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto font-light">
              A curated technology stack designed for building scalable, intelligent, and user-centric applications.
            </p>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              className="group bg-bg-secondary p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Hover Gradient */}
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
                    <p className="text-xs text-text-muted font-sans uppercase tracking-wider mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-4 py-2 rounded-lg bg-bg-primary text-text-primary/90 text-base font-medium font-sans border border-primary/10 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-default shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Skills Marquee / List */}
        <motion.div
          className="text-center bg-bg-secondary/50 py-8 rounded-2xl border border-primary/5 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h4 className="text-sm font-sans text-primary uppercase tracking-widest mb-4 opacity-70">Development Tools & Methodologies</h4>
          <div className="flex flex-wrap justify-center gap-6 px-4">
            {otherSkills.map((skill, index) => (
              <span key={index} className="px-4 py-2 rounded-lg bg-bg-primary text-text-primary/80 border border-primary/10 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-colors duration-300 text-sm font-medium shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default SkillsSection
