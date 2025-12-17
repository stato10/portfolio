# Video Setup Instructions

## Adding Your Hero Video

1. **Place your 4K video file** in this directory (`public/videos/`)
   - Recommended format: MP4
   - Recommended name: `hero-video.mp4`

2. **Update the video path** in `src/components/Hero.jsx`:
   - The default path is already set to `/videos/hero-video.mp4`
   - If you use a different filename, update line 3 in Hero.jsx

3. **Alternative: Use external URL**
   - If your video is hosted elsewhere (Cloudinary, etc.), update the path in Hero.jsx to the full URL
   - Example: `const heroVideo = 'https://your-cdn.com/video.mp4'`

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



