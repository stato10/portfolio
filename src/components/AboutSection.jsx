function AboutSection() {
  return (
    <section id="about" className="section-padding bg-surface relative overflow-hidden">
      {/* Professional Decorative Image */}
      <div 
        className="absolute right-0 top-0 w-[600px] h-full opacity-[0.05] pointer-events-none hidden md:block"
        style={{
          left: 'auto',
        }}
      >
        <div className="relative w-full h-full flex items-center justify-end pr-8">
          <img
            src="https://res.cloudinary.com/dpz2lh8hu/image/upload/v1753432895/a77c4ee3-ec88-421d-ad2b-1cacfc6e612b_eowqiu.png"
            alt="Decorative background"
            className="max-w-full max-h-full w-auto h-auto object-contain"
            style={{
              objectFit: 'contain',
              objectPosition: 'right center',
            }}
          />
        </div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="text-xs uppercase tracking-[0.2em] text-primary/60 font-medium">Introduction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
            <span className="text-text-primary">Hi. I'm Avraham,</span>
            <span className="block text-primary mt-2">nice to meet you.</span>
          </h2>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
            I am passionate about building excellent software that improves the lives of those around me. I specialize in creating software for clients ranging from individuals and small-businesses all the way to large enterprise corporations.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
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
      </div>
    </section>
  )
}

export default AboutSection
