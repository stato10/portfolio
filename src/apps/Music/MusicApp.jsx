import { useEffect, useState } from 'react'
import { ExternalLink, Music2, RefreshCw } from 'lucide-react'
import './music.css'

const playlistUrl = 'https://open.spotify.com/playlist/4NkNJ6YpE7DaDlWvlvUGIS'
const embedUrl = 'https://open.spotify.com/embed/playlist/4NkNJ6YpE7DaDlWvlvUGIS'

// Extend STATO's light macOS library: one verified playlist, real Spotify controls.
// Keep the iframe mounted on minimize; explicitly closing Music ends the session.
export default function MusicApp() {
  const [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState('loading')

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
    <div className="music-app">
      <aside className="music-library" aria-label="Music library">
        <div className="music-library-title"><Music2 aria-hidden="true" /><strong>Music</strong></div>
        <span className="music-library-label">Library</span>
        <div className="music-library-selection" aria-current="true"><Music2 size={18} aria-hidden="true" /><span>Stato<small>Spotify playlist</small></span></div>
        <p>Your playlist stays open while you explore the desktop.</p>
      </aside>
      <section className="music-workspace" aria-labelledby="music-heading">
        <header className="music-heading">
          <div><h1 id="music-heading">Stato</h1><p>Listen here, or continue in Spotify.</p></div>
          <a href={playlistUrl} target="_blank" rel="noopener noreferrer" aria-label="Open Stato playlist in Spotify">Open Spotify <ExternalLink size={15} aria-hidden="true" /></a>
        </header>
        <div className="music-embed" aria-label="Spotify playlist player">
          <iframe
            key={attempt}
            src={embedUrl}
            title="Spotify Embed: Stato"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
          />
        </div>
        <footer className="music-help">
          <div>
            <p role="status">{status === 'loading' ? 'Loading Spotify…' : status === 'slow' || status === 'error' ? 'Player not loading? Retry or open the playlist in Spotify.' : 'Press Play in the Spotify player to listen.'}</p>
            <small>Playback is provided by Spotify; previews or sign-in may apply. Minimize to keep Music open; close the window to stop.</small>
          </div>
          <button type="button" onClick={reload} aria-label="Reload Spotify player"><RefreshCw size={16} aria-hidden="true" /><span>Reload player</span></button>
        </footer>
      </section>
    </div>
  )
}
