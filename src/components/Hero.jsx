import { useEffect, useState } from 'react'

// YouTube Video URL - Replace with your YouTube video ID or full URL
// Example: 'dQw4w9WgXcQ' or 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
const YOUTUBE_VIDEO_ID = '34Y_pnKt4TQ' // YouTube video ID

function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('portfolio')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Convert YouTube URL to video ID if full URL is provided
  const getYouTubeVideoId = (urlOrId) => {
    if (!urlOrId) return ''
    
    // If it's already just an ID, return it
    if (!urlOrId.includes('youtube.com') && !urlOrId.includes('youtu.be')) {
      return urlOrId
    }
    
    // Extract video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = urlOrId.match(regExp)
    return (match && match[2].length === 11) ? match[2] : ''
  }

  const videoId = getYouTubeVideoId(YOUTUBE_VIDEO_ID)
  const youtubeEmbedUrl = videoId 
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1${typeof window !== 'undefined' ? `&origin=${window.location.origin}` : ''}`
    : null

  return (
    <section 
      id="hero"
      className="relative min-h-[70vh] flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* YouTube Video Background - Professional Implementation */}
      {youtubeEmbedUrl && (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <iframe
            src={youtubeEmbedUrl}
            className="absolute top-1/2 left-1/2"
            style={{
              width: '177.77777778vh', // Maintains 16:9 aspect ratio
              height: '100vh',
              minWidth: '100%',
              minHeight: '56.25vw', // Ensures full video is visible
              transform: 'translate(-50%, -50%)',
              border: 'none',
              pointerEvents: 'none',
            }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Hero Background Video"
            frameBorder="0"
          />
        </div>
      )}
      
      {/* Professional Gradient Overlay - Lighter for better video visibility */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(135deg, rgba(11, 13, 16, 0.75) 0%, rgba(11, 13, 16, 0.70) 50%, rgba(11, 13, 16, 0.80) 100%)',
        }}
      ></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Professional Content */}
      <div 
        className={`relative z-10 text-center max-w-5xl px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{
          left: 'auto',
          top: 'auto',
        }}
      >
        {/* Subtitle */}
        <div className="mb-6">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-primary/80 font-medium mb-4 drop-shadow-lg">
            Full Stack Developer
          </span>
        </div>
        
        {/* Main Heading with Professional Typography */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
          <span className="block text-text-primary mb-2 drop-shadow-lg">
            Creative
          </span>
          <span className="block text-primary drop-shadow-lg">
            Software Engineer
          </span>
        </h1>

        <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
          Building scalable solutions with modern technologies. Transforming ideas into production-ready applications.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#portfolio" 
            onClick={(e) => {
              e.preventDefault()
              scrollToProjects()
            }}
            className="group relative px-8 py-4 bg-primary text-bg-primary rounded-lg font-medium text-sm uppercase tracking-wider transition-all duration-300 hover:bg-accent hover:scale-105 hover:shadow-xl hover:shadow-primary/50 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
            className="group px-8 py-4 border-2 border-primary/50 text-primary rounded-lg font-medium text-sm uppercase tracking-wider transition-all duration-300 hover:border-primary hover:bg-primary/10"
          >
            <span className="flex items-center gap-2">
              Get In Touch
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>

    </section>
  )
}

export default Hero
