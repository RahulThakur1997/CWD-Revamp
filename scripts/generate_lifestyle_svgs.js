const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, '..', 'assets', 'services');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 1. Local Business Websites (Clinic / Studio / Appointment Booking)
const svgLocalBiz = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <defs>
    <linearGradient id="localBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EFF6FF"/>
      <stop offset="50%" stop-color="#F0FDF4"/>
      <stop offset="100%" stop-color="#FEF3C7"/>
    </linearGradient>
    <filter id="softShad" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#0F172A" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect width="600" height="500" fill="url(#localBg)"/>
  
  <!-- Studio Warm Light Circle -->
  <circle cx="480" cy="120" r="160" fill="rgba(254, 240, 138, 0.45)"/>
  <circle cx="120" cy="380" r="140" fill="rgba(187, 247, 208, 0.45)"/>

  <!-- Clinic / Professional Silhouette Art -->
  <g transform="translate(60, 120)">
    <!-- Professional Figure in Modern Studio -->
    <path d="M70 200 C70 140, 110 100, 160 100 C210 100, 250 140, 250 200 L260 380 L60 380 Z" fill="#3B82F6" opacity="0.15"/>
    <circle cx="160" cy="70" r="42" fill="#FBBF24" opacity="0.6"/>
    <!-- Clinic Stethoscope / Wellness Symbol -->
    <path d="M140 120 C140 160, 180 160, 180 120" stroke="#059669" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="180" cy="120" r="8" fill="#10B981"/>
  </g>

  <!-- High-Fidelity iPhone Device Floating in Foreground -->
  <g transform="translate(240, 50)" filter="url(#softShad)">
    <!-- Phone Body -->
    <rect x="0" y="0" width="280" height="400" rx="36" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="3"/>
    <rect x="10" y="10" width="260" height="380" rx="28" fill="#F8FAFC"/>
    
    <!-- Dynamic Island -->
    <rect x="100" y="18" width="80" height="18" rx="9" fill="#0F172A"/>
    
    <!-- App Header -->
    <rect x="25" y="48" width="130" height="12" rx="4" fill="#0F172A"/>
    <rect x="25" y="66" width="90" height="8" rx="4" fill="#94A3B8"/>
    
    <!-- Live Booking Hero Card -->
    <rect x="25" y="88" width="230" height="125" rx="14" fill="#FFFFFF" stroke="#E2E8F0"/>
    <rect x="38" y="102" width="140" height="12" rx="4" fill="#059669"/>
    <rect x="38" y="122" width="200" height="8" rx="4" fill="#64748B"/>
    <rect x="38" y="136" width="160" height="8" rx="4" fill="#64748B"/>
    
    <!-- Next Available Slot Tag -->
    <rect x="38" y="160" width="110" height="26" rx="8" fill="#DCFCE7"/>
    <text x="50" y="177" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="bold" fill="#15803D">Today at 2:30 PM ✓</text>
    
    <!-- 1-Tap Booking CTA Button -->
    <rect x="156" y="160" width="86" height="26" rx="8" fill="#C6F24D"/>
    <text x="172" y="177" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="900" fill="#0F172A">Book →</text>
    
    <!-- 5-Star Rating Pill -->
    <rect x="25" y="225" width="230" height="42" rx="10" fill="#FEF3C7" stroke="#FDE68A"/>
    <text x="40" y="247" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" font-weight="bold" fill="#B45309">★ ★ ★ ★ ★ 4.9/5</text>
    <text x="145" y="247" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="600" fill="#78350F">(184 Reviews)</text>
    
    <!-- Instant Call Trigger -->
    <rect x="25" y="280" width="230" height="48" rx="12" fill="#0F172A"/>
    <circle cx="50" cy="304" r="12" fill="#C6F24D"/>
    <text x="45" y="309" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" font-weight="bold" fill="#0F172A">📞</text>
    <text x="74" y="302" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">Call Clinic Directly</text>
    <text x="74" y="316" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="10" fill="#94A3B8">Average response: 30 secs</text>
  </g>
</svg>`;

// 2. B2B & Corporate Platforms (Creative Collaboration & Architectural Web)
const svgB2B = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <defs>
    <linearGradient id="b2bBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF5FF"/>
      <stop offset="50%" stop-color="#F5F3FF"/>
      <stop offset="100%" stop-color="#EFF6FF"/>
    </linearGradient>
    <filter id="b2bShad" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#4F46E5" flood-opacity="0.14"/>
    </filter>
  </defs>

  <rect width="600" height="500" fill="url(#b2bBg)"/>
  
  <!-- Collaborative Architectural Aura -->
  <circle cx="150" cy="180" r="160" fill="rgba(216, 180, 254, 0.35)"/>
  <circle cx="480" cy="350" r="180" fill="rgba(199, 210, 254, 0.45)"/>

  <!-- Sleek Floating Laptop Frame -->
  <g transform="translate(60, 60)" filter="url(#b2bShad)">
    <!-- Laptop Screen -->
    <rect x="0" y="0" width="480" height="310" rx="16" fill="#0F172A"/>
    <rect x="12" y="12" width="456" height="286" rx="10" fill="#FFFFFF"/>
    
    <!-- Web App Header -->
    <rect x="24" y="24" width="432" height="34" rx="8" fill="#F8FAFC"/>
    <circle cx="42" cy="41" r="5" fill="#EF4444"/>
    <circle cx="58" cy="41" r="5" fill="#F59E0B"/>
    <circle cx="74" cy="41" r="5" fill="#10B981"/>
    <rect x="100" y="33" width="160" height="16" rx="8" fill="#E2E8F0"/>
    
    <!-- Architectural Hero Banner -->
    <rect x="24" y="70" width="260" height="130" rx="10" fill="linear-gradient(135deg, #4F46E5, #7C3AED)"/>
    <rect x="40" y="88" width="120" height="14" rx="4" fill="#FFFFFF"/>
    <rect x="40" y="110" width="180" height="8" rx="4" fill="rgba(255,255,255,0.7)"/>
    <rect x="40" y="126" width="140" height="8" rx="4" fill="rgba(255,255,255,0.7)"/>
    <rect x="40" y="150" width="90" height="26" rx="6" fill="#C6F24D"/>
    
    <!-- Enterprise Dashboard Stats Card -->
    <rect x="296" y="70" width="160" height="130" rx="10" fill="#F8FAFC" stroke="#E2E8F0"/>
    <text x="310" y="92" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="bold" fill="#64748B">PIPELINE VALUE</text>
    <text x="310" y="120" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="22" font-weight="900" fill="#0F172A">$482,000</text>
    <rect x="310" y="135" width="85" height="20" rx="6" fill="#DCFCE7"/>
    <text x="320" y="149" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="bold" fill="#15803D">+318% YoY</text>
    
    <!-- 3 Metrics Columns -->
    <rect x="24" y="212" width="136" height="74" rx="8" fill="#F1F5F9"/>
    <rect x="172" y="212" width="136" height="74" rx="8" fill="#F1F5F9"/>
    <rect x="320" y="212" width="136" height="74" rx="8" fill="#F1F5F9"/>
    
    <!-- Laptop Base -->
    <path d="M-30 310 L510 310 L470 330 L-10 330 Z" fill="#94A3B8"/>
    <rect x="200" y="310" width="80" height="6" rx="3" fill="#64748B"/>
  </g>
</svg>`;

// 3. Search Engine Optimization (SEO)
const svgSEO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <defs>
    <linearGradient id="seoBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F0FDF4"/>
      <stop offset="50%" stop-color="#ECFDF5"/>
      <stop offset="100%" stop-color="#EFF6FF"/>
    </linearGradient>
    <filter id="seoShad" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="22" flood-color="#059669" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect width="600" height="500" fill="url(#seoBg)"/>
  
  <circle cx="450" cy="150" r="150" fill="rgba(167, 243, 208, 0.45)"/>
  <circle cx="150" cy="380" r="140" fill="rgba(191, 219, 254, 0.45)"/>

  <!-- Google Rank #1 Dominance Card Floating in Center -->
  <g transform="translate(80, 55)" filter="url(#seoShad)">
    <rect x="0" y="0" width="440" height="390" rx="20" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    
    <!-- Search Bar Mockup -->
    <rect x="24" y="24" width="392" height="46" rx="23" fill="#F8FAFC" stroke="#CBD5E1"/>
    <text x="45" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" fill="#0F172A" font-weight="600">best private clinic london</text>
    <circle cx="390" cy="47" r="14" fill="#10B981"/>
    <text x="385" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" fill="#FFFFFF">🔍</text>
    
    <!-- Google #1 Result Card -->
    <rect x="24" y="86" width="392" height="135" rx="14" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1.5"/>
    <rect x="42" y="104" width="80" height="20" rx="6" fill="#15803D"/>
    <text x="50" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="10" font-weight="900" fill="#FFFFFF">#1 ON GOOGLE</text>
    
    <text x="135" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="600" fill="#059669">https://cwd-client-clinic.co.uk</text>
    
    <text x="42" y="148" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="16" font-weight="800" fill="#0F172A">London Elite Healthcare • Private Diagnostic Center</text>
    <text x="42" y="172" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" fill="#475569">Award-winning private clinic. Same day appointments, 5-star patient reviews, instant online booking.</text>
    <text x="42" y="196" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="bold" fill="#059669">★ ★ ★ ★ ★ 4.9 (240+ reviews) &bull; Core Web Vitals: 99/100</text>
    
    <!-- Organic Growth Metrics Chart -->
    <rect x="24" y="235" width="392" height="130" rx="14" fill="#FFFFFF" stroke="#E2E8F0"/>
    <text x="42" y="260" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="bold" fill="#64748B">ORGANIC TRAFFIC TRAJECTORY</text>
    <text x="330" y="260" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" font-weight="900" fill="#15803D">+384% LIFT</text>
    
    <!-- Trend Line -->
    <path d="M42 335 C120 330, 180 310, 240 280 C300 250, 360 230, 396 220" stroke="#10B981" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="396" cy="220" r="6" fill="#10B981"/>
    
    <!-- Metric Pill Tags -->
    <rect x="42" y="338" width="105" height="18" rx="4" fill="#DCFCE7"/>
    <text x="50" y="351" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="10" font-weight="bold" fill="#15803D">0% Ad Spend</text>
    
    <rect x="155" y="338" width="120" height="18" rx="4" fill="#EFF6FF"/>
    <text x="163" y="351" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="10" font-weight="bold" fill="#1D4ED8">12ms TTFB Speed</text>
  </g>
</svg>`;

// 4. Google Maps & Local Pack Dominance
const svgGoogleMaps = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <defs>
    <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF3C7"/>
      <stop offset="50%" stop-color="#FFFBEB"/>
      <stop offset="100%" stop-color="#F0FDF4"/>
    </linearGradient>
    <filter id="mapShad" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="22" flood-color="#D97706" flood-opacity="0.15"/>
    </filter>
  </defs>

  <rect width="600" height="500" fill="url(#mapBg)"/>
  <circle cx="480" cy="120" r="140" fill="rgba(253, 230, 138, 0.45)"/>
  <circle cx="100" cy="380" r="140" fill="rgba(187, 247, 208, 0.45)"/>

  <!-- Stylized Modern Maps & Local 3-Pack Frame -->
  <g transform="translate(80, 50)" filter="url(#mapShad)">
    <rect x="0" y="0" width="440" height="400" rx="20" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    
    <!-- Map Surface with Street Grid -->
    <rect x="16" y="16" width="408" height="170" rx="14" fill="#E2E8F0"/>
    <path d="M16 80 L424 80 M16 130 L424 130 M140 16 L140 186 M280 16 L280 186" stroke="#CBD5E1" stroke-width="8"/>
    
    <!-- Local Map Pin Hero -->
    <g transform="translate(210, 55)">
      <circle cx="20" cy="20" r="28" fill="rgba(239, 68, 68, 0.2)"/>
      <circle cx="20" cy="20" r="18" fill="#EF4444"/>
      <circle cx="20" cy="20" r="6" fill="#FFFFFF"/>
    </g>
    
    <!-- Map Pin Callout Badge -->
    <rect x="130" y="24" width="180" height="26" rx="13" fill="#0F172A"/>
    <text x="145" y="41" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="bold" fill="#C6F24D">★ #1 Ranked Local Hub</text>
    
    <!-- Local 3-Pack Pack Results -->
    <g transform="translate(16, 200)">
      <!-- Result 1 (Client - #1 Position) -->
      <rect x="0" y="0" width="408" height="90" rx="12" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1.5"/>
      <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" font-weight="900" fill="#0F172A">1. CWD Flagship Partner Studio</text>
      <text x="20" y="46" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" font-weight="bold" fill="#D97706">★ ★ ★ ★ ★ 5.0 (310+ Reviews) &bull; Open 24/7</text>
      <text x="20" y="64" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" fill="#475569">Verified Google Business Profile &bull; 0.3 miles away</text>
      
      <!-- Action Buttons -->
      <rect x="290" y="16" width="100" height="30" rx="8" fill="#C6F24D"/>
      <text x="312" y="35" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="900" fill="#0F172A">Directions ↗</text>
      
      <rect x="290" y="52" width="100" height="26" rx="8" fill="#0F172A"/>
      <text x="320" y="68" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF">Call Now</text>

      <!-- Result 2 (Competitor below) -->
      <rect x="0" y="98" width="408" height="50" rx="10" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="20" y="122" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" font-weight="700" fill="#64748B">2. Standard Local Clinic</text>
      <text x="20" y="138" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="10" fill="#94A3B8">3.8 Stars (12 reviews)</text>
    </g>
  </g>
</svg>`;

// 5. Digital Lead Funnels & Marketing (Warm Oak Desk, iPad & Ad Conversion)
const svgLeadFunnels = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <defs>
    <linearGradient id="funnelBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EFF6FF"/>
      <stop offset="50%" stop-color="#F5F3FF"/>
      <stop offset="100%" stop-color="#FEF2F2"/>
    </linearGradient>
    <filter id="funnelShad" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="22" flood-color="#4F46E5" flood-opacity="0.14"/>
    </filter>
  </defs>

  <rect width="600" height="500" fill="url(#funnelBg)"/>
  
  <circle cx="480" cy="140" r="160" fill="rgba(254, 202, 202, 0.45)"/>
  <circle cx="120" cy="360" r="140" fill="rgba(199, 210, 254, 0.45)"/>

  <!-- High-Converting Landing Page Frame on Warm Desk -->
  <g transform="translate(80, 50)" filter="url(#funnelShad)">
    <rect x="0" y="0" width="440" height="400" rx="20" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
    
    <!-- Top Bar with Conversion Badge -->
    <rect x="20" y="20" width="400" height="42" rx="10" fill="#0F172A"/>
    <text x="36" y="46" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">LIVE CONVERSION TRACKER</text>
    <rect x="300" y="28" width="105" height="26" rx="6" fill="#C6F24D"/>
    <text x="312" y="45" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="900" fill="#0F172A">+383% ROAS</text>
    
    <!-- Funnel Visualization Stage -->
    <g transform="translate(20, 76)">
      <!-- Step 1: Paid Traffic Inflow -->
      <rect x="0" y="0" width="400" height="52" rx="10" fill="#EFF6FF" stroke="#BFDBFE"/>
      <text x="16" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="10" font-weight="800" fill="#1D4ED8">STAGE 1: AD CLICK</text>
      <text x="16" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="13" font-weight="900" fill="#0F172A">Google &amp; Meta Ads Traffic: 10,000 Visitors</text>
      <rect x="310" y="14" width="75" height="24" rx="6" fill="#DBEAFE"/>
      <text x="322" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="10" font-weight="bold" fill="#1E40AF">100% Volume</text>

      <!-- Step 2: High-Converting Landing Page -->
      <rect x="20" y="60" width="360" height="52" rx="10" fill="#FAF5FF" stroke="#E9D5FF"/>
      <text x="36" y="84" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="10" font-weight="800" fill="#7E22CE">STAGE 2: CWD LANDING PAGE</text>
      <text x="36" y="102" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="13" font-weight="900" fill="#0F172A">Zero-Friction Fast Load: 9,200 Retained</text>
      <rect x="290" y="74" width="75" height="24" rx="6" fill="#F3E8FF"/>
      <text x="304" y="90" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="10" font-weight="bold" fill="#6B21A8">92% Retained</text>

      <!-- Step 3: Qualified Conversion -->
      <rect x="40" y="120" width="320" height="52" rx="10" fill="#F0FDF4" stroke="#86EFAC"/>
      <text x="56" y="144" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="10" font-weight="800" fill="#15803D">STAGE 3: BOOKED PHONE CALLS &amp; LEADS</text>
      <text x="56" y="162" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="13" font-weight="900" fill="#0F172A">580 Booked Appointments &bull; 5.8% CVR</text>
      <rect x="270" y="134" width="75" height="24" rx="6" fill="#DCFCE7"/>
      <text x="282" y="150" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="10" font-weight="bold" fill="#166534">5.8% CVR ✓</text>
    </g>

    <!-- ROAS & Revenue Calculator Row -->
    <g transform="translate(20, 260)">
      <rect x="0" y="0" width="190" height="110" rx="12" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="16" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="bold" fill="#64748B">AVERAGE COST / LEAD</text>
      <text x="16" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="24" font-weight="900" fill="#15803D">$14.20</text>
      <text x="16" y="86" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="bold" fill="#059669">↓ 68% vs Old Agency Site</text>

      <rect x="210" y="0" width="190" height="110" rx="12" fill="#0F172A"/>
      <text x="226" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="bold" fill="#94A3B8">NEW MONTHLY PIPELINE</text>
      <text x="226" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="24" font-weight="900" fill="#C6F24D">+$124,500</text>
      <text x="226" y="86" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF">Direct Lead Attributed</text>
    </g>
  </g>
</svg>`;

fs.writeFileSync(path.join(destDir, 'local-biz.svg'), svgLocalBiz);
fs.writeFileSync(path.join(destDir, 'b2b-web.svg'), svgB2B);
fs.writeFileSync(path.join(destDir, 'seo.svg'), svgSEO);
fs.writeFileSync(path.join(destDir, 'google-maps.svg'), svgGoogleMaps);
fs.writeFileSync(path.join(destDir, 'lead-funnels.svg'), svgLeadFunnels);

console.log('Successfully generated 5 editorial lifestyle fallback SVGs!');
