# BLAZE LACE - TEASER WEBSITE

A cinematic, gothic-cosmic K-pop teaser website for the debut girl group Blaze Lace.

---

## Installation

1. Extract the ZIP file to any location on your computer

2. Open `index.html` in any modern web browser:
   - Chrome (recommended)
   - Firefox
   - Safari
   - Edge

No server or build tools required. Everything runs locally.

---

## Features

- ✓ Live countdown timer to March 1, 2026
- ✓ Animated nebula background with drift effect
- ✓ Layered smoke and ember particle systems
- ✓ Interactive audio player with visual equalizer
- ✓ Email capture form (client-side only)
- ✓ 4 member reveal cards with unique color themes
- ✓ Gothic lace frame overlay
- ✓ Fully responsive design
- ✓ Reduced motion support for accessibility
- ✓ Social media links (Instagram, TikTok, Discord)

---

## File Structure

```text
blaze-lace-site/
├── index.html          Main HTML file
├── styles.css          All styles and animations
├── script.js           JavaScript functionality
├── README.md           This file
└── assets/
    ├── nebula.png      Background nebula image
    ├── smoke.png       Atmospheric smoke overlay
    ├── lace-frame.png  Gothic border frame
    ├── logo.png        Blaze Lace logo
    ├── ara.png         Member 01 - Ara (Red)
    ├── yuri.png        Member 02 - Yuri (Silver)
    ├── minji.png       Member 03 - Minji (Blue)
    ├── hana.png        Member 04 - Hana (Purple)
    └── audio-teaser.wav Audio teaser file
```

---

## Customization

### Countdown Date

Edit line 3 in `script.js`:

```javascript
const targetDate = new Date('2026-03-01T00:00:00').getTime();
```

### Member Lock Percentages

Edit the inline styles in `index.html` for each member card:

```html
<div class="lock-progress" style="width: 73%"></div>
```

### Colors

Edit CSS custom properties in `styles.css` under each member card `data-color` attribute.

---

## Browser Compatibility

**Tested and optimized for:**

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Mobile tested on:**

- iOS Safari
- Chrome Mobile
- Samsung Internet

---

## Performance Notes

- Particle count automatically reduced on mobile devices
- Animations respect `prefers-reduced-motion` settings
- All assets are optimized for web delivery
- No external dependencies or CDN calls (except Google Fonts)

---

## Credits

**Fonts:**

- Orbitron (countdown timer)
- Cinzel (body text)

**Built with:**

- Pure HTML5
- CSS3 with animations
- Vanilla JavaScript (ES6+)

---

© 2026 BLAZE LACE. All rights reserved.

*We ain't stars, we the whole damn sky.*
