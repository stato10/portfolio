import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        })

        lenis.on('scroll', ScrollTrigger.update)

        const tickerCb = (time) => {
            lenis.raf(time * 1000)
        }
        gsap.ticker.add(tickerCb)
        gsap.ticker.lagSmoothing(0)

        ScrollTrigger.refresh()

        return () => {
            gsap.ticker.remove(tickerCb)
            lenis.destroy()
            ScrollTrigger.refresh()
        }
    }, [])

    return <>{children}</>
}
