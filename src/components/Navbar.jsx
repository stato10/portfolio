import { useState, useEffect, useRef, useLayoutEffect, useCallback, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import NavbarMobileMenu from './NavbarMobileMenu'
import { PRIMARY_NAV_LINKS } from '../constants/primaryNavLinks'
import { LenisRefContext } from './SmoothScroll'

const NAV_LINK_CLASSES =
    'relative px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-200 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/60'

/** Fixed header offset passed to Lenis.scrollTo (negative raises target). */
const NAV_SCROLL_OFFSET = -96

/**
 * Mobile menu matches GSAP demo pattern: timeline .clear() + rebuild, different enter (fromTo) vs exit (to).
 * @see https://codepen.io/GreenSock/pen/raMQBVQ
 */

function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const lenisRef = useContext(LenisRefContext)

    const scrollToHero = useCallback(() => {
        const lenis = lenisRef?.current
        const el = document.getElementById('hero')
        if (lenis && typeof lenis.scrollTo === 'function') {
            if (el) {
                lenis.scrollTo('#hero', { offset: NAV_SCROLL_OFFSET })
            } else {
                lenis.scrollTo(0, { immediate: true })
            }
            return
        }
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY + NAV_SCROLL_OFFSET
            window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [lenisRef])

    const scrollToHash = useCallback(
        (hash) => {
            const id = hash.replace('#', '')
            if (!id) return
            const lenis = lenisRef?.current
            if (lenis && typeof lenis.scrollTo === 'function') {
                lenis.scrollTo(`#${id}`, { offset: NAV_SCROLL_OFFSET })
                return
            }
            const element = document.getElementById(id)
            if (element) {
                const top = element.getBoundingClientRect().top + window.pageYOffset + NAV_SCROLL_OFFSET
                window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
            }
        },
        [lenisRef]
    )

    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    const menuTl = useRef(gsap.timeline())

    const overlayRef = useRef(null)
    const barTopRef = useRef(null)
    const barBotRef = useRef(null)
    const menuBtnRef = useRef(null)
    const toggleMenuRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setScrolled(currentScrollY > 24)

            const sections = ['portfolio', 'about', 'contact']
            let current = ''

            sections.forEach((sectionId) => {
                const element = document.getElementById(sectionId)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 140 && rect.bottom >= 140) {
                        current = sectionId
                    }
                }
            })

            if (currentScrollY < 120) {
                current = 'home'
            }

            setActiveSection(current)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    /** Mobile menu: Safari/iOS fixes broken `fixed` overlays when only `overflow: hidden` is used on body. */
    useEffect(() => {
        const body = document.body
        const html = document.documentElement

        let savedScrollY = 0

        if (!menuOpen) {
            return
        }

        const mq = typeof window.matchMedia !== 'undefined' ? window.matchMedia('(max-width: 767px)') : null
        const isMobileViewport = mq ? mq.matches : true

        if (isMobileViewport) {
            savedScrollY = window.scrollY || html.scrollTop || 0
            html.style.overflow = 'hidden'
            body.style.overflow = 'hidden'
            body.style.position = 'fixed'
            body.style.top = `-${savedScrollY}px`
            body.style.left = '0'
            body.style.right = '0'
            body.style.width = '100%'
            return () => {
                body.style.position = ''
                body.style.top = ''
                body.style.left = ''
                body.style.right = ''
                body.style.width = ''
                body.style.overflow = ''
                html.style.overflow = ''
                window.scrollTo(0, savedScrollY)
            }
        }

        body.style.overflow = 'hidden'
        return () => {
            body.style.overflow = ''
        }
    }, [menuOpen])

    /** If the viewport crosses `md` while the drawer is open, close it so body scroll lock / hidden overlay don’t desync. */
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)')
        const onChange = () => {
            if (!mq.matches && menuOpen) {
                toggleMenuRef.current?.(false)
            }
        }
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [menuOpen])

    useEffect(() => {
        return () => {
            menuTl.current.kill()
            menuTl.current = gsap.timeline()
            const body = document.body
            const html = document.documentElement
            body.style.position = ''
            body.style.top = ''
            body.style.left = ''
            body.style.right = ''
            body.style.width = ''
            body.style.overflow = ''
            html.style.overflow = ''
        }
    }, [])

    /** When `/` carries a hash, scroll to section (works after SPA nav from `/resume`, `/blog`, etc.). */
    useEffect(() => {
        if (location.pathname !== '/') return
        const h = location.hash
        if (!h || h === '#') return
        const t = window.setTimeout(() => scrollToHash(h), 100)
        return () => window.clearTimeout(t)
    }, [location.pathname, location.hash, scrollToHash])

    const handleLinkClick = useCallback(() => {
        if (menuOpen) {
            toggleMenuRef.current?.(false)
        }
    }, [menuOpen])

    const goToPrimarySection = useCallback(
        (hash) => {
            const normalized = hash.startsWith('#') ? hash : `#${hash}`
            if (location.pathname === '/' && location.hash === normalized) {
                scrollToHash(normalized)
                return
            }
            navigate({ pathname: '/', hash: normalized.slice(1) })
        },
        [location.pathname, location.hash, navigate, scrollToHash]
    )

    const handlePrimaryHomeClick = (e) => {
        handleLinkClick()
        if (location.pathname === '/') {
            e.preventDefault()
            if (location.hash) {
                navigate('/', { replace: true })
            }
            scrollToHero()
            return
        }
        setTimeout(scrollToHero, 200)
    }

    const linkIsActive = (link) => {
        if (link.path === '/') {
            if (location.pathname !== '/') return false
            const hasHash = Boolean(location.hash && location.hash.replace('#', ''))
            if (hasHash) return false
            return activeSection === 'home'
        }
        if (location.pathname !== '/') return false
        if (link.hash) {
            const idFromHash = link.hash.slice(1)
            return location.hash === link.hash || activeSection === idFromHash || activeSection === link.section
        }
        return false
    }

    /** ─── GSAP enter / exit (matches CodePen raMQBVQ structure) ─── */

    const openMobileMenu = useCallback(() => {
        const nav = overlayRef.current
        const topLine = barTopRef.current
        const botLine = barBotRef.current
        /** Overlay must always open — hamburger refs are SVG <line>s; omitting icons must not silently fail on WebKit/mobile. */
        if (!nav) return

        const bg = nav.querySelector('.nav-bg')
        const panels = nav.querySelectorAll('.nav-panel')
        const items = nav.querySelectorAll('.nav-item')
        const loginEl = nav.querySelector('.nav-login')

        menuTl.current.clear()

        const tl = menuTl.current.set(nav, { visibility: 'visible', pointerEvents: 'auto' })
        if (bg) {
            tl.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
        }

        if (panels.length) {
            tl.fromTo(
                panels,
                { xPercent: 101, y: 0, rotation: 0 },
                { xPercent: 0, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.2 },
                0
            )
        }
        if (items.length) {
            tl.fromTo(
                items,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 1.2, ease: 'expo.out', stagger: 0.03 },
                0.1
            )
        }
        if (topLine && botLine) {
            tl.fromTo(
                topLine,
                { stroke: 'currentColor', attr: { x1: 4, y1: 7, x2: 18, y2: 7 } },
                {
                    stroke: '#0e100f',
                    attr: { x1: 6, y1: 6, x2: 16, y2: 16 },
                    duration: 0.35,
                    ease: 'back.out(1.4)',
                },
                0.06
            ).fromTo(
                botLine,
                { stroke: 'currentColor', attr: { x1: 4, y1: 13, x2: 18, y2: 13 } },
                {
                    stroke: '#0e100f',
                    attr: { x1: 16, y1: 6, x2: 6, y2: 16 },
                    duration: 0.35,
                    ease: 'back.out(1.4)',
                },
                0.06
            )
        }
        if (loginEl) {
            tl.fromTo(loginEl, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, 0.4)
        }
    }, [])

    const closeMobileMenu = useCallback(() => {
        const nav = overlayRef.current
        const topLine = barTopRef.current
        const botLine = barBotRef.current
        if (!nav) return

        const bg = nav.querySelector('.nav-bg')
        const panels = nav.querySelectorAll('.nav-panel')

        menuTl.current.clear()

        const tl = menuTl.current
        const hasBars = Boolean(topLine && botLine)

        if (hasBars) {
            tl.to([topLine, botLine], { stroke: 'currentColor', duration: 0.2 })
                .to(
                    topLine,
                    {
                        attr: { x1: 4, y1: 7, x2: 18, y2: 7 },
                        duration: 0.2,
                        ease: 'power3.in',
                    },
                    '<'
                )
                .to(
                    botLine,
                    {
                        attr: { x1: 4, y1: 13, x2: 18, y2: 13 },
                        duration: 0.2,
                        ease: 'power3.in',
                    },
                    '<'
                )
        }

        const panelTweenPos = hasBars ? '<' : undefined
        tl.to(
            panels,
            {
                y: '160vh',
                rotation: () => gsap.utils.random(-15, 15),
                duration: 1,
                ease: 'power3.in',
                stagger: { each: 0.02, from: 'end' },
            },
            panelTweenPos
        )

        if (bg) {
            tl.to(bg, { opacity: 0, duration: 0.35, ease: 'power2.in' }, '<0.1')
        }

        tl.set(nav, { visibility: 'hidden', pointerEvents: 'none' })
            .set(panels, { y: 0, rotation: 0, xPercent: 101 })
            .set(nav.querySelectorAll('.nav-item'), { opacity: 0, x: -20 })
            .set(nav.querySelector('.nav-login'), { opacity: 0, y: 8 })
            .call(() => {
                setMenuOpen(false)
            })
    }, [])

    const toggleMobileMenu = useCallback(
        (forced) => {
            const next = typeof forced === 'boolean' ? forced : !menuOpen
            if (next === menuOpen) return

            menuTl.current.clear()

            if (next) {
                setMenuOpen(true)
                requestAnimationFrame(() => openMobileMenu())
            } else {
                closeMobileMenu()
            }

            const btn = menuBtnRef.current
            if (btn) {
                btn.setAttribute('aria-expanded', String(next))
                btn.setAttribute('aria-label', next ? 'Close menu' : 'Open menu')
            }

            const root = overlayRef.current
            if (root) {
                root.querySelectorAll('a, button').forEach((el) => {
                    if (el.closest('.nav-bg')) return
                    el.setAttribute('tabindex', next ? '0' : '-1')
                })
            }
        },
        [menuOpen, openMobileMenu, closeMobileMenu]
    )

    toggleMenuRef.current = toggleMobileMenu

    useLayoutEffect(() => {
        const nav = overlayRef.current
        if (!nav) return

        gsap.set(nav, { visibility: 'hidden', pointerEvents: 'none' })
        const bg = nav.querySelector('.nav-bg')
        if (bg) gsap.set(bg, { opacity: 0 })
        gsap.set(nav.querySelectorAll('.nav-panel'), { xPercent: 101, y: 0, rotation: 0 })
        gsap.set(nav.querySelectorAll('.nav-item'), { opacity: 0, x: -20 })
        const login = nav.querySelector('.nav-login')
        if (login) gsap.set(login, { opacity: 0, y: 8 })
    }, [])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && menuOpen) {
                toggleMobileMenu(false)
                menuBtnRef.current?.focus()
            }
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [menuOpen, toggleMobileMenu])

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-[100] flex justify-center pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(1rem,env(safe-area-inset-top))] md:px-6 md:pt-5 pointer-events-auto"
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
                <nav
                    className={[
                        'pointer-events-auto flex w-full max-w-[1200px] items-center justify-between gap-4 rounded-2xl border px-4 py-3 md:gap-8 md:px-6 md:py-3.5',
                        'transition-[background-color,border-color,box-shadow] duration-300 ease-out',
                        scrolled || menuOpen
                            ? 'border-white/[0.1] bg-surface/85 shadow-hub backdrop-blur-xl md:backdrop-blur-2xl'
                            : 'border-white/[0.1] bg-surface/[0.92] shadow-hub backdrop-blur-xl max-md:shadow-[0_4px_24px_rgba(0,0,0,0.45)] md:border-white/[0.06] md:bg-bg-primary/25 md:shadow-none md:backdrop-blur-md md:bg-bg-primary/20',
                    ].join(' ')}
                >
                    <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-6">
                        <Link
                            to="/"
                            onClick={handlePrimaryHomeClick}
                            className="group flex shrink-0 items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-lg"
                        >
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/25 bg-primary/[0.08] text-xs font-display text-primary transition-colors group-hover:border-primary/45 group-hover:bg-primary/[0.12]">
                                AS
                            </span>
                            <span className="min-w-0">
                                <span className="block truncate font-display text-xs tracking-wider text-text-primary transition-colors group-hover:text-primary sm:text-sm md:text-base">
                                    STATO
                                </span>
                                <span className="hidden truncate text-[10px] font-sans uppercase tracking-[0.2em] text-text-muted sm:block">
                                    Full Stack
                                </span>
                            </span>
                        </Link>

                        <span className="hidden h-8 w-px shrink-0 bg-white/10 md:block" aria-hidden />
                    </div>

                    <ul className="hidden list-none items-center gap-1 md:flex">
                        {PRIMARY_NAV_LINKS.map((link) => {
                            const active = linkIsActive(link)
                            const base = NAV_LINK_CLASSES
                            const inactive =
                                'text-zinc-400 hover:text-text-primary hover:bg-white/[0.04]'
                            const activeCls = 'text-primary bg-primary/[0.1] ring-1 ring-primary/25'

                            return (
                                <li key={link.name}>
                                    {link.path === '/' ? (
                                        <Link
                                            to="/"
                                            onClick={handlePrimaryHomeClick}
                                            className={`${base} ${active ? activeCls : inactive}`}
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <Link
                                            to={{
                                                pathname: '/',
                                                hash: link.hash.slice(1),
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleLinkClick()
                                                goToPrimarySection(link.hash)
                                            }}
                                            className={`${base} ${active ? activeCls : inactive}`}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </li>
                            )
                        })}
                    </ul>

                    <div className="flex shrink-0 items-center gap-3">
                        <Link
                            to="/resume"
                            onClick={handleLinkClick}
                            className={`hidden rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors lg:inline-flex ${
                                location.pathname === '/resume'
                                    ? 'text-primary ring-1 ring-primary/30 bg-primary/[0.08]'
                                    : 'text-zinc-500 hover:bg-white/[0.05] hover:text-text-primary'
                            }`}
                        >
                            Résumé
                        </Link>
                        <button
                            ref={menuBtnRef}
                            id="portfolio-menu-toggle"
                            type="button"
                            onClick={() => toggleMobileMenu()}
                            className="relative flex h-11 min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-lg border border-white/10 text-text-primary transition-colors hover:border-primary/35 hover:bg-primary/[0.06] hover:text-primary md:hidden"
                            aria-expanded={menuOpen}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-controls="portfolio-mobile-nav"
                        >
                            <span className="sr-only">Menu</span>
                            <svg
                                className="bar block h-5 w-5 text-text-primary"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <line
                                    ref={barTopRef}
                                    className="bar-top"
                                    x1="4"
                                    y1="7"
                                    x2="18"
                                    y2="7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <line
                                    ref={barBotRef}
                                    className="bar-bot"
                                    x1="4"
                                    y1="13"
                                    x2="18"
                                    y2="13"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* GSAP timeline targets `.nav-*` nodes inside NavbarMobileMenu (hidden md+). */}
            <NavbarMobileMenu
                overlayRef={overlayRef}
                menuOpen={menuOpen}
                onBackdropClose={() => toggleMobileMenu(false)}
                linkPanels={PRIMARY_NAV_LINKS.map((link, index) => {
                    const active = linkIsActive(link)
                    const idle = 'nav-link text-bg-primary hover:opacity-80'
                    const activeRow = `${idle} opacity-90`
                    const isLast = index === PRIMARY_NAV_LINKS.length - 1
                    return (
                        <section
                            key={link.name}
                            className="nav-panel nav-top nav-border relative w-full shrink-0 overflow-hidden rounded-[10px] border-2 border-white/80 bg-[#fffce1] text-bg-primary shadow-none"
                        >
                            <ul className="nav-list list-none px-4 py-2 sm:px-5 sm:py-3">
                                <li className="nav-item overflow-hidden">
                                    {link.path === '/' ? (
                                        <Link
                                            to="/"
                                            tabIndex={-1}
                                            onClick={handlePrimaryHomeClick}
                                            className={`block py-3 text-lg font-semibold uppercase tracking-tight sm:py-3.5 sm:text-xl ${active ? activeRow : idle}`}
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <Link
                                            to={{
                                                pathname: '/',
                                                hash: link.hash.slice(1),
                                            }}
                                            tabIndex={-1}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleLinkClick()
                                                goToPrimarySection(link.hash)
                                            }}
                                            className={`block py-3 text-lg font-semibold uppercase tracking-tight sm:py-3.5 sm:text-xl ${active ? activeRow : idle}`}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </li>
                            </ul>
                            {isLast && (
                                <p className="nav-login border-t border-bg-primary/[0.12] px-4 pb-3 pt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-bg-primary/50 sm:px-5 sm:text-[11px]">
                                    Full Stack Developer · Portfolio
                                </p>
                            )}
                        </section>
                    )
                })}
                middleExtras={
                    <>
                        <Link
                            to="/resume"
                            tabIndex={-1}
                            onClick={() => toggleMenuRef.current?.(false)}
                            className={`inline-flex items-center rounded-full border border-black/35 bg-black/15 px-4 py-2 font-mono text-[11px] font-medium ${
                                location.pathname === '/resume' ? 'ring-2 ring-black/35' : ''
                            }`}
                        >
                            Résumé
                        </Link>
                        <button
                            type="button"
                            tabIndex={-1}
                            className="rounded-full border border-black/25 bg-black/10 px-4 py-2 font-mono text-[11px]"
                            onClick={() => {
                                handleLinkClick()
                                goToPrimarySection('#portfolio')
                            }}
                        >
                            View projects
                        </button>
                    </>
                }
                bottomExtras={
                    <li>
                        <a
                            href="https://github.com/stato10"
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={-1}
                            className="hover:text-primary"
                            onClick={() => toggleMenuRef.current?.(false)}
                        >
                            github.com/stato10
                        </a>
                    </li>
                }
            />
        </>
    )
}

export default Navbar
