# Modern React Portfolio

A professional, responsive portfolio website built with React, Vite, and Tailwind CSS. This project showcases modern React development practices with the latest libraries and tools.

## 🚀 Features

- **Modern React 18** - Latest React features and hooks
- **Vite** - Lightning-fast build tool and dev server
- **React Router v6** - Client-side routing with modern API
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Fully Responsive** - Mobile-first design that works on all devices
- **Component-Based Architecture** - Clean, maintainable code structure
- **Modern ES6+** - Latest JavaScript features

## 📁 Project Structure

```
ejosue_react/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── Projects.jsx
│   │   └── CTA.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Resume.jsx
│   │   ├── Contact.jsx
│   │   ├── Blog.jsx
│   │   └── blog/
│   │       ├── Post1.jsx
│   │       └── Post2.jsx
│   ├── assets/         # Images and static files
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles with Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up EmailJS (for contact form):**
   - See `EMAILJS_SETUP.md` for detailed instructions
   - Get your Service ID, Template ID, and Public Key from [EmailJS](https://www.emailjs.com/)
   - Update `src/components/ContactSection.jsx` and `src/pages/Contact.jsx` with your credentials

3. **Add your resume PDF:**
   - Place your resume PDF file in `public/resume.pdf`
   - See `public/RESUME_README.md` for details

4. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:3000`

5. **Build for production:**
   ```bash
   npm run build
   ```
   The optimized build will be in the `dist/` folder.

6. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🌐 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages.

### Setup Instructions:

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **Push to main branch:**
   - The GitHub Actions workflow will automatically build and deploy your site
   - After pushing to `main`, go to **Actions** tab to see the deployment progress
   - Once complete, your site will be available at:
     `https://[your-username].github.io/portfolio/`

3. **Custom Domain (Optional):**
   - If you have a custom domain, add a `CNAME` file in the `public/` folder
   - Configure your domain's DNS settings as per GitHub Pages documentation

### Important Notes:
- The site is configured with base path `/portfolio/` in `vite.config.js`
- If you change the repository name, update the `base` path in `vite.config.js` and `basename` in `src/App.jsx`
- The deployment workflow runs automatically on every push to `main` branch

## 🎨 Customization

### Content
- Edit component files in `src/components/` and `src/pages/` to update content
- Replace images in `src/assets/` with your own
- Update personal information in About, Resume, and Contact pages

### Styling
- Tailwind configuration is in `tailwind.config.js`
- Custom colors are defined in the theme section
- Global styles are in `src/index.css`
- Component-specific styles use Tailwind utility classes

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add a route in `src/App.jsx`
3. Add a navigation link in `src/components/Navbar.jsx`

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

All components use Tailwind's responsive utilities for optimal viewing on all devices.

## 🧪 Technologies Used

- **React 18.2.0** - UI library
- **React Router DOM 6.20.1** - Routing
- **Vite 5.0.8** - Build tool
- **Tailwind CSS 3.3.6** - Styling
- **PostCSS & Autoprefixer** - CSS processing

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!
