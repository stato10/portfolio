import { Suspense, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useOSStore } from '../store/useOSStore'
import AppWindow from './AppWindow'
import { resolveAppComponent } from './appRegistry'
import { responsiveWindowBounds } from './windowGeometry'

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
        setWindowBounds(windowItem.id, responsiveWindowBounds(windowItem,
          { width: window.innerWidth, height: window.innerHeight }, windowItem.bounds))
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
