# Video Setup Instructions

## Adding Your Hero Video

1. **Place your 4K video file** in this directory (`public/videos/`)
   - Recommended format: MP4
   - Recommended name: `hero-video.mp4`

2. **Naming**: default filename is **`hero-video.mp4`**. Paths are resolved with Vite **`base`** (e.g. `/portfolio/videos/hero-video.mp4`).

3. **Optional `.env`** (project root):

   ```
   # Relative path under `public/` (no leading slash), or HTTPS URL:
   VITE_HERO_VIDEO=videos/hero-video.mp4
   # VITE_HERO_VIDEO=https://cdn.example.com/my-loop.mp4
   ```

4. **Alternative: CDN**
   - Set `VITE_HERO_VIDEO=https://your-cdn.com/video.mp4` so the `<video>` `src` is that URL (works after rebuild / dev server restart).


## Updating the hero in code


The hero reads `VITE_HERO_VIDEO`, else defaults to `videos/hero-video.mp4`. To change filename without env, edit `DEFAULT_PUBLIC_VIDEO_REL` in `src/components/Hero.jsx`.

## Video Requirements

- **Format**: MP4 (H.264 codec recommended)
- **Resolution**: 4K (3840x2160 or higher)
- **Aspect Ratio**: 16:9 recommended
- **Audio**: Not needed (video will be muted)
- **Subtitles**: Not needed (disabled in code)

## Video Optimization Tips

- Compress the video for web (use tools like HandBrake or FFmpeg)
- Keep file size reasonable (under 50MB if possible)
- Use a video that loops seamlessly
- Ensure good contrast for text readability (the overlay helps with this)



