# Crafting Web Designs (CWD) — Website Revamp

A high-converting, modern digital agency website engineered for velocity, trust, and client acquisition. Built with clean, accessible HTML5, advanced modern CSS3, interactive WebGL liquid physics, and an interactive 3D SVG globe.

---

## ⚡ Key Highlights & Architecture

- **High-Velocity Hero Section**:
  - Full-bleed WebGL liquid refraction background canvas.
  - Dual-row continuous infinite portfolio marquee featuring alternating desktop ($16:10$) and mobile ($9:14$) client mockups.
  - Zero-vignette unmasked card display peeking above the fold.
- **Client Trust & Proof**:
  - "Trusted by 50+ Local Business Owners & Founders" monochrome client logo marquee.
  - High-impact stacked case studies ("Proven Client Outcomes") with responsive stacking on desktop and clean vertical flow on mobile.
  - 5-Star Verified Google Reviews dual marquee featuring authentic circular founder photo avatars.
- **The CWD Advantage Showcase**:
  - Desktop: Pinned 2-column sticky interactive showcase displaying live client prototypes, 48h sprint timelines, client Slack threads, 3D holographic payment cards, and 99.99% uptime shields.
  - Mobile: Clean inline vertical stack pairing each value proposition directly with its visual preview.
- **Global Presence**:
  - Interactive Canvas/SVG Globe highlighting client hubs in London, New York, Sydney, and Singapore.
- **Production-Ready & Lightweight**:
  - Fully relative asset paths (`./assets/...`) compatible with Hostinger, GitHub Pages, Netlify, and custom domains.
  - Zero heavy framework runtime or build steps required — pure, optimized vanilla web stack.

---

## 📁 Directory Structure

```text
├── assets/
│   ├── avatars/        # Authentic founder and reviewer avatars
│   ├── globe/          # World vector map and location marker pins
│   ├── logos/          # Client monochrome brand logos
│   ├── mockups/        # Desktop & mobile high-resolution client project mockups
│   ├── reviews/        # Verified Google review founder photos
│   └── services/       # Capability feature icons and illustrations
├── css/
│   └── styles.css      # Comprehensive design system, animations, responsive breakpoints
├── js/
│   ├── interactive-globe.js  # Interactive SVG/canvas globe visualization
│   ├── main.js               # Navigation, intersection observers, and interaction logic
│   └── webgl-background.js   # Liquid refraction WebGL canvas shader
├── index.html          # Main landing page
└── README.md           # Documentation
```

---

## 🚀 Local Development & Preview

Because this project uses vanilla HTML, CSS, and JS with relative assets, you can run it locally with any simple HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node (npx)
npx serve .

# Or open index.html directly in any modern web browser
```

---

## 🌐 Deployment

Ready for zero-config static hosting on:
- **GitHub Pages**
- **Hostinger**
- **Vercel** / **Netlify**
- **Cloudflare Pages**
