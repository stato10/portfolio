import { useState } from 'react'

function Resume() {
  const [activeTab, setActiveTab] = useState('skills')

  const skills = [
    {
      category: 'LANGUAGES',
      items: [
        { name: 'JavaScript', level: 90 },
        { name: 'Java', level: 85 },
        { name: 'Python', level: 75 },
        { name: 'TypeScript', level: 80 },
      ],
    },
    {
      category: 'BACKEND',
      items: [
        { name: 'Node.js', level: 90 },
        { name: 'Express.js', level: 85 },
        { name: 'REST API', level: 90 },
        { name: 'GraphQL', level: 75 },
        { name: 'Spring Boot', level: 80 },
      ],
    },
    {
      category: 'FRONTEND',
      items: [
        { name: 'HTML5/CSS3', level: 95 },
        { name: 'React', level: 85 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'Next.js', level: 75 },
        { name: 'Redux', level: 80 },
      ],
    },
    {
      category: 'DATABASES',
      items: [
        { name: 'MongoDB', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'MySQL', level: 75 },
        { name: 'Redis', level: 70 },
      ],
    },
    {
      category: 'DEVOPS & TOOLS',
      items: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'AWS', level: 70 },
        { name: 'CI/CD', level: 75 },
        { name: 'Linux/System Admin', level: 80 },
      ],
    },
    {
      category: 'TESTING & QUALITY',
      items: [
        { name: 'Jest', level: 80 },
        { name: 'Unit Testing', level: 85 },
        { name: 'Integration Testing', level: 75 },
        { name: 'API Testing', level: 85 },
      ],
    },
  ]

  const experience = [
    {
      title: 'Full Stack Developer',
      company: 'Freelance / Contract',
      period: '2020 – Present',
      description: 'Developing scalable web applications for clients ranging from startups to enterprise. Specializing in React, Node.js, and cloud-based solutions. Delivered 50+ successful projects with focus on performance, security, and user experience.',
      achievements: [
        'Built and deployed 50+ full-stack applications',
        'Reduced application load times by 40% through optimization',
        'Implemented CI/CD pipelines for automated deployments',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'Various Projects',
      period: '2018 – 2020',
      description: 'Worked on diverse projects including AI/ML applications, e-commerce platforms, and government management systems. Gained expertise in microservices architecture and modern development practices.',
      achievements: [
        'Developed machine learning models for predictive analytics',
        'Architected scalable microservices solutions',
        'Led code reviews and mentored junior developers',
      ],
    },
  ]

  const education = [
    {
      degree: 'BSc Computer Science',
      institution: 'University of Auckland',
      period: '2014 – 2018',
      description: 'Focused on software engineering, artificial intelligence, and system design. Participated in research projects and hackathons.',
    },
  ]

  return (
    <main className="pt-24 pb-16">
      <section className="container-custom max-w-6xl">
        {/* Header with Download Button */}
        <div className="text-center mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                <span className="text-text-muted">RESUME</span>{' '}
                <span className="text-primary">& EXPERIENCE</span>
              </h2>
              <p className="text-text-muted">Full Stack Developer & Software Engineer</p>
            </div>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-bg-primary rounded-lg font-semibold hover:bg-accent transition-all duration-300 shadow-lg shadow-primary/20"
            >
              <span>📄</span>
              Download Resume
              <span>↓</span>
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center border-b border-surface pb-4">
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'skills'
                ? 'bg-primary text-bg-primary'
                : 'bg-surface text-text-muted hover:text-primary'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'experience'
                ? 'bg-primary text-bg-primary'
                : 'bg-surface text-text-muted hover:text-primary'
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'education'
                ? 'bg-primary text-bg-primary'
                : 'bg-surface text-text-muted hover:text-primary'
            }`}
          >
            Education
          </button>
        </div>

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillCategory, categoryIndex) => (
              <div key={categoryIndex} className="bg-surface p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                <h3 className="text-lg font-bold text-primary mb-4 uppercase tracking-wider">
                  {skillCategory.category}
                </h3>
                <div className="space-y-3">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-text-primary text-sm font-medium">
                          {skill.name}
                        </span>
                        <span className="text-text-muted text-xs">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-bg-primary rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="bg-surface p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1">{exp.title}</h3>
                    <h4 className="text-text-muted font-semibold">{exp.company}</h4>
                  </div>
                  <span className="text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
                    {exp.period}
                  </span>
                </div>
                <p className="text-text-muted mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-text-muted text-sm">
                      <span className="text-primary mt-1">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="bg-surface p-6 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1">{edu.degree}</h3>
                    <h4 className="text-text-muted font-semibold">{edu.institution}</h4>
                  </div>
                  <span className="text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
                    {edu.period}
                  </span>
                </div>
                <p className="text-text-muted">{edu.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Download Resume CTA */}
        <div className="mt-12 text-center bg-surface p-8 rounded-xl border border-primary/20">
          <h3 className="text-2xl font-bold text-primary mb-4">Ready to Work Together?</h3>
          <p className="text-text-muted mb-6 max-w-2xl mx-auto">
            Download my complete resume for detailed information about my experience, projects, and qualifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-bg-primary rounded-lg font-semibold hover:bg-accent transition-all duration-300"
            >
              <span>📄</span>
              Download Resume (PDF)
              <span>↓</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById('contact')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-bg-primary transition-all duration-300"
            >
              Get In Touch
              <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Resume
