// React Portfolio Application
// This file defines all React components and routing for the portfolio site.

const { BrowserRouter, Routes, Route, Link } = ReactRouterDOM;

function Navbar() {
  const [open, setOpen] = React.useState(false);
  // Close mobile menu when a link is clicked
  const handleLinkClick = () => setOpen(false);
  return (
    <header>
      <nav className="navbar">
        <div className="logo"><Link to="/" onClick={handleLinkClick}>Your Name</Link></div>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
          <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
          <li><Link to="/resume" onClick={handleLinkClick}>Resume</Link></li>
          <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
          <li><Link to="/blog" onClick={handleLinkClick}>Blog</Link></li>
        </ul>
        <div className="mobile-menu-icon" onClick={() => setOpen(!open)}>&#9776;</div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <ul>
        <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/resume">Resume</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/blog">Blog</Link></li>
      </ul>
      <p>&copy; 2025 Your Name. All rights reserved.</p>
    </footer>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Not Your Average Developer</h1>
        <p>Turning ideas into reality with creativity and code.</p>
        <Link to="/" className="btn" onClick={() => {
          // scroll to projects on home page
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}>Explore My Work</Link>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="features">
      <div className="container">
        <div className="features-grid">
          <div className="feature-card">
            <img src="assets/icon_apps.png" alt="World‑Class Apps icon" />
            <h3>World‑Class Apps</h3>
            <p>Crafting performant, user‑friendly applications across web and mobile platforms.</p>
          </div>
          <div className="feature-card">
            <img src="assets/icon_tailored.png" alt="Tailored solutions icon" />
            <h3>Tailored Solutions</h3>
            <p>Every project is unique—solutions are designed around your specific needs and goals.</p>
          </div>
          <div className="feature-card">
            <img src="assets/icon_code.png" alt="Pixel‑Perfect Code icon" />
            <h3>Pixel‑Perfect Code</h3>
            <p>Attention to detail ensures clean, maintainable code and beautiful interfaces.</p>
          </div>
          <div className="feature-card">
            <img src="assets/icon_love.png" alt="Built With Love icon" />
            <h3>Built With Love</h3>
            <p>A passion for technology drives the creation of products that people love to use.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  // array of project data for mapping
  const projects = [
    {
      id: 1,
      img: 'assets/project1.png',
      title: 'AI Research',
      description: 'Exploring the possibilities of machine learning and artificial intelligence.'
    },
    {
      id: 2,
      img: 'assets/project2.png',
      title: 'Mobile UI',
      description: 'Designing sleek mobile experiences that delight users and meet business goals.'
    },
    {
      id: 3,
      img: 'assets/project3.png',
      title: 'Adventure App',
      description: 'An outdoor companion app bringing real‑time data and social features together.'
    },
    {
      id: 4,
      img: 'assets/project4.png',
      title: 'Voice Assistant',
      description: 'Natural language interfaces that simplify the way users interact with technology.'
    },
    {
      id: 5,
      img: 'assets/project5.png',
      title: 'Game Design',
      description: 'Immersive game worlds built with rich narratives and captivating visuals.'
    },
    {
      id: 6,
      img: 'assets/project6.png',
      title: 'Data Insights',
      description: 'Transforming raw data into actionable insights through thoughtful analysis.'
    }
  ];
  return (
    <section id="projects" className="projects">
      <h2>Case Studies</h2>
      <div className="project-grid">
        {projects.map(p => (
          <div key={p.id} className="project-card">
            <img src={p.img} alt={`${p.title} image`} />
            <div className="overlay">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              {/* In a real site these would link to dedicated pages */}
              <Link to="/" className="btn">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cta">
      <h2>Ready to start a project?</h2>
      <div className="btn-group">
        <Link to="/about" className="btn">Learn More About Me</Link>
        <Link to="/contact" className="btn">Get In Touch</Link>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Projects />
      <CTA />
    </>
  );
}

function About() {
  return (
    <main>
      <section className="about-section">
        <div className="about-img">
          <img src="assets/about_img.png" alt="Profile illustration" />
        </div>
        <div className="about-content">
          <h2>Hi, I’m [Your Name]</h2>
          <p>I am a software professional who loves crafting engaging digital experiences. My work spans web development, mobile applications, user interface design and experimental game projects. I enjoy collaborating with clients of all sizes, translating complex problems into elegant, practical solutions.</p>
          <p>With over a decade of experience, I focus on delivering high‑quality code and thoughtful designs that not only meet requirements but exceed expectations. Beyond development, I mentor teams, research emerging technologies and contribute to open‑source projects.</p>
          <div className="stats">
            <div className="stat"><h3>10+</h3><p>Years Experience</p></div>
            <div className="stat"><h3>100+</h3><p>Projects Completed</p></div>
            <div className="stat"><h3>50+</h3><p>Happy Clients</p></div>
          </div>
          <div className="process">
            <div className="process-step">
              <h4>01. Research</h4>
              <p>Deeply understanding the subject matter is the first step. I explore the domain, analyse the competition and identify opportunities for innovation.</p>
            </div>
            <div className="process-step">
              <h4>02. Design</h4>
              <p>From wireframes to prototypes, I collaborate with stakeholders to refine the user experience and visual style, ensuring the end product resonates with the intended audience.</p>
            </div>
            <div className="process-step">
              <h4>03. Develop</h4>
              <p>Using modern frameworks and best practices, I build scalable and maintainable software. Rigorous testing and iteration ensure the final product is robust and polished.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Resume() {
  return (
    <main>
      <section className="resume-section">
        <h2>Resume</h2>
        <div className="resume-entry">
          <h3>Senior Software Engineer</h3>
          <h4>XYZ Corporation • 2019 – Present</h4>
          <p>Leading cross‑functional teams to develop scalable web and mobile applications. Architected cloud‑native services, mentored junior engineers and collaborated closely with designers and product managers to deliver user‑centric solutions.</p>
        </div>
        <div className="resume-entry">
          <h3>Full‑Stack Developer</h3>
          <h4>Acme Labs • 2016 – 2019</h4>
          <p>Designed and implemented full‑stack solutions using JavaScript frameworks, built RESTful APIs and optimised database performance. Improved application accessibility and performance across multiple projects.</p>
        </div>
        <div className="resume-entry">
          <h3>Software Engineer</h3>
          <h4>Start‑Up Studio • 2013 – 2016</h4>
          <p>Developed mobile and web prototypes for a range of start‑up clients. Conducted user research, created UI mockups and implemented responsive interfaces. Gained exposure to agile methodologies and rapid iteration.</p>
        </div>
        <div className="resume-entry">
          <h3>Education</h3>
          <h4>BSc Computer Science, University of Technology • 2009 – 2013</h4>
          <p>Focused on software engineering, human‑computer interaction and artificial intelligence. Participated in hackathons and contributed to open‑source projects.</p>
        </div>
        <div className="resume-entry">
          <h3>Skills</h3>
          <p>JavaScript, TypeScript, Python, Java, C# • React, Angular, Vue • Node.js, Express • SQL, MongoDB, GraphQL • AWS, Docker, Kubernetes • UI/UX Design • Agile & Scrum • Testing & CI/CD</p>
        </div>
      </section>
    </main>
  );
}

function Contact() {
  return (
    <main>
      <section className="contact-section">
        <h2>Get In Touch</h2>
        <form className="contact-form" action="mailto:youremail@example.com" method="POST" encType="text/plain">
          <div>
            <label htmlFor="name">Your Name (required)</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="email">Your Email (required)</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" />
          </div>
          <div>
            <label htmlFor="message">Your Message</label>
            <textarea id="message" name="message" rows="5" />
          </div>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </main>
  );
}

function Blog() {
  return (
    <main>
      <section className="blog-section">
        <h2>Blog</h2>
        <div className="blog-post">
          <img src="assets/project2.png" alt="Blog post" />
          <div className="blog-post-content">
            <h3><Link to="/blog/post1">Designing Nostalgic User Interfaces for Mobile</Link></h3>
            <div className="meta">March 6, 2025 &nbsp;|&nbsp; UI/UX</div>
            <p>How recreating classic user interfaces can inspire modern app design and delight a new generation of users.</p>
            <Link to="/blog/post1">Read more</Link>
          </div>
        </div>
        <div className="blog-post">
          <img src="assets/project1.png" alt="Blog post" />
          <div className="blog-post-content">
            <h3><Link to="/blog/post2">Machine Learning in Everyday Apps</Link></h3>
            <div className="meta">January 15, 2025 &nbsp;|&nbsp; AI</div>
            <p>A beginner‑friendly overview of integrating ML algorithms into consumer applications.</p>
            <Link to="/blog/post2">Read more</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Post1() {
  return (
    <main>
      <article className="blog-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>Designing Nostalgic User Interfaces for Mobile</h2>
        <div className="meta" style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--muted-text-color)' }}>March 6, 2025 &nbsp;|&nbsp; UI/UX</div>
        <img src="assets/project2.png" alt="Retro UI illustration" style={{ width: '100%', height: 'auto', borderRadius: 'var(--border-radius)', marginBottom: '1.5rem' }} />
        <p>Have you ever felt a wave of nostalgia when booting up an old console or navigating through a retro operating system? There's a certain magic to the user interfaces of the past. While modern design trends favour minimalism and efficiency, older interfaces were often unapologetically quirky and full of character.</p>
        <p>In this article we explore how recreating classic interfaces—like the original Xbox dashboard or early media players—can inform present‑day mobile design. By analysing the layout, typography and interaction patterns of these legacy systems, we can glean inspiration for engaging, intuitive experiences that also tug at the heart strings of users who grew up with them.</p>
        <p>We'll cover techniques for modernising retro aesthetics, such as blending skeuomorphic elements with flat design, and using motion graphics to guide users through complex menus. We'll also discuss the importance of accessibility and how to balance authenticity with usability on small screens.</p>
        <p>Whether you're a designer looking for fresh ideas or a developer interested in experimentation, reimagining nostalgic UIs can be a rewarding creative exercise that connects the past to the future.</p>
      </article>
    </main>
  );
}

function Post2() {
  return (
    <main>
      <article className="blog-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>Machine Learning in Everyday Apps</h2>
        <div className="meta" style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--muted-text-color)' }}>January 15, 2025 &nbsp;|&nbsp; AI</div>
        <img src="assets/project1.png" alt="AI analytics illustration" style={{ width: '100%', height: 'auto', borderRadius: 'var(--border-radius)', marginBottom: '1.5rem' }} />
        <p>Machine learning (ML) has moved from research labs to devices in our pockets. From recommending your next favourite song to helping you type faster, ML models are quietly powering many features we now take for granted.</p>
        <p>In this post we demystify how ML can be integrated into everyday applications. We'll break down key concepts such as supervised and unsupervised learning, discuss the importance of dataset quality and share tips for choosing the right frameworks.</p>
        <p>We'll also look at practical examples, including on‑device models that run offline, cloud‑hosted APIs for complex tasks and ways to respect user privacy while still delivering personalised experiences. Whether you're an app developer exploring ML for the first time or a product manager curious about what's possible, this article provides a gentle introduction to getting started.</p>
      </article>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/post1" element={<Post1 />} />
        <Route path="/blog/post2" element={<Post2 />} />
        {/* fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);