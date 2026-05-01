/**
 * Main site navigation: Home + in-page sections on `/` (Work/About/Contact).
 * Section ids must exist on `Home.jsx` (Projects, AboutSection, ContactSection).
 */
export const PRIMARY_NAV_LINKS = [
    { name: 'Home', path: '/', section: 'home' },
    { name: 'Work', hash: '#portfolio', section: 'portfolio' },
    { name: 'About', hash: '#about', section: 'about' },
    { name: 'Contact', hash: '#contact', section: 'contact' },
]
