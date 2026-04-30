import { useMemo, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ReactPlayer from 'react-player'

/** Public watch/shorts/embed URL or raw 11-char id — override with `VITE_HERO_YOUTUBE_URL` in `.env` if needed. */
const DEFAULT_HERO_YOUTUBE = 'https://www.youtube.com/watch?v=34Y_pnKt4TQ'

function parseYoutubeId(input) {
    if (!input || typeof input !== 'string') return null
    const trimmed = input.trim()
    const fromUrl = trimmed.match(
        /(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/
    )
    if (fromUrl) return fromUrl[1]
    return /^[\w-]{11}$/.test(trimmed) ? trimmed : null
}

function useHeroYoutubeSrc() {
    return useMemo(() => {
        const env = import.meta.env.VITE_HERO_YOUTUBE_URL
        const raw = typeof env === 'string' && env.trim() ? env.trim() : DEFAULT_HERO_YOUTUBE
        const id = parseYoutubeId(raw)
        if (id) {
            return {
                src: `https://www.youtube-nocookie.com/watch?v=${id}`,
                videoId: id,
            }
        }
        return { src: raw.startsWith('http') ? raw : DEFAULT_HERO_YOUTUBE, videoId: null }
    }, [])
}

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
    const { src: heroVideoSrc, videoId: heroYoutubeId } = useHeroYoutubeSrc()

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

            tl.from('.hero-eyebrow', { opacity: 0, y: 18, duration: 0.7 }, 0)
                .from(
                    '.hero-line1 .hero-char',
                    {
                        yPercent: 108,
                        opacity: 0,
                        skewY: 3,
                        duration: 0.88,
                        stagger: { each: 0.032, from: 'start' },
                        ease: 'power4.out',
                    },
                    0.1
                )
                .from(
                    '.hero-line2 .hero-char',
                    {
                        yPercent: 108,
                        opacity: 0,
                        skewY: -2.5,
                        duration: 0.88,
                        stagger: { each: 0.032, from: 'start' },
                        ease: 'power4.out',
                    },
                    0.18
                )
                .from('.hero-desc', { opacity: 0, y: 24, duration: 0.8 }, 0.38)
                .from('.hero-cta', { opacity: 0, y: 18, duration: 0.72 }, 0.48)
                .from(
                    '.hero-cta-line',
                    { scaleX: 0, transformOrigin: 'left center', duration: 0.65, ease: 'power2.inOut' },
                    0.62
                )
                .from(
                    '.hero-badge',
                    { opacity: 0, y: 12, scale: 0.94, duration: 0.55, ease: 'back.out(1.35)' },
                    0.52
                )

            const parallaxRoots = root.current?.querySelectorAll('.hero-parallax')
            parallaxRoots?.forEach((el, i) => {
                const depth = Number.parseFloat(el.dataset.depth ?? '0.5')
                gsap.to(el, {
                    y: 52 * depth,
                    ease: 'none',
                    scrollTrigger: {
                        id: `hero-layer-${i}`,
                        trigger: root.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 0.45,
                    },
                })
            })

            if (videoWrapRef.current) {
                gsap.to(videoWrapRef.current, {
                    scale: 1.05,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: root.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                })
            }

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
                    className="absolute inset-0 z-[1] select-none will-change-transform pointer-events-none"
                    aria-hidden
                >
                    <ReactPlayer
                        src={heroVideoSrc}
                        playing
                        loop
                        muted
                        playsInline
                        controls={false}
                        width="100%"
                        height="100%"
                        className="absolute top-1/2 left-1/2 min-w-full min-h-full [&_iframe]:pointer-events-none"
                        style={{
                            transform: 'translate(-50%, -50%) scale(1.32)',
                            maxWidth: 'none',
                        }}
                        config={{
                            youtube: {
                                fs: 0,
                                disablekb: 1,
                                rel: 0,
                                modestbranding: 1,
                                iv_load_policy: 3,
                                playsinline: 1,
                                ...(typeof window !== 'undefined' && {
                                    origin: window.location.origin,
                                }),
                                ...(heroYoutubeId ? { playlist: heroYoutubeId } : {}),
                            },
                        }}
                    />
                </div>
                {/* Scrims sit above the video (no backdrop-filter / no blur on footage) */}
                <div
                    className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-r from-bg-primary/[0.82] via-bg-primary/[0.38] to-transparent"
                    aria-hidden
                />
                <div
                    className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-bg-primary/55"
                    aria-hidden
                />
                <div
                    className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-br from-emerald-950/25 via-transparent to-amber-950/20 mix-blend-soft-light opacity-80"
                    aria-hidden
                />
            </div>

            <div className="container-custom mx-auto z-10 relative hero-content-inner will-change-transform">
                <div className="max-w-[1200px]">
                    <div
                        className="hero-parallax mb-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
                        data-depth="0.32"
                    >
                        <span className="hero-eyebrow block text-sm md:text-base font-sans tracking-[0.2em] uppercase text-[#c9c4bb] [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_2px_16px_rgba(0,0,0,0.45)]">
                            Full Stack Developer
                        </span>
                        <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-primary/40 bg-black/45 px-4 py-1.5 text-xs font-sans uppercase tracking-widest text-primary shadow-[0_0_0_1px_rgba(10,228,72,0.12)]">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_12px_rgba(10,228,72,0.8)]" />
                            Open to collaborations
                        </span>
                    </div>

                    <h1
                        className="hero-parallax flex flex-col font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.92] tracking-tighter mb-10 md:mb-12"
                        data-depth="0.48"
                    >
                        <span className="hero-line1 block overflow-hidden pb-1">
                            <span className="inline-block bg-gradient-to-r from-[#fafaf8] via-primary to-[#7ee8a8] bg-clip-text text-transparent drop-shadow-[0_3px_28px_rgba(0,0,0,0.75)]">
                                {splitChars('CREATIVE')}
                            </span>
                        </span>
                        <span className="hero-line2 block overflow-hidden pb-1 -mt-1 sm:-mt-2">
                            <span className="inline-block bg-gradient-to-br from-[#f2efe6] via-[#bfe8d8] to-[#7aa89a] bg-clip-text text-transparent drop-shadow-[0_4px_32px_rgba(0,0,0,0.78)]">
                                {splitChars('ENGINEER')}
                            </span>
                        </span>
                    </h1>

                    <div
                        className="hero-parallax flex flex-col md:flex-row gap-12 items-start justify-between"
                        data-depth="0.65"
                    >
                        <p className="hero-desc max-w-lg text-lg leading-relaxed font-sans text-[#ebe8e0] [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_24px_rgba(0,0,0,0.5)]">
                            I design and ship fast, accessible products—pairing solid architecture with
                            motion and detail so interfaces feel as good as they perform.
                        </p>

                        <div className="flex flex-col items-start gap-6">
                            <button
                                ref={ctaRef}
                                type="button"
                                onClick={scrollToProjects}
                                className="hero-cta group flex items-center gap-4 text-primary font-display tracking-widest uppercase drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)]"
                            >
                                <span>Recent Work</span>
                                <span className="hero-cta-line block h-px w-12 bg-current transition-all duration-300 group-hover:w-20" />
                            </button>
                            <p className="text-xs font-sans uppercase tracking-[0.25em] text-[#a8a49a] max-w-[220px] leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.85)]">
                                Scroll to explore selected builds, stack, and contact.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 z-[4] opacity-[0.1] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </section>
    )
}

export default Hero
