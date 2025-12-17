import Hero from '../components/Hero'
import Features from '../components/Features'
import AboutSection from '../components/AboutSection'
import Projects from '../components/Projects'
import AboutMeSection from '../components/AboutMeSection'
import SkillsSection from '../components/SkillsSection'
import ContactSection from '../components/ContactSection'

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <AboutSection />
      <Projects />
      <AboutMeSection />
      <SkillsSection />
      <ContactSection />
    </>
  )
}

export default Home

