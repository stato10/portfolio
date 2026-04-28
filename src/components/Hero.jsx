import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ReactPlayer from 'react-player'

function splitChars(word) {
    return word.split('').map((char, i) => (
        <span key={`${word}-${i}`} className="hero-char inline-block">
            {char}
        </span>
    ))
}

function Hero() {
    const root = useRef(null)
    const videoWrapRef = useRef(null)
    const ctaRef = useRef(null)

    const scrollToProjects = () => {
        const projectsSection = document.getElementById('portfolio')
        if (projectsSection) {
            const navbarHeight = 100
            const elementPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - navbarHeight
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            })
        }
    }

    useGSAP(
        (context, contextSafe) => {
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            if (reduce) return

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            tl.from('.hero-eyebrow', { opacity: 0, y: 22, duration: 0.75 }, 0)
                .from(
                    '.hero-line1 .hero-char',
                    {
                        yPercent: 115,
                        opacity: 0,
                        duration: 0.82,
                        stagger: 0.035,
                        ease: 'power4.out',
                    },
                    0.12
                )
                .from(
                    '.hero-line2 .hero-char',
                    {
                        yPercent: 115,
                        opacity: 0,
                        duration: 0.82,
                        stagger: 0.035,
                        ease: 'power4.out',
                    },
                    0.22
                )
                .from('.hero-desc', { opacity: 0, y: 28, duration: 0.85 }, 0.42)
                .from('.hero-cta', { opacity: 0, y: 20, duration: 0.75 }, 0.52)
                .from(
                    '.hero-badge',
                    { opacity: 0, scale: 0.92, duration: 0.6, stagger: 0.06 },
                    0.58
                )

            if (videoWrapRef.current) {
                gsap.to(videoWrapRef.current, {
                    scale: 1.06,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: root.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                })
            }

            gsap.to('.hero-content-inner', {
                y: 72,
                ease: 'none',
                scrollTrigger: {
                    trigger: root.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            })

            const btn = ctaRef.current
            if (btn) {
                const onEnter = contextSafe(() => {
                    gsap.to(btn, { scale: 1.03, duration: 0.35, ease: 'power2.out' })
                })
                const onLeave = contextSafe(() => {
                    gsap.to(btn, { scale: 1, duration: 0.4, ease: 'power2.out' })
                })
                btn.addEventListener('mouseenter', onEnter)
                btn.addEventListener('mouseleave', onLeave)
                return () => {
                    btn.removeEventListener('mouseenter', onEnter)
                    btn.removeEventListener('mouseleave', onLeave)
                }
            }
        },
        { scope: root }
    )

    return (
        <section
            ref={root}
            id="hero"
            className="relative min-h-screen flex flex-col justify-center px-6 pt-32 md:pt-40 pb-12 overflow-hidden"
        >
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-slate-900 z-0" />
                <div
                    ref={videoWrapRef}
                    className="absolute inset-0 z-10 select-none will-change-transform"
                >
                    <ReactPlayer
                        url="https://www.youtube.com/watch?v=w0a80L6j47E"
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
                                },
                            },
                        }}
                    />
                </div>
                <div className="absolute inset-0 z-[5] bg-gradient-to-b from-bg-primary/95 via-bg-primary/55 to-bg-primary/95 pointer-events-none" />
            </div>

            <div className="container-custom mx-auto z-10 relative hero-content-inner will-change-transform">
                <div className="max-w-[1200px]">
                    <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                        <span className="hero-eyebrow block text-sm md:text-base font-sans tracking-[0.2em] text-zinc-400 uppercase">
                            Full Stack Developer
                        </span>
                        <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/[0.07] px-4 py-1.5 text-xs font-sans uppercase tracking-widest text-primary backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_12px_rgba(10,228,72,0.8)]" />
                            Open to collaborations
                        </span>
                    </div>

                    <h1 className="flex flex-col font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.92] tracking-tighter text-text-primary mb-10 md:mb-12">
                        <span className="hero-line1 block overflow-hidden">
                            <span className="inline-block bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent">
                                {splitChars('CREATIVE')}
                            </span>
                        </span>
                        <span className="hero-line2 block overflow-hidden">
                            <span className="inline-block text-text-muted">{splitChars('ENGINEER')}</span>
                        </span>
                    </h1>

                    <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
                        <p className="hero-desc max-w-lg text-zinc-300 text-lg leading-relaxed font-sans">
                            I design and ship fast, accessible products—pairing solid architecture with
                            motion and detail so interfaces feel as good as they perform.
                        </p>

                        <div className="flex flex-col items-start gap-6">
                            <button
                                ref={ctaRef}
                                type="button"
                                onClick={scrollToProjects}
                                className="hero-cta group flex items-center gap-4 text-primary font-display tracking-widest uppercase"
                            >
                                <span>Recent Work</span>
                                <span className="block h-px w-12 bg-current transition-all duration-300 group-hover:w-20" />
                            </button>
                            <p className="text-xs font-sans uppercase tracking-[0.25em] text-zinc-500 max-w-[220px] leading-relaxed">
                                Scroll to explore selected builds, stack, and contact.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 z-[6] opacity-[0.12] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </section>
    )
}

export default Hero
