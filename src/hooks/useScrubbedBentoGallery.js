import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'

/**
 * Scroll-scrubbed bento layout (Flip + ScrollTrigger), aligned with
 * https://codepen.io/GreenSock/pen/vYMzKZx
 *
 * Expects: wrapRef → .gallery-wrap, gridRef → .gallery.gallery--bento,
 * children with .gallery__item (same nodes for Flip.getState).
 */
export function useScrubbedBentoGallery(scopeRef) {
  const wrapRef = useRef(null)
  const gridRef = useRef(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const wrap = wrapRef.current
      const grid = gridRef.current
      if (!wrap || !grid || reduce) return

      let flipCtx = null
      let resizeTid = 0
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const createTween = () => {
          const items = grid.querySelectorAll('.gallery__item')
          if (!items.length) return

          flipCtx?.revert()
          grid.classList.remove('gallery--final')

          flipCtx = gsap.context(() => {
            grid.classList.add('gallery--final')
            const flipState = Flip.getState(items)
            grid.classList.remove('gallery--final')

            const flip = Flip.to(flipState, {
              simple: true,
              ease: 'expoScale(1, 5)',
            })

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: grid,
                start: 'center center',
                end: '+=100%',
                scrub: true,
                pin: wrap,
              },
            })
            tl.add(flip)

            return () => gsap.set(items, { clearProps: 'all' })
          }, grid)
        }

        createTween()

        const onResize = () => {
          clearTimeout(resizeTid)
          resizeTid = window.setTimeout(() => {
            createTween()
            ScrollTrigger.refresh()
          }, 120)
        }

        window.addEventListener('resize', onResize)

        return () => {
          clearTimeout(resizeTid)
          window.removeEventListener('resize', onResize)
          flipCtx?.revert()
        }
      })

      return () => mm.revert()
    },
    { scope: scopeRef }
  )

  return { wrapRef, gridRef }
}
