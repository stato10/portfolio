import { motion } from 'framer-motion'
import ReactPlayer from 'react-player'

function Hero() {
    const scrollToProjects = () => {
        const projectsSection = document.getElementById('portfolio')
        if (projectsSection) {
            const navbarHeight = 100 // Navbar height with top offset and padding
            const elementPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - navbarHeight

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col justify-center px-6 pt-32 md:pt-40 pb-12 overflow-hidden"
        >
            {/* Video Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 z-0" />
                {/* Video Container */}
                <div className="absolute inset-0 z-10 select-none">
                    <ReactPlayer
                        url='https://www.youtube.com/watch?v=34Y_pnKt4TQ'
                        playing
                        loop
                        muted
                        controls={false}
                        width="100%"
                        height="100%"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
                        style={{ transform: 'translate(-50%, -50%) scale(1.4)' }}
                        config={{
                            youtube: {
                                playerVars: {
                                    showinfo: 0,
                                    modestbranding: 1,
                                    controls: 0,
                                    rel: 0,
                                    iv_load_policy: 3,
                                    disablekb: 1,
                                    fs: 0,
                                    playsinline: 1,
                                    loop: 1,
                                    origin: window.location.origin
                                }
                            }
                        }}
                    />
                </div>
            </div>

            <div className="container-custom mx-auto z-10 relative">
                <div className="max-w-[1200px]">
                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-8"
                    >
                        <span className="block text-sm md:text-base font-sans tracking-[0.2em] text-text-muted uppercase">
                            Full Stack Developer
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <h1 className="flex flex-col font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter text-primary mb-12">
                        <motion.span
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="block"
                        >
                            CREATIVE
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="block text-text-muted"
                        >
                            ENGINEER
                        </motion.span>
                    </h1>

                    <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="max-w-md text-text-muted text-lg leading-relaxed font-sans"
                        >
                            Developing scalable, high-performance web applications with a focus on seamless user experiences and modern architecture.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.0 }}
                        >
                            <button
                                onClick={scrollToProjects}
                                className="group flex items-center gap-4 text-primary font-display tracking-widest uppercase hover:text-accent transition-colors"
                            >
                                <span>Recent Work</span>
                                <span className="block h-[1px] w-12 bg-current transition-all duration-300 group-hover:w-20" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        </section>
    )
}

export default Hero
