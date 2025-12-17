import { useState } from 'react'

function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const skills = {
    'Frontend Development': [
      'JavaScript', 'TypeScript', 'React', 'HTML5', 'CSS3', 
      'Tailwind CSS', 'Responsive Design', 'UI/UX', 'Redux', 
      'Next.js', 'Material-UI', 'Styled Components'
    ],
    'Backend Development': [
      'Node.js', 'Express.js', 'REST APIs', 'GraphQL', 
      'Java', 'Spring Boot', 'Python', 'Django', 'Flask',
      'API Design', 'Microservices', 'Serverless'
    ],
    'Databases & Storage': [
      'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 
      'SQL', 'Database Design', 'ORM', 'Mongoose'
    ],
    'DevOps & Tools': [
      'Git', 'GitHub', 'Docker', 'AWS', 'Linux', 
      'CI/CD', 'Jenkins', 'NPM', 'Webpack', 'Vite'
    ],
    'Testing & Quality': [
      'Jest', 'Unit Testing', 'Integration Testing', 
      'Postman', 'API Testing', 'Debugging'
    ],
    'Soft Skills': [
      'Agile/Scrum', 'Problem Solving', 'Team Collaboration', 
      'Code Review', 'Documentation', 'Version Control'
    ]
  }

  return (
    <section id="skills" className="section-padding bg-surface">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="text-text-muted opacity-30 text-2xl md:text-3xl">SKILLS</span>
            <span className="block text-primary mt-2">EXPERTISE</span>
          </h2>
          <p className="text-text-muted text-sm max-w-2xl mx-auto">
            A comprehensive skill set for building modern, scalable web applications
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-bg-primary p-5 rounded-lg border border-surface hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
              >
                <h3 className="text-base font-bold text-primary mb-4 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full"></span>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`
                        inline-block px-3 py-1.5 rounded-md text-xs font-medium
                        transition-all duration-300 cursor-default
                        ${
                          hoveredSkill === `${categoryIndex}-${skillIndex}`
                            ? 'bg-primary text-bg-primary scale-105 shadow-md shadow-primary/50'
                            : 'bg-surface text-text-primary border border-surface hover:border-primary/50 hover:bg-surface/80'
                        }
                      `}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-bg-primary rounded-full border border-primary/30 hover:border-primary/50 transition-all duration-300 group">
            <svg className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-text-muted text-sm">
              <span className="text-primary font-semibold">Always Learning</span> - Continuously expanding my skill set with the latest technologies
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
