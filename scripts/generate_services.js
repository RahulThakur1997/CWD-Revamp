const fs = require('fs');
const path = require('path');

const dir = 'assets/services';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// 1. Local Business Websites (High-end smartphone mockup displaying modern local trade booking UI)
const svg1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <defs>
    <linearGradient id="bgGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#121217"/>
      <stop offset="100%" stop-color="#08080A"/>
    </linearGradient>
    <radialGradient id="phoneHalo" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="rgba(198, 242, 77, 0.22)"/>
      <stop offset="60%" stop-color="rgba(198, 242, 77, 0.02)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <filter id="dropShadow1" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="20" stdDeviation="28" flood-color="#000000" flood-opacity="0.85"/>
    </filter>
  </defs>

  <rect width="600" height="500" fill="url(#bgGrad1)"/>
  <circle cx="300" cy="225" r="220" fill="url(#phoneHalo)"/>

  <!-- Subtle Studio Grid -->
  <g stroke="rgba(255, 255, 255, 0.04)" stroke-width="1">
    <line x1="100" y1="0" x2="100" y2="500"/>
    <line x1="200" y1="0" x2="200" y2="500"/>
    <line x1="300" y1="0" x2="300" y2="500"/>
    <line x1="400" y1="0" x2="400" y2="500"/>
    <line x1="500" y1="0" x2="500" y2="500"/>
    <line x1="0" y1="125" x2="600" y2="125"/>
    <line x1="0" y1="250" x2="600" y2="250"/>
    <line x1="0" y1="375" x2="600" y2="375"/>
  </g>

  <!-- 3D Smartphone Frame -->
  <g transform="translate(175, 45)" filter="url(#dropShadow1)">
    <rect x="0" y="0" width="250" height="415" rx="36" fill="#1C1C24" stroke="rgba(255, 255, 255, 0.16)" stroke-width="2"/>
    <rect x="8" y="8" width="234" height="399" rx="28" fill="#0C0C0E"/>

    <!-- Dynamic Island -->
    <rect x="90" y="18" width="70" height="15" rx="7.5" fill="#000000"/>
    <circle cx="146" cy="25.5" r="3" fill="#1E293B"/>

    <!-- Brand Bar -->
    <g transform="translate(24, 46)">
      <rect x="0" y="0" width="202" height="30" rx="8" fill="rgba(255, 255, 255, 0.04)"/>
      <circle cx="15" cy="15" r="6" fill="#C6F24D"/>
      <text x="28" y="19" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800" letter-spacing="0.5">LONDON ELITE TRADE</text>
    </g>

    <!-- Status Banner: 24/7 Dispatch -->
    <g transform="translate(24, 84)">
      <rect x="0" y="0" width="202" height="24" rx="6" fill="rgba(198, 242, 77, 0.12)" stroke="rgba(198, 242, 77, 0.35)" stroke-width="1"/>
      <circle cx="12" cy="12" r="3.5" fill="#C6F24D"/>
      <text x="24" y="15.5" fill="#C6F24D" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="700">LIVE DISPATCH • 15 MIN ESTIMATE</text>
    </g>

    <!-- Hero Card Mockup -->
    <g transform="translate(24, 116)">
      <rect x="0" y="0" width="202" height="125" rx="14" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1"/>
      <text x="14" y="26" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800">Instant Local Quote</text>
      <text x="14" y="44" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5">Tap below for emergency booking</text>
      
      <text x="14" y="62" fill="#FBBF24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10">★★★★★</text>
      <text x="62" y="62" fill="#E4E4E7" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="600">4.9 (142 Verified Reviews)</text>

      <rect x="14" y="76" width="174" height="34" rx="8" fill="#C6F24D"/>
      <text x="44" y="97" fill="#000000" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800">Book Service Online →</text>
    </g>

    <!-- Quick Schedule Slots -->
    <g transform="translate(24, 250)">
      <rect x="0" y="0" width="62" height="42" rx="8" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
      <text x="14" y="17" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7.5">TODAY</text>
      <text x="10" y="32" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700">10:00 AM</text>

      <rect x="70" y="0" width="62" height="42" rx="8" fill="rgba(198, 242, 77, 0.15)" stroke="rgba(198, 242, 77, 0.45)" stroke-width="1"/>
      <text x="84" y="17" fill="#C6F24D" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7.5">TODAY</text>
      <text x="80" y="32" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700">01:30 PM</text>

      <rect x="140" y="0" width="62" height="42" rx="8" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
      <text x="154" y="17" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7.5">TODAY</text>
      <text x="150" y="32" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700">04:00 PM</text>
    </g>

    <!-- 1-Tap Click-to-Call Float -->
    <g transform="translate(24, 302)">
      <rect x="0" y="0" width="202" height="44" rx="10" fill="#181820" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1"/>
      <circle cx="22" cy="22" r="13" fill="rgba(198, 242, 77, 0.18)"/>
      <text x="16" y="27" fill="#C6F24D" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12">📞</text>
      <text x="44" y="19" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9.5" font-weight="700">Call Dispatch Now</text>
      <text x="44" y="32" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8">Average Answer: 8 Seconds</text>
    </g>

    <!-- Home Indicator -->
    <rect x="75" y="386" width="100" height="4" rx="2" fill="rgba(255, 255, 255, 0.3)"/>
  </g>
</svg>`;

// 2. B2B & Corporate Platforms (Sleek floating tablet displaying an executive SaaS/enterprise analytics dashboard)
const svg2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <defs>
    <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#121218"/>
      <stop offset="100%" stop-color="#09090C"/>
    </linearGradient>
    <radialGradient id="tabletHalo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="rgba(198, 242, 77, 0.18)"/>
      <stop offset="60%" stop-color="rgba(99, 102, 241, 0.05)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <filter id="dropShadow2" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="22" stdDeviation="30" flood-color="#000000" flood-opacity="0.85"/>
    </filter>
  </defs>

  <rect width="600" height="500" fill="url(#bgGrad2)"/>
  <circle cx="300" cy="230" r="230" fill="url(#tabletHalo)"/>

  <!-- Studio Grid -->
  <g stroke="rgba(255, 255, 255, 0.04)" stroke-width="1">
    <line x1="100" y1="0" x2="100" y2="500"/>
    <line x1="200" y1="0" x2="200" y2="500"/>
    <line x1="300" y1="0" x2="300" y2="500"/>
    <line x1="400" y1="0" x2="400" y2="500"/>
    <line x1="500" y1="0" x2="500" y2="500"/>
    <line x1="0" y1="125" x2="600" y2="125"/>
    <line x1="0" y1="250" x2="600" y2="250"/>
    <line x1="0" y1="375" x2="600" y2="375"/>
  </g>

  <!-- 3D Floating Tablet Device -->
  <g transform="translate(100, 75)" filter="url(#dropShadow2)">
    <rect x="0" y="0" width="400" height="290" rx="24" fill="#1C1C24" stroke="rgba(255, 255, 255, 0.16)" stroke-width="2"/>
    <rect x="8" y="8" width="384" height="274" rx="18" fill="#0C0C10"/>

    <!-- Left Mini Sidebar -->
    <rect x="8" y="8" width="56" height="274" rx="18" fill="rgba(255, 255, 255, 0.02)"/>
    <circle cx="36" cy="32" r="10" fill="#C6F24D"/>
    <rect x="22" y="60" width="28" height="6" rx="3" fill="rgba(255, 255, 255, 0.2)"/>
    <rect x="22" y="80" width="28" height="6" rx="3" fill="rgba(255, 255, 255, 0.1)"/>
    <rect x="22" y="100" width="28" height="6" rx="3" fill="rgba(255, 255, 255, 0.1)"/>
    <rect x="22" y="120" width="28" height="6" rx="3" fill="rgba(255, 255, 255, 0.1)"/>

    <!-- Dashboard Top Bar -->
    <g transform="translate(76, 18)">
      <text x="0" y="16" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800">ENTERPRISE PIPELINE ARCHITECTURE</text>
      <rect x="220" y="2" width="88" height="20" rx="10" fill="rgba(198, 242, 77, 0.15)" stroke="rgba(198, 242, 77, 0.4)" stroke-width="1"/>
      <text x="232" y="16" fill="#C6F24D" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="700">● LIVE PIPELINE</text>
    </g>

    <!-- 3 Metric Cards Row -->
    <g transform="translate(76, 48)">
      <!-- Metric 1 -->
      <rect x="0" y="0" width="96" height="56" rx="10" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1"/>
      <text x="10" y="16" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7.5" font-weight="600">ANNUAL PIPELINE</text>
      <text x="10" y="36" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">$2.48M</text>
      <text x="10" y="49" fill="#C6F24D" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="700">+184% YoY</text>

      <!-- Metric 2 -->
      <rect x="104" y="0" width="96" height="56" rx="10" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1"/>
      <text x="114" y="16" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7.5" font-weight="600">AVG DEAL VALUE</text>
      <text x="114" y="36" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">$48,500</text>
      <text x="114" y="49" fill="#C6F24D" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="700">Enterprise Tiers</text>

      <!-- Metric 3 -->
      <rect x="208" y="0" width="96" height="56" rx="10" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1"/>
      <text x="218" y="16" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7.5" font-weight="600">CONVERSION RATE</text>
      <text x="218" y="36" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800">8.42%</text>
      <text x="218" y="49" fill="#C6F24D" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="700">3.8x B2B Avg</text>
    </g>

    <!-- Interactive Growth Graph -->
    <g transform="translate(76, 114)">
      <rect x="0" y="0" width="304" height="150" rx="12" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.06)" stroke-width="1"/>
      
      <!-- Graph Grid Lines -->
      <line x1="20" y1="35" x2="284" y2="35" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1"/>
      <line x1="20" y1="75" x2="284" y2="75" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1"/>
      <line x1="20" y1="115" x2="284" y2="115" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1"/>

      <!-- Glowing Neon Green Growth Curve -->
      <path d="M 20 120 Q 80 110, 120 75 T 200 45 T 284 20" fill="none" stroke="#C6F24D" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Area Gradient Under Curve -->
      <path d="M 20 120 Q 80 110, 120 75 T 200 45 T 284 20 L 284 135 L 20 135 Z" fill="url(#limeGlowFill)"/>

      <!-- Node Markers -->
      <circle cx="120" cy="75" r="4.5" fill="#FFFFFF" stroke="#C6F24D" stroke-width="2"/>
      <circle cx="200" cy="45" r="4.5" fill="#FFFFFF" stroke="#C6F24D" stroke-width="2"/>
      <circle cx="284" cy="20" r="5" fill="#C6F24D" stroke="#FFFFFF" stroke-width="2"/>

      <!-- Data Label Tag -->
      <rect x="210" y="60" width="76" height="22" rx="6" fill="#181820" stroke="rgba(198, 242, 77, 0.4)" stroke-width="1"/>
      <text x="218" y="75" fill="#C6F24D" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="800">Q4: +$840K ARR</text>
    </g>
  </g>

  <defs>
    <linearGradient id="limeGlowFill" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(198, 242, 77, 0.25)"/>
      <stop offset="100%" stop-color="rgba(198, 242, 77, 0.0)"/>
    </linearGradient>
  </defs>
</svg>`;

// 3. Search Engine Optimization (Clean visual composition featuring abstract glowing organic search graph and keyword ranking metrics in dark mode)
const svg3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <defs>
    <linearGradient id="bgGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111116"/>
      <stop offset="100%" stop-color="#08080B"/>
    </linearGradient>
    <radialGradient id="seoHalo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="rgba(198, 242, 77, 0.22)"/>
      <stop offset="60%" stop-color="rgba(16, 185, 129, 0.05)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <filter id="dropShadow3" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="20" stdDeviation="28" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <rect width="600" height="500" fill="url(#bgGrad3)"/>
  <circle cx="300" cy="230" r="230" fill="url(#seoHalo)"/>

  <!-- Studio Grid -->
  <g stroke="rgba(255, 255, 255, 0.04)" stroke-width="1">
    <line x1="100" y1="0" x2="100" y2="500"/>
    <line x1="200" y1="0" x2="200" y2="500"/>
    <line x1="300" y1="0" x2="300" y2="500"/>
    <line x1="400" y1="0" x2="400" y2="500"/>
    <line x1="500" y1="0" x2="500" y2="500"/>
    <line x1="0" y1="125" x2="600" y2="125"/>
    <line x1="0" y1="250" x2="600" y2="250"/>
    <line x1="0" y1="375" x2="600" y2="375"/>
  </g>

  <!-- Central Visual Console -->
  <g transform="translate(100, 60)" filter="url(#dropShadow3)">
    <!-- Container Card -->
    <rect x="0" y="0" width="400" height="340" rx="24" fill="#14141B" stroke="rgba(255, 255, 255, 0.14)" stroke-width="2"/>

    <!-- SERP Search Bar Simulation -->
    <g transform="translate(24, 24)">
      <rect x="0" y="0" width="352" height="42" rx="12" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1"/>
      <circle cx="22" cy="21" r="7" fill="none" stroke="#C6F24D" stroke-width="2"/>
      <line x1="27" y1="26" x2="33" y2="32" stroke="#C6F24D" stroke-width="2"/>
      <text x="44" y="25" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">emergency roofing specialist near me</text>
      <rect x="290" y="9" width="52" height="24" rx="6" fill="#C6F24D"/>
      <text x="302" y="25" fill="#000000" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800">SEARCH</text>
    </g>

    <!-- Rank #1 Position Pill -->
    <g transform="translate(24, 82)">
      <rect x="0" y="0" width="352" height="64" rx="12" fill="rgba(198, 242, 77, 0.08)" stroke="rgba(198, 242, 77, 0.35)" stroke-width="1.5"/>
      <rect x="14" y="12" width="38" height="40" rx="8" fill="#C6F24D"/>
      <text x="21" y="37" fill="#000000" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900">#1</text>
      <text x="64" y="28" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800">Top Position Organic Search Result</text>
      <text x="64" y="44" fill="#C6F24D" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9.5" font-weight="600">● 100/100 Core Web Vitals • Rich Snippet Active</text>
    </g>

    <!-- SEO Organic Growth Graph -->
    <g transform="translate(24, 160)">
      <rect x="0" y="0" width="352" height="152" rx="14" fill="rgba(0, 0, 0, 0.4)" stroke="rgba(255, 255, 255, 0.06)" stroke-width="1"/>
      
      <text x="16" y="24" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="700">ORGANIC KEYWORD VISIBILITY CURVE</text>
      <text x="260" y="24" fill="#C6F24D" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800">+420% CLICKS</text>

      <!-- Upward Organic Growth Lines -->
      <path d="M 24 125 Q 90 120, 140 85 T 230 50 T 328 26" fill="none" stroke="#C6F24D" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Nodes -->
      <circle cx="140" cy="85" r="4.5" fill="#FFFFFF" stroke="#C6F24D" stroke-width="2"/>
      <circle cx="230" cy="50" r="4.5" fill="#FFFFFF" stroke="#C6F24D" stroke-width="2"/>
      <circle cx="328" cy="26" r="5" fill="#C6F24D" stroke="#FFFFFF" stroke-width="2"/>

      <!-- Floating Audit Badge -->
      <g transform="translate(20, 52)">
        <rect x="0" y="0" width="96" height="50" rx="8" fill="#181822" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1"/>
        <text x="10" y="18" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7.5">MOBILE SPEED</text>
        <text x="10" y="38" fill="#C6F24D" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="900">99 / 100</text>
      </g>
    </g>
  </g>
</svg>`;

// 4. Google Maps & Local Pack Dominance (Stylized dark 3D map interface with glowing neon lime location pin and 5-star cards)
const svg4 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <defs>
    <linearGradient id="bgGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111116"/>
      <stop offset="100%" stop-color="#08080B"/>
    </linearGradient>
    <radialGradient id="mapHalo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="rgba(198, 242, 77, 0.24)"/>
      <stop offset="60%" stop-color="rgba(198, 242, 77, 0.04)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <filter id="dropShadow4" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="20" stdDeviation="28" flood-color="#000000" flood-opacity="0.85"/>
    </filter>
  </defs>

  <rect width="600" height="500" fill="url(#bgGrad4)"/>
  <circle cx="300" cy="220" r="230" fill="url(#mapHalo)"/>

  <!-- 3D Isometric Map Stage -->
  <g transform="translate(100, 60)" filter="url(#dropShadow4)">
    <!-- Base Map Tile -->
    <rect x="0" y="0" width="400" height="340" rx="24" fill="#14141C" stroke="rgba(255, 255, 255, 0.15)" stroke-width="2"/>

    <!-- Map Road Arteries Grid (Dark Obsidian Style) -->
    <g stroke="#1F2430" stroke-width="12" stroke-linecap="round">
      <path d="M 0 100 Q 150 120, 260 80 T 400 130" fill="none"/>
      <path d="M 120 0 Q 160 160, 240 260 T 320 340" fill="none"/>
      <path d="M 0 250 Q 180 200, 300 240 T 400 220" fill="none"/>
    </g>
    <!-- Secondary Streets -->
    <g stroke="rgba(255, 255, 255, 0.08)" stroke-width="3" stroke-linecap="round" stroke-dasharray="4,4">
      <path d="M 0 100 Q 150 120, 260 80 T 400 130" fill="none"/>
      <path d="M 120 0 Q 160 160, 240 260 T 320 340" fill="none"/>
      <path d="M 0 250 Q 180 200, 300 240 T 400 220" fill="none"/>
    </g>

    <!-- Concentric Pulse Rings Under Center Location Pin -->
    <circle cx="210" cy="170" r="50" fill="none" stroke="rgba(198, 242, 77, 0.25)" stroke-width="1.5"/>
    <circle cx="210" cy="170" r="85" fill="none" stroke="rgba(198, 242, 77, 0.12)" stroke-width="1"/>
    <circle cx="210" cy="170" r="120" fill="none" stroke="rgba(198, 242, 77, 0.05)" stroke-width="1"/>

    <!-- 3D Glowing Neon Lime Map Beacon Pin -->
    <g transform="translate(192, 108)">
      <path d="M 18 0 C 8 0, 0 8, 0 18 C 0 31, 18 52, 18 52 C 18 52, 36 31, 36 18 C 36 8, 28 0, 18 0 Z" fill="#C6F24D" stroke="#FFFFFF" stroke-width="2"/>
      <circle cx="18" cy="18" r="7" fill="#000000"/>
      <circle cx="18" cy="18" r="3" fill="#C6F24D"/>
    </g>

    <!-- Floating Top 3 Google Local Pack Card -->
    <g transform="translate(30, 220)">
      <rect x="0" y="0" width="340" height="96" rx="14" fill="#181822" stroke="rgba(198, 242, 77, 0.4)" stroke-width="1.5"/>
      
      <circle cx="24" cy="28" r="12" fill="#C6F24D"/>
      <text x="18" y="34" fill="#000000" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="900">#1</text>
      
      <text x="44" y="24" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11.5" font-weight="800">Google Maps 3-Pack Winner</text>
      <text x="44" y="39" fill="#FBBF24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9.5">★★★★★ 5.0 (86 Google Reviews)</text>
      <text x="44" y="53" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5">"Open 24 hours • Emergency Call-Out • Verified Business"</text>

      <rect x="44" y="62" width="115" height="22" rx="6" fill="rgba(198, 242, 77, 0.15)" stroke="rgba(198, 242, 77, 0.4)" stroke-width="1"/>
      <text x="54" y="76" fill="#C6F24D" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="800">● 8.4X DIRECTIONS</text>

      <rect x="168" y="62" width="110" height="22" rx="6" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
      <text x="178" y="76" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="700">1-TAP CALLS (+290%)</text>
    </g>
  </g>
</svg>`;

// 5. Digital Lead Funnels & Marketing (Multi-layered isometric screen funnel showing conversion metrics, click-through badges, and ad mockups)
const svg5 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <defs>
    <linearGradient id="bgGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#121218"/>
      <stop offset="100%" stop-color="#08080C"/>
    </linearGradient>
    <radialGradient id="funnelHalo" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="rgba(198, 242, 77, 0.22)"/>
      <stop offset="60%" stop-color="rgba(244, 63, 94, 0.05)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <filter id="dropShadow5" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="20" stdDeviation="28" flood-color="#000000" flood-opacity="0.85"/>
    </filter>
  </defs>

  <rect width="600" height="500" fill="url(#bgGrad5)"/>
  <circle cx="300" cy="220" r="230" fill="url(#funnelHalo)"/>

  <!-- Studio Grid -->
  <g stroke="rgba(255, 255, 255, 0.04)" stroke-width="1">
    <line x1="100" y1="0" x2="100" y2="500"/>
    <line x1="200" y1="0" x2="200" y2="500"/>
    <line x1="300" y1="0" x2="300" y2="500"/>
    <line x1="400" y1="0" x2="400" y2="500"/>
    <line x1="500" y1="0" x2="500" y2="500"/>
    <line x1="0" y1="125" x2="600" y2="125"/>
    <line x1="0" y1="250" x2="600" y2="250"/>
    <line x1="0" y1="375" x2="600" y2="375"/>
  </g>

  <!-- Multi-Layered Conversion Funnel Architecture -->
  <g transform="translate(100, 50)" filter="url(#dropShadow5)">
    <!-- Base Card -->
    <rect x="0" y="0" width="400" height="360" rx="24" fill="#14141C" stroke="rgba(255, 255, 255, 0.15)" stroke-width="2"/>

    <!-- Layer 1: Ad Creative Stage -->
    <g transform="translate(24, 24)">
      <rect x="0" y="0" width="352" height="68" rx="12" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
      <circle cx="20" cy="20" r="8" fill="#3B82F6"/>
      <text x="36" y="24" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700">Meta &amp; Google Paid Acquisition</text>
      <rect x="260" y="10" width="76" height="20" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="rgba(59, 130, 246, 0.4)" stroke-width="1"/>
      <text x="270" y="24" fill="#93C5FD" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="800">4.8% HIGH CTR</text>
      <text x="20" y="52" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9">Hyper-targeted local intent creative capturing high-intent search traffic</text>
    </g>

    <!-- Downward Flow Funnel Arrow 1 -->
    <polygon points="200,98 206,108 194,108" fill="#C6F24D"/>

    <!-- Layer 2: Dedicated Conversion Landing Page -->
    <g transform="translate(24, 114)">
      <rect x="0" y="0" width="352" height="96" rx="14" fill="rgba(198, 242, 77, 0.08)" stroke="rgba(198, 242, 77, 0.4)" stroke-width="1.5"/>
      <circle cx="20" cy="22" r="8" fill="#C6F24D"/>
      <text x="36" y="26" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11.5" font-weight="800">CWD Frictionless Funnel Page</text>
      <rect x="250" y="12" width="86" height="22" rx="6" fill="#C6F24D"/>
      <text x="260" y="27" fill="#000000" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="900">42% CONVERSION</text>
      
      <!-- Micro-Form simulation -->
      <g transform="translate(18, 44)">
        <rect x="0" y="0" width="145" height="24" rx="6" fill="rgba(0, 0, 0, 0.4)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
        <text x="10" y="16" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5">Select Service...</text>

        <rect x="155" y="0" width="160" height="24" rx="6" fill="#C6F24D"/>
        <text x="180" y="16" fill="#000000" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800">Instant Estimate →</text>
      </g>
      <text x="20" y="84" fill="#C6F24D" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="600">● 0.8s Load Time • Zero Revision Drift • Integrated Pixels</text>
    </g>

    <!-- Downward Flow Funnel Arrow 2 -->
    <polygon points="200,216 206,226 194,226" fill="#C6F24D"/>

    <!-- Layer 3: Direct Lead Dispatch & Closed Revenue -->
    <g transform="translate(24, 232)">
      <rect x="0" y="0" width="352" height="96" rx="12" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
      <circle cx="20" cy="22" r="8" fill="#10B981"/>
      <text x="36" y="26" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">Automated CRM &amp; SMS Dispatch</text>
      <rect x="240" y="12" width="96" height="22" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" stroke-width="1"/>
      <text x="252" y="27" fill="#6EE7B7" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="800">4.8X ROAS RETURN</text>
      
      <!-- Metrics row -->
      <g transform="translate(18, 48)">
        <rect x="0" y="0" width="98" height="36" rx="6" fill="#181822"/>
        <text x="8" y="14" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7">AVG COST / LEAD</text>
        <text x="8" y="28" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800">$14.20 (-52%)</text>

        <rect x="106" y="0" width="98" height="36" rx="6" fill="#181822"/>
        <text x="114" y="14" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7">RESPONSE SPEED</text>
        <text x="114" y="28" fill="#C6F24D" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800">&lt; 30 Seconds</text>

        <rect x="212" y="0" width="98" height="36" rx="6" fill="#181822"/>
        <text x="220" y="14" fill="#A1A1AA" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7">QUALIFIED RATE</text>
        <text x="220" y="28" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800">89.4% Qualified</text>
      </g>
    </g>
  </g>
</svg>`;

fs.writeFileSync('assets/services/local-biz.svg', svg1);
fs.writeFileSync('assets/services/b2b-web.svg', svg2);
fs.writeFileSync('assets/services/seo.svg', svg3);
fs.writeFileSync('assets/services/google-maps.svg', svg4);
fs.writeFileSync('assets/services/lead-funnels.svg', svg5);

console.log('Successfully generated all 5 SVGs in assets/services!');
