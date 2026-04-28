import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Preloader() {
    const root = useRef(null)
    const [visible, setVisible] = useState(true)

    useGSAP(
        () => {
            const el = root.current
            if (!el) return

            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            if (reduce) {
                setVisible(false)
                return
            }

            const lines = el.querySelectorAll('.preloader-line')
            const tl = gsap.timeline({
                onComplete: () => setVisible(false),
            })

            tl.from(lines, {
                yPercent: 100,
                opacity: 0,
                duration: 0.95,
                stagger: 0.14,
                ease: 'power4.out',
            })
                .to(
                    el,
                    {
                        autoAlpha: 0,
                        duration: 0.55,
                        ease: 'power3.inOut',
                    },
                    '+=0.45'
                )
        },
        { scope: root }
    )

    if (!visible) return null

    return (
        <div
            ref={root}
            className="fixed inset-0 z-[200] grid place-items-center bg-bg-primary"
        >
            <div className="overflow-hidden text-center px-6">
                <div className="overflow-hidden">
                    <p className="preloader-line font-display text-2xl md:text-4xl text-primary tracking-widest">
                        THE PAINT
                    </p>
                </div>
                <div className="overflow-hidden mt-2">
                    <p className="preloader-line font-display text-xl md:text-3xl text-text-muted tracking-widest">
                        IS DRYING...
                    </p>
                </div>
            </div>
        </div>
    )
}
