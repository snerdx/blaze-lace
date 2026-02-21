# BLAZE LACE - TEASER WEBSITE

A cinematic, gothic-cosmic K-pop teaser website for the debut girl group Blaze Lace.

---

## Installation

### Local Development

1. Extract the files to your web server directory (e.g., htdocs, www)

2. Copy `config.sample.php` to `config.php` and configure:
   - Set your email addresses for form submissions
   - Enable/disable email logging

3. Ensure PHP 7.4+ is installed and configured

4. Access via local web server:
   - `http://localhost/blaze-lace/`
   - Or configure a virtual host

### Static Preview

You can preview the site without a server by opening `index.html` directly, but email submissions won't work without PHP.

---

## Features

- ✓ Live countdown timer to June 1, 2026
- ✓ Animated nebula background with drift effect
- ✓ Layered smoke and ember particle systems
- ✓ Interactive audio player with visual equalizer
- ✓ Email capture form with PHP backend
- ✓ Duplicate email detection
- ✓ Rate limiting and spam protection
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
├── submit-email.php    Email submission handler
├── config.php          Server configuration (create from config.sample.php)
├── config.sample.php   Sample configuration file
├── email_log.txt       Email submission log (created automatically)
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

Edit line 40 in `script.js`:

```javascript
const targetDate = new Date('2026-06-01T00:00:00').getTime();
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
- PHP 7.4+ (backend)

---

© 2026 BLAZE LACE. All rights reserved.

*We ain't stars, we the whole damn sky.*
