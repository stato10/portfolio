import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

/**
 * Self-hosted hero background (no YouTube iframe = no center play/pause chrome).
 *
 * 1. Export your reel from your editor as MP4 (H.264 or H.265), muted, 16:9, loop-friendly trim.
 * 2. Place it in `public/videos/` — default filename `hero-video.mp4` (see `public/videos/README.md`).
 * 3. Optional `.env`: `VITE_HERO_VIDEO=videos/my-file.mp4` or full URL `VITE_HERO_VIDEO=https://cdn…/loop.mp4`
 *
 * Served under Vite base: `{import.meta.env.BASE_URL}videos/hero-video.mp4` → `/portfolio/videos/hero-video.mp4`
 */
const DEFAULT_PUBLIC_VIDEO_REL = 'videos/hero-video.mp4'

function useHeroVideoUrl() {
    return useMemo(() => {
        const env = import.meta.env.VITE_HERO_VIDEO?.trim()
        if (env?.startsWith('http://') || env?.startsWith('https://')) {
            return env
        }
        const rel = (env || DEFAULT_PUBLIC_VIDEO_REL).replace(/^\/+/, '')
        const base = import.meta.env.BASE_URL || '/'
        return `${base}${rel}`
    }, [])
}

/**
 * Mimics GSAP SplitText `{ type: 'words, chars' }` for the public GSAP build (SplitText is Club-only).
 *
 * Official API (after you add SplitText from your GSAP account): use `SplitText.create('.split', {...})`
 * and `onSplit(self) { return gsap.from(self.chars, { ... }) }` with `autoSplit: true` when splitting `lines`.
 *
 * @see https://gsap.com/docs/v3/Plugins/SplitText/
 */
function splitWordsAndChars(phrase, charExtraClass = '') {
    const words = phrase.split(/\s+/).filter(Boolean)
    return words.map((word, wi) => (
        <span
            key={`${phrase}-w-${wi}`}
            className="split-word inline-block whitespace-nowrap mr-[0.35em] last:mr-0"
        >
            {word.split('').map((char, ci) => (
                <span
                    key={`${phrase}-w-${wi}-c-${ci}`}
                    className={`split-char inline-block ${charExtraClass}`.trim()}
                >
                    {char}
                </span>
            ))}
        </span>
    ))
}

function Hero() {
    const root = useRef(null)
    const videoWrapRef = useRef(null)
    const videoRef = useRef(null)
    const ctaRef = useRef(null)

    const heroVideoUrl = useHeroVideoUrl()

    useLayoutEffect(() => {
        const v = videoRef.current
        if (!v) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            v.pause()
            v.currentTime = 0
            v.removeAttribute('autoplay')
        }
    }, [heroVideoUrl])

    useEffect(() => {
        const v = videoRef.current
        if (!v) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const p = v.play()
        if (p !== undefined && typeof p.catch === 'function') {
            p.catch(() => {})
        }
    }, [heroVideoUrl])

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

    useGSAP(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduce) return undefined

        let alive = true
        let btnCleanup = () => {}

        const boot = () => {
            if (!alive) return

            btnCleanup()
            btnCleanup = () => {}

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            // Same idea as: SplitText.create('.split', { type: 'words, chars' }); gsap.from(split.chars, {...})
            tl.from('.split-char', {
                duration: 1,
                y: 100,
                autoAlpha: 0,
                stagger: 0.05,
            })
                .from(
                    '.hero-desc',
                    { opacity: 0, y: 24, duration: 0.8 },
                    '-=1.15'
                )
                .from('.hero-cta', { opacity: 0, y: 18, duration: 0.72 }, '-=0.55')
                .from(
                    '.hero-cta-line',
                    {
                        scaleX: 0,
                        transformOrigin: 'left center',
                        duration: 0.65,
                        ease: 'power2.inOut',
                    },
                    '-=0.45'
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
                const onEnter = () => {
                    if (!alive) return
                    gsap.to(btn, { scale: 1.03, duration: 0.35, ease: 'power2.out' })
                }
                const onLeave = () => {
                    gsap.to(btn, { scale: 1, duration: 0.4, ease: 'power2.out' })
                }
                btn.addEventListener('mouseenter', onEnter)
                btn.addEventListener('mouseleave', onLeave)
                btnCleanup = () => {
                    btn.removeEventListener('mouseenter', onEnter)
                    btn.removeEventListener('mouseleave', onLeave)
                }
            }
        }

        if (typeof document !== 'undefined' && document.fonts?.ready) {
            document.fonts.ready.then(() => {
                if (alive) boot()
            })
        } else {
            boot()
        }

        return () => {
            alive = false
            btnCleanup()
        }
    }, { scope: root })

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
                    {/* Native file: crisp up to encoded resolution (e.g. 4K MP4); no third-party overlay. */}
                    <video
                        ref={videoRef}
                        className="absolute left-1/2 top-1/2 min-h-full min-w-full object-cover pointer-events-none"
                        style={{
                            transform: 'translate(-50%, -50%) scale(1.32)',
                            maxWidth: 'none',
                        }}
                        src={heroVideoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        controls={false}
                        disablePictureInPicture
                        controlsList="nodownload nofullscreen noplaybackrate"
                    />
                    {/* Block stray pointer/context-menu focus on video in background stack */}
                    <div
                        className="pointer-events-none absolute inset-0 z-10 bg-transparent"
                        aria-hidden
                    />
                </div>
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
                        <div
                            className="split hero-split-line hero-eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 overflow-hidden text-sm md:text-base font-sans tracking-[0.2em] uppercase text-[#c9c4bb] [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_2px_16px_rgba(0,0,0,0.45)]"
                            aria-label="Full Stack Developer"
                        >
                            <span className="contents" aria-hidden="true">
                                {splitWordsAndChars('Full Stack Developer')}
                            </span>
                        </div>
                        <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-primary/40 bg-black/45 px-4 py-1.5 text-xs font-sans uppercase tracking-widest text-primary shadow-[0_0_0_1px_rgba(10,228,72,0.12)]">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse shadow-[0_0_12px_rgba(10,228,72,0.8)]" />
                            <span
                                className="split hero-split-line flex flex-wrap items-center gap-x-1 gap-y-0.5 overflow-hidden"
                                aria-label="Open to collaborations"
                            >
                                <span className="contents" aria-hidden="true">
                                    {splitWordsAndChars('Open to collaborations')}
                                </span>
                            </span>
                        </span>
                    </div>

                    <h1
                        className="hero-parallax flex flex-col font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.92] tracking-tighter mb-10 md:mb-12"
                        data-depth="0.48"
                    >
                        <span
                            className="hero-line hero-line1 hero-split-line split block overflow-hidden pb-1"
                            aria-label="CREATIVE"
                        >
                            <span className="inline-block" aria-hidden="true">
                                {splitWordsAndChars(
                                    'CREATIVE',
                                    'bg-gradient-to-r from-[#fafaf8] via-primary to-[#7ee8a8] bg-clip-text text-transparent drop-shadow-[0_3px_28px_rgba(0,0,0,0.75)]'
                                )}
                            </span>
                        </span>
                        <span
                            className="hero-line hero-line2 hero-split-line split block overflow-hidden pb-1 -mt-1 sm:-mt-2"
                            aria-label="ENGINEER"
                        >
                            <span className="inline-block" aria-hidden="true">
                                {splitWordsAndChars(
                                    'ENGINEER',
                                    'bg-gradient-to-br from-[#f2efe6] via-[#bfe8d8] to-[#7aa89a] bg-clip-text text-transparent drop-shadow-[0_4px_32px_rgba(0,0,0,0.78)]'
                                )}
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
