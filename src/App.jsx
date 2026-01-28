import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Resume from './pages/Resume'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Post1 from './pages/blog/Post1'
import Post2 from './pages/blog/Post2'
import SmoothScroll from './components/SmoothScroll'
import Preloader from './components/Preloader'

// Component to handle 404.html redirects
function RedirectHandler() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if we have a redirect query parameter (from 404.html)
    // The 404.html creates URLs like ?/path, which URLSearchParams treats as
    // an empty parameter name with value 'path'
    const search = location.search

    // Check if query string starts with ?/ (the format from 404.html)
    if (search.startsWith('?/')) {
      // Extract the path from ?/path (remove the ?/ prefix)
      let redirectPath = search.slice(2) // Remove '?/'

      // Handle query parameters and hash if present
      // Format: ?/path?query#hash or ?/path#hash
      const queryIndex = redirectPath.indexOf('?')
      const hashIndex = redirectPath.indexOf('#')

      if (queryIndex !== -1) {
        // If there's a query string, extract only the path part
        redirectPath = redirectPath.slice(0, queryIndex)
      } else if (hashIndex !== -1) {
        // If there's a hash, extract only the path part
        redirectPath = redirectPath.slice(0, hashIndex)
      }

      if (redirectPath) {
        // Decode the path (replace ~and~ with &) and navigate
        const decodedPath = redirectPath.replace(/~and~/g, '&')
        // Ensure path starts with /
        const finalPath = decodedPath.startsWith('/') ? decodedPath : '/' + decodedPath
        navigate(finalPath, { replace: true })
      }
    }
  }, [location, navigate])

  return null
}

function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <SmoothScroll>
        <Preloader />
        <RedirectHandler />
        <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary selection:bg-primary selection:text-bg-primary">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/post1" element={<Post1 />} />
              <Route path="/blog/post2" element={<Post2 />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default App



