import { useEffect, useRef } from 'react'

export default function useMiniPlayerDrag(windowRef, enabled, mobile) {
  const position = useRef(null)
  const gesture = useRef(null)
  const place = useRef(null)

  useEffect(() => {
    if (!enabled) return undefined
    const node = windowRef.current
    const container = node.closest(mobile ? '.window-layer' : '.os-desktop')
    const move = (x, y) => {
      const area = container.getBoundingClientRect()
      const width = node.offsetWidth
      const height = node.offsetHeight
      const minY = mobile ? 8 : 40
      const next = {
        x: Math.max(8, Math.min(x, area.width - width - 8)),
        y: Math.max(minY, Math.min(y, area.height - height - (mobile ? 12 : 96))),
      }
      position.current = next
      node.style.setProperty('--mini-x', `${next.x}px`)
      node.style.setProperty('--mini-y', `${next.y}px`)
      node.dataset.miniPositioned = 'true'
    }
    place.current = move
    const constrain = () => {
      const rect = node.getBoundingClientRect()
      const area = container.getBoundingClientRect()
      const current = position.current || { x: rect.left - area.left, y: rect.top - area.top }
      move(current.x, current.y)
    }
    constrain()
    const observer = new ResizeObserver(constrain)
    observer.observe(node)
    observer.observe(container)
    window.addEventListener('resize', constrain)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', constrain)
      gesture.current = null
      place.current = null
    }
  }, [enabled, mobile, windowRef])

  return {
    onPointerDown(event) {
      const handle = event.target.closest('[data-mini-drag]')
      if (!enabled || !handle || event.button !== 0 || !event.isPrimary) return
      handle.setPointerCapture(event.pointerId)
      gesture.current = { id: event.pointerId, ...position.current, pointerX: event.clientX, pointerY: event.clientY }
      handle.dataset.dragging = 'true'
    },
    onPointerMove(event) {
      const start = gesture.current
      if (!start || start.id !== event.pointerId) return
      place.current?.(start.x + event.clientX - start.pointerX, start.y + event.clientY - start.pointerY)
    },
    onPointerUp(event) {
      if (gesture.current?.id !== event.pointerId) return
      gesture.current = null
      const handle = event.target.closest('[data-mini-drag]')
      if (handle) {
        delete handle.dataset.dragging
        if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId)
      }
    },
    onKeyDown(event) {
      if (!enabled || !event.target.closest('[data-mini-drag]')) return
      const step = event.shiftKey ? 40 : 12
      const delta = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key]
      if (!delta) return
      event.preventDefault()
      event.stopPropagation()
      place.current?.(position.current.x + delta[0], position.current.y + delta[1])
    },
  }
}
