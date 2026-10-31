const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, '..', 'assets', 'globe');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 1. London Hub Visual
const svgLondon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="lonBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E1E28"/>
      <stop offset="50%" stop-color="#121218"/>
      <stop offset="100%" stop-color="#09090C"/>
    </linearGradient>
    <linearGradient id="goldSky" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="rgba(198, 242, 77, 0.25)"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#lonBg)"/>
  <rect y="120" width="400" height="180" fill="url(#goldSky)"/>
  <!-- London Skyline Silhouette -->
  <path d="M0 300 L0 260 L40 260 L40 240 L50 240 L50 200 L60 160 L65 160 L65 240 L100 240 L100 270 L140 270 L140 220 L160 190 L180 220 L180 270 L220 270 L240 180 L250 140 L260 180 L280 270 L320 270 L340 210 L360 210 L380 250 L400 250 L400 300 Z" fill="#2D2D3A"/>
  <!-- Clock Tower Big Ben Feature -->
  <g transform="translate(60, 110)">
    <rect x="-10" y="50" width="20" height="140" fill="#3A3A4C"/>
    <polygon points="-10,50 0,10 10,50" fill="#C6F24D" opacity="0.8"/>
    <circle cx="0" cy="70" r="6" fill="#FFFFFF"/>
    <circle cx="0" cy="70" r="2" fill="#09090C"/>
  </g>
  <!-- London Eye Wheel -->
  <circle cx="160" cy="200" r="45" stroke="rgba(198, 242, 77, 0.4)" stroke-width="2" fill="none"/>
  <circle cx="160" cy="200" r="3" fill="#C6F24D"/>
  <!-- Modern Shard Tower -->
  <polygon points="250,110 238,280 262,280" fill="#3F3F54"/>
  <!-- Glowing River Thames Refraction -->
  <path d="M0 270 Q100 280 200 270 T400 280 L400 300 L0 300 Z" fill="rgba(198, 242, 77, 0.15)"/>
</svg>`;

// 2. NYC / Founder Sprint Visual
const svgNYC = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="nycBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181822"/>
      <stop offset="60%" stop-color="#0F0F16"/>
      <stop offset="100%" stop-color="#09090C"/>
    </linearGradient>
    <linearGradient id="violetGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(124, 58, 237, 0.35)"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#nycBg)"/>
  <circle cx="200" cy="150" r="120" fill="url(#violetGlow)"/>
  <!-- Collaborative Founder Laptop Studio Scene -->
  <g transform="translate(110, 60)">
    <rect x="0" y="0" width="180" height="110" rx="8" fill="#1E1E28" stroke="rgba(255,255,255,0.1)"/>
    <rect x="8" y="8" width="164" height="94" rx="4" fill="#0A0A0E"/>
    <!-- Wireframe / Dashboard layout on screen -->
    <rect x="18" y="18" width="60" height="12" rx="3" fill="#C6F24D"/>
    <rect x="18" y="36" width="144" height="6" rx="2" fill="rgba(255,255,255,0.3)"/>
    <rect x="18" y="48" width="110" height="6" rx="2" fill="rgba(255,255,255,0.3)"/>
    <rect x="18" y="62" width="40" height="28" rx="4" fill="rgba(124, 58, 237, 0.4)"/>
    <rect x="66" y="62" width="40" height="28" rx="4" fill="rgba(198, 242, 77, 0.4)"/>
    <rect x="114" y="62" width="48" height="28" rx="4" fill="rgba(59, 130, 246, 0.4)"/>
    <!-- Base of Laptop -->
    <polygon points="-15,110 195,110 180,122 0,122" fill="#2E2E3E"/>
  </g>
  <!-- Office Table Surface -->
  <line x1="30" y1="182" x2="370" y2="182" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
  <!-- Floating Tag: New York Launch -->
  <g transform="translate(130, 215)">
    <rect x="0" y="0" width="140" height="32" rx="16" fill="rgba(198, 242, 77, 0.12)" stroke="#C6F24D" stroke-width="1"/>
    <text x="70" y="20" font-family="-apple-system, sans-serif" font-size="11" font-weight="bold" fill="#C6F24D" text-anchor="middle">NEW YORK &bull; SPRINT ACTIVE</text>
  </g>
</svg>`;

// 3. Storefront / Clinic Visual
const svgStorefront = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="clinicBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141E18"/>
      <stop offset="100%" stop-color="#0A0F0D"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#clinicBg)"/>
  <!-- Boutique Architectural Storefront / Clinic Facade -->
  <g transform="translate(70, 45)">
    <rect x="0" y="20" width="260" height="190" rx="8" fill="#1C2822" stroke="rgba(198, 242, 77, 0.2)"/>
    <!-- Modern Minimalist Awning -->
    <polygon points="-10,20 270,20 250,55 10,55" fill="#C6F24D"/>
    <!-- Large Glass Display Windows -->
    <rect x="20" y="70" width="100" height="130" rx="4" fill="#0C1410" stroke="rgba(255,255,255,0.1)"/>
    <rect x="140" y="70" width="100" height="130" rx="4" fill="#0C1410" stroke="rgba(255,255,255,0.1)"/>
    <!-- Interior Warm Ambient Light -->
    <circle cx="70" cy="120" r="35" fill="rgba(253, 224, 71, 0.18)"/>
    <circle cx="190" cy="120" r="35" fill="rgba(198, 242, 77, 0.18)"/>
    <!-- 5-Star Floating Google Badge -->
    <g transform="translate(50, 160)">
      <rect x="0" y="0" width="160" height="30" rx="15" fill="#09090C" stroke="#10B981"/>
      <text x="80" y="19" font-family="-apple-system, sans-serif" font-size="10" font-weight="900" fill="#C6F24D" text-anchor="middle">★ 4.9 LOCAL SERVICE LEADER</text>
    </g>
  </g>
</svg>`;

// 4. Asia-Pacific / Singapore Hub Visual
const svgSingapore = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="sgBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#121824"/>
      <stop offset="100%" stop-color="#090C12"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#sgBg)"/>
  <!-- Marina Bay Sands 3 Towers & SkyPark Silhouette -->
  <g transform="translate(100, 70)">
    <!-- Tower 1, 2, 3 -->
    <polygon points="20,180 30,50 48,50 40,180" fill="#243048"/>
    <polygon points="70,180 80,50 98,50 90,180" fill="#243048"/>
    <polygon points="120,180 130,50 148,50 140,180" fill="#243048"/>
    <!-- Curved SkyPark Boat on Top -->
    <path d="M10 50 Q100 35 190 40 L195 54 Q100 48 15 56 Z" fill="#C6F24D"/>
    <!-- Supertree Grove Silhouettes -->
    <path d="M-40 180 Q-20 120 0 110 Q20 120 40 180" fill="none" stroke="rgba(198, 242, 77, 0.4)" stroke-width="2"/>
    <path d="M160 180 Q180 130 200 120 Q220 130 240 180" fill="none" stroke="rgba(59, 130, 246, 0.5)" stroke-width="2"/>
  </g>
  <!-- Edge Network Ping Badge -->
  <g transform="translate(125, 230)">
    <rect x="0" y="0" width="150" height="30" rx="15" fill="rgba(16, 185, 129, 0.15)" stroke="#10B981"/>
    <circle cx="20" cy="15" r="4" fill="#10B981"/>
    <text x="85" y="19" font-family="-apple-system, sans-serif" font-size="10" font-weight="bold" fill="#A7F3D0" text-anchor="middle">APAC EDGE &bull; 9ms TTFB</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(destDir, 'london.svg'), svgLondon);
fs.writeFileSync(path.join(destDir, 'nyc-sprint.svg'), svgNYC);
fs.writeFileSync(path.join(destDir, 'storefront.svg'), svgStorefront);
fs.writeFileSync(path.join(destDir, 'singapore.svg'), svgSingapore);

console.log('Successfully generated 4 globe editorial visual assets!');
