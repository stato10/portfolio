import { Suspense, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useOSStore } from '../store/useOSStore'
import AppWindow from './AppWindow'
import { resolveAppComponent } from './appRegistry'

function AppContent({ windowItem }) {
  const Component = resolveAppComponent(windowItem.appId)
  return (
    <Suspense fallback={<div className="app-loading"><i /><span>Loading {windowItem.title}</span></div>}>
      <Component appId={windowItem.appId} windowItem={windowItem} />
    </Suspense>
  )
}

export default function WindowManager({ activeOnly = false, suspended = false }) {
  const { windows, setWindowBounds, activeWindowId, closeWindow, spotlightOpen, closeSpotlight, taskViewOpen, closeTaskView, launch } = useOSStore()
  const windowsRef = useRef(windows)

  useEffect(() => {
    windowsRef.current = windows
  }, [windows])

  useEffect(() => {
    const keepWindowsInBounds = () => {
      windowsRef.current.forEach((windowItem) => {
        if (windowItem.maximized) return
        const width = Math.min(windowItem.bounds.width, window.innerWidth - 24)
        const height = Math.min(windowItem.bounds.height, window.innerHeight - 132)
        setWindowBounds(windowItem.id, {
          width,
          height,
          x: Math.min(Math.max(12, windowItem.bounds.x), window.innerWidth - width - 12),
          y: Math.min(Math.max(44, windowItem.bounds.y), window.innerHeight - 96),
        })
      })
    }
    window.addEventListener('resize', keepWindowsInBounds)
    return () => window.removeEventListener('resize', keepWindowsInBounds)
  }, [setWindowBounds])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== 'Escape') return
      if (suspended) return
      if (spotlightOpen) {
        closeSpotlight()
        return
      }
      if (taskViewOpen) {
        closeTaskView()
        return
      }
      if (!launch && activeWindowId && !event.target.closest?.('input, textarea')) closeWindow(activeWindowId)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [activeWindowId, closeSpotlight, closeWindow, launch, spotlightOpen, taskViewOpen, closeTaskView, suspended])

  return (
    <div className="window-layer">
      <AnimatePresence>
        {windows.map((windowItem) => (
          <AppWindow key={windowItem.id} windowItem={windowItem} mobile={activeOnly} hidden={suspended || windowItem.minimized || (activeOnly && windowItem.id !== activeWindowId)}>
            <AppContent windowItem={windowItem} />
          </AppWindow>
        ))}
      </AnimatePresence>
    </div>
  )
}
