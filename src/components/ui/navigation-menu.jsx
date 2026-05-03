/**
 * Scroll-driven expand/collapse + motion variants (shadcn-style path: components/ui).
 * Ported from animated-nav-framer pattern; used by Navbar on md+ only.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

export const EXPAND_SCROLL_THRESHOLD = 80

export const portfolioNavContainerVariants = {
    expanded: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            damping: 20,
            stiffness: 300,
            staggerChildren: 0.07,
            delayChildren: 0.08,
        },
    },
    collapsed: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            damping: 20,
            stiffness: 300,
            when: 'afterChildren',
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
}

export const portfolioLogoVariants = {
    expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: 'spring', damping: 15 } },
    collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
}

export const portfolioItemVariants = {
    expanded: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', damping: 15 } },
    collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
}

export const portfolioCollapsedIconVariants = {
    expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
    collapsed: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            damping: 15,
            stiffness: 300,
            delay: 0.15,
        },
    },
}

function isDesktopNav() {
    return typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
}

/** Collapse on scroll down (past 150px); expand on scroll up by threshold. Desktop only. */
export function usePortfolioNavScrollExpanded() {
    const [isExpanded, setExpanded] = useState(true)
    const expandedRef = useRef(true)
    expandedRef.current = isExpanded

    const { scrollY } = useScroll()
    const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
    const scrollPositionOnCollapse = useRef(0)

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (!isDesktopNav()) {
            if (!expandedRef.current) setExpanded(true)
            lastScrollY.current = latest
            return
        }

        const previous = lastScrollY.current
        const expandedNow = expandedRef.current

        if (expandedNow && latest > previous && latest > 150) {
            setExpanded(false)
            scrollPositionOnCollapse.current = latest
        } else if (
            !expandedNow &&
            latest < previous &&
            scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD
        ) {
            setExpanded(true)
        }

        lastScrollY.current = latest
    })

    const handleCollapsedChromeClick = useCallback((e) => {
        if (!expandedRef.current) {
            e.preventDefault()
            e.stopPropagation()
            setExpanded(true)
        }
    }, [])

    return { isExpanded, setExpanded, handleCollapsedChromeClick }
}

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia(query).matches : false
    )

    useEffect(() => {
        const mq = window.matchMedia(query)
        const onChange = () => setMatches(mq.matches)
        onChange()
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [query])

    return matches
}
