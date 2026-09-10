const clamp = (value, min, max) => Math.max(min, Math.min(value, Math.max(min, max)))

// Dimensions are CSS pixels: content stays readable instead of scaling with the screen.
export function responsiveWindowBounds(app, viewport, previous = null, offset = 0) {
  const id = app.appId || app.id
  const compact = id === 'welcome' || id === 'terminal'
  const availableWidth = Math.max(1, viewport.width - 24)
  const availableHeight = Math.max(1, viewport.height - 144)
  const width = Math.round(Math.min(availableWidth, compact ? 1080 : 1280,
    Math.max(app.defaultSize?.width || (compact ? 800 : 960), viewport.width * (compact ? 0.7 : 0.78))))
  const height = Math.round(Math.min(availableHeight, 900,
    Math.max(app.defaultSize?.height || 620, availableHeight * 0.92)))
  return {
    width, height,
    x: clamp(previous?.x ?? (viewport.width - width) / 2 + offset, 12, viewport.width - width - 12),
    y: clamp(previous?.y ?? 44 + (availableHeight - height) / 2 + offset, 44, viewport.height - height - 100),
  }
}
