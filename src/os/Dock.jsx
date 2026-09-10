import { apps } from '../data/apps'
import { useOSStore } from '../store/useOSStore'
import AppIcon from './AppIcon'

const dockApps = apps.filter((app) => ['projects', 'music', 'terminal', 'ai-lab', 'systems', 'resume', 'about', 'contact', 'github'].includes(app.id))

export default function Dock() {
  const { windows, activeWindowId, focusWindow, minimizeWindow, openApp } = useOSStore()
  const entries = [
    ...dockApps.map((app) => ({ app, windowItem: windows.find((item) => item.appId === app.id) })),
    ...windows.filter((item) => !dockApps.some((app) => app.id === item.appId)).map((windowItem) => ({
      windowItem,
      app: apps.find((app) => app.id === windowItem.appId) || { id: windowItem.id, title: windowItem.title, shortLabel: windowItem.title, icon: 'layers', accent: windowItem.accent },
    })),
  ]

  const activate = (app, windowItem, active) => {
    if (!windowItem) {
      openApp(app.id)
      return
    }
    if (active) {
      minimizeWindow(windowItem.id)
      return
    }
    focusWindow(windowItem.id)
  }

  return (
    <nav className="dock" aria-label="Application dock">
      {entries.map(({ app, windowItem }) => {
        const active = windowItem?.id === activeWindowId && !windowItem.minimized
        return (
          <button
            type="button"
            key={app.id}
            data-dock-window={windowItem?.id || app.id}
            className={`dock-item${active ? ' is-active' : ''}`}
            onClick={() => activate(app, windowItem, active)}
            aria-label={active ? `Minimize ${app.title}` : windowItem ? `Restore ${app.title}` : `Open ${app.title}`}
            title={app.title}
          >
            <span className="dock-tooltip">{app.shortLabel}</span>
            <span className="dock-icon" style={{ '--app-accent': app.accent }}><AppIcon app={app} size={25} /></span>
            {windowItem && <i className="dock-running" aria-hidden="true" />}
          </button>
        )
      })}
    </nav>
  )
}
