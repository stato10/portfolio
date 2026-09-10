import { useEffect, useState } from 'react'
import { ChevronDown, ExternalLink, ListMusic, Maximize2, Music2, RefreshCw, X } from 'lucide-react'
import { useWindowVisible } from '../../os/WindowVisibility'
import { useOSStore } from '../../store/useOSStore'
import './music.css'

const playlistUrl = 'https://open.spotify.com/playlist/4NkNJ6YpE7DaDlWvlvUGIS'
const embedUrl = 'https://open.spotify.com/embed/playlist/4NkNJ6YpE7DaDlWvlvUGIS'

// Extend STATO's light macOS library: one verified playlist, real Spotify controls.
// Keep the iframe mounted on minimize; explicitly closing Music ends the session.
export default function MusicApp() {
  const [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState('loading')
  const [showTracks, setShowTracks] = useState(false)
  const visible = useWindowVisible()
  const { focusWindow, closeWindow } = useOSStore()

  useEffect(() => {
    if (status !== 'loading') return undefined
    const timer = window.setTimeout(() => setStatus('slow'), 12000)
    return () => window.clearTimeout(timer)
  }, [status, attempt])

  const reload = () => {
    setStatus('loading')
    setAttempt(value => value + 1)
  }

  return (
    <div className={`music-app${!visible ? ' is-mini' : ''}${showTracks ? ' show-tracks' : ''}`}>
      <aside className="music-library" aria-label="Music library">
        <div className="music-library-title"><Music2 aria-hidden="true" /><strong>Music</strong></div>
        <span className="music-library-label">YOUR COLLECTION</span>
        <div className="music-library-selection" aria-current="true"><Music2 size={18} aria-hidden="true" /><span>Stato<small>Spotify playlist</small></span></div>
        <div className="music-library-note"><span>Made for your desktop</span><p>A little soundtrack for the work, ideas and everything in between.</p></div>
      </aside>
      <section className="music-workspace" aria-labelledby="music-heading">
        <header className="music-heading">
          <div><h1 id="music-heading">Stato</h1><p>Good music. A little room to explore.</p></div>
          <a href={playlistUrl} target="_blank" rel="noopener noreferrer" aria-label="Open Stato playlist in Spotify">Open Spotify <ExternalLink size={15} aria-hidden="true" /></a>
        </header>
        <div className="music-mini-toolbar">
          <button type="button" className="music-mini-handle" data-mini-drag aria-label="Move Music mini player" title="Drag to move · arrow keys to reposition"><Music2 size={17} aria-hidden="true" /><span>Music<small>Drag to move</small></span></button>
          <button type="button" onClick={() => focusWindow('music')} aria-label="Restore Music window"><Maximize2 size={14} aria-hidden="true" /></button>
          <button type="button" aria-label={showTracks ? 'Collapse song list' : 'Browse songs'} aria-expanded={showTracks} aria-controls="music-player" onClick={() => setShowTracks(value => !value)}>{showTracks ? <ChevronDown size={18} aria-hidden="true" /> : <ListMusic size={18} aria-hidden="true" />}</button>
          <button type="button" onClick={() => closeWindow('music')} aria-label="Close Music mini player"><X size={17} aria-hidden="true" /></button>
        </div>
        <div id="music-player" className="music-embed" aria-label="Spotify playlist player">
          <iframe
            key={attempt}
            src={embedUrl}
            title="Spotify Embed: Stato"
            width="100%"
            height={!visible && !showTracks ? '80' : '352'}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
          />
        </div>
        <footer className="music-help">
          <div>
            <p role="status">{status === 'loading' ? 'Loading Spotify…' : status === 'slow' || status === 'error' ? 'Player not loading? Retry or open the playlist in Spotify.' : 'Press Play in the Spotify player to listen.'}</p>
            <small>Minimize for the floating player. Browse songs without leaving your desktop. Spotify previews or sign-in may apply.</small>
          </div>
          <button type="button" onClick={reload} aria-label="Reload Spotify player"><RefreshCw size={16} aria-hidden="true" /><span>Reload player</span></button>
        </footer>
      </section>
    </div>
  )
}
