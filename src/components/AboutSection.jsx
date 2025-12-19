function AboutSection() {
  return (
    <section id="about" className="section-padding bg-surface relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Content Section */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <div className="inline-block mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-primary/60 font-medium">Introduction</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
              <span className="text-text-primary">Hi. I'm Avraham,</span>
              <span className="block text-primary mt-2">nice to meet you.</span>
            </h2>
            <p className="text-base md:text-lg text-text-muted leading-relaxed mb-10 max-w-2xl md:max-w-none mx-auto md:mx-0">
              I am passionate about building excellent software that improves the lives of those around me. I specialize in creating software for clients ranging from individuals and small-businesses all the way to large enterprise corporations.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8">
              <div className="px-4 py-2 bg-bg-primary rounded-full border border-primary/30 hover:border-primary/50 transition-all duration-300">
                <span className="text-text-primary text-xs font-medium uppercase tracking-wider">Full Stack Development</span>
              </div>
              <div className="px-4 py-2 bg-bg-primary rounded-full border border-primary/30 hover:border-primary/50 transition-all duration-300">
                <span className="text-text-primary text-xs font-medium uppercase tracking-wider">System Architecture</span>
              </div>
              <div className="px-4 py-2 bg-bg-primary rounded-full border border-primary/30 hover:border-primary/50 transition-all duration-300">
                <span className="text-text-primary text-xs font-medium uppercase tracking-wider">Cloud Solutions</span>
              </div>
              <div className="px-4 py-2 bg-bg-primary rounded-full border border-primary/30 hover:border-primary/50 transition-all duration-300">
                <span className="text-text-primary text-xs font-medium uppercase tracking-wider">AI Integration</span>
              </div>
            </div>
          </div>

          {/* Professional Image Section */}
          <div className="order-1 md:order-2 relative flex items-center justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl blur-2xl transform rotate-6"></div>
              
              {/* Image container with professional styling */}
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10 bg-bg-primary/50 backdrop-blur-sm">
                {/* Subtle glow effect - reduced to not obscure face */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
                
                {/* Main image */}
                <div className="relative aspect-[3/4] w-full min-h-[450px]">
                  <img
                    src="https://res.cloudinary.com/dpz2lh8hu/image/upload/v1753432895/a77c4ee3-ec88-421d-ad2b-1cacfc6e612b_eowqiu.png"
                    alt="Avraham - Full Stack Developer"
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: '50% 25%',
                      imageRendering: 'smooth',
                    }}
                    loading="eager"
                  />
                  
                  {/* Minimal overlay gradient - very subtle */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/10 via-transparent to-transparent pointer-events-none"></div>
                </div>
                
                {/* Decorative corner accent - reduced opacity to not obscure face */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent/20 to-transparent rounded-tr-full pointer-events-none"></div>
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl hidden lg:block"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/10 rounded-full blur-xl hidden lg:block"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
