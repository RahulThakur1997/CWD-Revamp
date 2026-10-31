const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, '..', 'assets', 'globe');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Generate high-resolution 2048x1024 Equirectangular Colorful Earth Map SVG
const width = 2048;
const height = 1024;

// Helper to convert lat/lon to SVG x/y
function toCoord(lon, lat) {
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}

// Convert poly points array to SVG path
function polyToPath(pts) {
  return 'M ' + pts.map(p => toCoord(p[0], p[1])).join(' L ') + ' Z';
}

// 1. Detailed Continental Outlines & Realistic Biome Polygons
// North America
const northAmericaGreen = [
  [-168, 65], [-160, 71], [-140, 70], [-125, 69], [-100, 68], [-80, 72], [-65, 60],
  [-55, 52], [-60, 44], [-70, 42], [-75, 35], [-81, 25], [-88, 30], [-97, 26],
  [-97, 18], [-85, 14], [-77, 8], [-82, 8], [-92, 16], [-105, 20], [-110, 30],
  [-118, 34], [-124, 40], [-125, 49], [-135, 57], [-150, 60], [-165, 60]
];

const northAmericaPlains = [
  [-112, 49], [-100, 49], [-95, 45], [-92, 38], [-95, 30], [-102, 30], [-108, 35], [-112, 42]
];

const northAmericaDesert = [
  [-118, 36], [-110, 36], [-103, 30], [-105, 23], [-112, 24], [-116, 30]
];

// Greenland (Glacial Ice)
const greenland = [
  [-55, 60], [-45, 60], [-35, 65], [-20, 70], [-18, 77], [-22, 82], [-40, 83], [-55, 82], [-70, 76], [-58, 68]
];

// South America
const southAmericaAmazon = [
  [-77, 8], [-60, 10], [-50, 4], [-35, -5], [-35, -10], [-40, -18], [-48, -25],
  [-55, -22], [-65, -18], [-72, -12], [-78, -2], [-80, 4]
];

const southAmericaPampas = [
  [-48, -25], [-52, -32], [-58, -38], [-65, -45], [-68, -54], [-74, -52], [-73, -42],
  [-71, -30], [-68, -22], [-55, -22]
];

const andesRidge = [
  [-77, 8], [-80, 2], [-78, -8], [-72, -16], [-70, -25], [-72, -35], [-74, -46],
  [-75, -53], [-70, -52], [-68, -42], [-68, -30], [-66, -18], [-72, -8], [-75, 2]
];

// Europe & British Isles
const britishIsles = [
  [-10, 52], [-5, 50], [1.5, 51], [1.8, 53], [0, 58], [-3, 58.5], [-5, 56], [-8, 55], [-10, 53]
];

const ireland = [
  [-10.5, 51.5], [-6, 52], [-5.5, 54.5], [-8, 55], [-10.5, 54]
];

const europeMain = [
  [-9, 36], [-8, 43], [-1, 44], [-2, 47], [3, 51], [8, 54], [10, 57], [13, 55],
  [20, 55], [25, 60], [30, 60], [32, 50], [28, 42], [24, 38], [16, 38], [12, 44],
  [5, 43], [3, 42], [0, 38], [-5, 36]
];

const scandinavia = [
  [5, 58], [10, 58], [12, 56], [16, 56], [22, 60], [28, 65], [30, 70], [25, 71],
  [18, 69], [12, 65], [5, 62]
];

// Africa
const africaSahara = [
  [-17, 28], [-12, 33], [0, 36], [10, 37], [12, 32], [25, 32], [32, 31], [34, 28],
  [38, 22], [42, 13], [35, 12], [20, 14], [10, 13], [0, 12], [-14, 12], [-17, 20]
];

const africaJungle = [
  [-14, 12], [0, 12], [10, 13], [20, 14], [30, 5], [28, -5], [20, -10],
  [12, -6], [9, 4], [0, 5], [-8, 4], [-14, 8]
];

const africaSouth = [
  [12, -6], [20, -10], [28, -5], [32, -18], [35, -24], [30, -31], [26, -34],
  [18, -34], [14, -28], [12, -18]
];

const madagascar = [
  [44, -12], [50, -14], [48, -25], [44, -25], [43, -18]
];

// Eurasia & Asia
const eurasiaTaiga = [
  [30, 60], [45, 60], [60, 58], [80, 58], [100, 60], [130, 62], [160, 65], [170, 65],
  [180, 68], [170, 72], [140, 74], [100, 76], [70, 73], [45, 70], [30, 70]
];

const middleEast = [
  [35, 32], [44, 37], [52, 36], [60, 30], [58, 24], [55, 18], [45, 13], [42, 15],
  [38, 28], [35, 30]
];

const india = [
  [68, 24], [72, 32], [78, 35], [88, 28], [92, 24], [88, 20], [80, 13], [77, 8],
  [75, 14], [72, 18]
];

const tibetHimalayas = [
  [75, 35], [85, 36], [95, 35], [98, 30], [90, 28], [82, 28], [76, 32]
];

const eastAsia = [
  [98, 30], [105, 38], [120, 42], [128, 42], [125, 32], [120, 25], [110, 20],
  [105, 22], [98, 26]
];

const japan = [
  [130, 32], [132, 34], [136, 36], [141, 42], [144, 44], [141, 45], [138, 38], [132, 33]
];

const southeastAsia = [
  [98, 15], [105, 18], [108, 12], [105, 5], [100, 5], [98, 10]
];

const indonesia = [
  [95, 4], [105, -5], [115, -8], [125, -8], [140, -3], [135, 0], [120, 0], [105, 0]
];

// Australia & Oceania
const australiaOutback = [
  [120, -20], [134, -20], [140, -24], [138, -30], [128, -32], [120, -28]
];

const australiaCoast = [
  [114, -22], [122, -15], [130, -12], [136, -12], [142, -11], [148, -19], [153, -28],
  [150, -36], [145, -38], [136, -35], [125, -34], [115, -34], [113, -28]
];

const newZealand = [
  [168, -46], [174, -42], [178, -38], [175, -36], [172, -41], [167, -45]
];

// Antarctica (Polar Ice)
const antarctica = [
  [-180, -75], [-120, -75], [-60, -65], [0, -70], [60, -68], [120, -68], [180, -75],
  [180, -90], [-180, -90]
];

// Create the complete SVG
const svgMap = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <!-- Ocean Deep Gradient -->
    <linearGradient id="oceanDeep" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0E2E52"/>
      <stop offset="25%" stop-color="#0F3866"/>
      <stop offset="50%" stop-color="#12437B"/>
      <stop offset="75%" stop-color="#0F3866"/>
      <stop offset="100%" stop-color="#0E2E52"/>
    </linearGradient>

    <!-- Turquoise Coastal Shelf Blur Filter -->
    <filter id="coastalGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="14" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>

    <!-- Cloud Soft Blur -->
    <filter id="cloudSoft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8"/>
    </filter>
  </defs>

  <!-- 1. DEEP SAPPHIRE OCEANS -->
  <rect width="${width}" height="${height}" fill="url(#oceanDeep)"/>

  <!-- Subtle Ocean Latitude Waves -->
  <path d="M0,150 Q512,140 1024,150 T2048,150" stroke="#164E8C" stroke-width="40" fill="none" opacity="0.4"/>
  <path d="M0,450 Q512,460 1024,450 T2048,450" stroke="#164E8C" stroke-width="50" fill="none" opacity="0.3"/>
  <path d="M0,750 Q512,740 1024,750 T2048,750" stroke="#164E8C" stroke-width="40" fill="none" opacity="0.4"/>

  <!-- 2. TURQUOISE CONTINENTAL SHELF REEFS (Lush glowing water rim around coasts) -->
  <g fill="#00B4D8" opacity="0.45" filter="url(#coastalGlow)">
    <path d="${polyToPath(northAmericaGreen)}"/>
    <path d="${polyToPath(southAmericaAmazon)}"/>
    <path d="${polyToPath(europeMain)}"/>
    <path d="${polyToPath(britishIsles)}"/>
    <path d="${polyToPath(africaJungle)}"/>
    <path d="${polyToPath(africaSahara)}"/>
    <path d="${polyToPath(india)}"/>
    <path d="${polyToPath(eastAsia)}"/>
    <path d="${polyToPath(australiaCoast)}"/>
    <path d="${polyToPath(indonesia)}"/>
    <path d="${polyToPath(japan)}"/>
  </g>

  <!-- 3. REALISTIC COLORFUL CONTINENTS & BIOMES -->
  
  <!-- Antarctica Polar Ice -->
  <path d="${polyToPath(antarctica)}" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2"/>

  <!-- Greenland Glacier -->
  <path d="${polyToPath(greenland)}" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="2"/>

  <!-- North America (Lush East & Pacific NW) -->
  <path d="${polyToPath(northAmericaGreen)}" fill="#2D6A4F"/>
  <!-- North America Great Plains (Golden Wheat) -->
  <path d="${polyToPath(northAmericaPlains)}" fill="#B58444"/>
  <!-- North America Desert (Terracotta Sand) -->
  <path d="${polyToPath(northAmericaDesert)}" fill="#D97706"/>

  <!-- South America (Amazon Basin - Deep Forest Emerald) -->
  <path d="${polyToPath(southAmericaAmazon)}" fill="#15803D"/>
  <!-- South America (Pampas - Olive Steppe) -->
  <path d="${polyToPath(southAmericaPampas)}" fill="#854D0E"/>
  <!-- Andes Spine (Mountain Ridge) -->
  <path d="${polyToPath(andesRidge)}" fill="#573D26"/>

  <!-- Europe & UK (Vibrant Meadow Greens) -->
  <path d="${polyToPath(europeMain)}" fill="#2D6A4F"/>
  <path d="${polyToPath(scandinavia)}" fill="#1B4332"/>
  <path d="${polyToPath(britishIsles)}" fill="#16A34A"/>
  <path d="${polyToPath(ireland)}" fill="#22C55E"/>

  <!-- Africa (Sahara Desert - Golden Sand Dunes) -->
  <path d="${polyToPath(africaSahara)}" fill="#D97706"/>
  <!-- Africa (Congo Jungle - Deep Emerald) -->
  <path d="${polyToPath(africaJungle)}" fill="#166534"/>
  <!-- Africa (Savannah & South) -->
  <path d="${polyToPath(africaSouth)}" fill="#65A30D"/>
  <path d="${polyToPath(madagascar)}" fill="#15803D"/>

  <!-- Eurasia Boreal Taiga (Deep Forest Pine) -->
  <path d="${polyToPath(eurasiaTaiga)}" fill="#1B4332"/>

  <!-- Middle East (Golden Sand) -->
  <path d="${polyToPath(middleEast)}" fill="#CA8A04"/>

  <!-- India (Vibrant Monsoon Green) -->
  <path d="${polyToPath(india)}" fill="#16A34A"/>

  <!-- Tibetan Plateau & Himalayas (Snow-Capped White) -->
  <path d="${polyToPath(tibetHimalayas)}" fill="#E2E8F0"/>
  <!-- Mountain Snow Crests -->
  <polygon points="${toCoord(78, 32)} ${toCoord(84, 30)} ${toCoord(90, 30)}" fill="#FFFFFF"/>

  <!-- East Asia (Temperate Green) -->
  <path d="${polyToPath(eastAsia)}" fill="#2D6A4F"/>
  <path d="${polyToPath(japan)}" fill="#15803D"/>

  <!-- Southeast Asia Tropical Archipelagos -->
  <path d="${polyToPath(southeastAsia)}" fill="#10B981"/>
  <path d="${polyToPath(indonesia)}" fill="#10B981"/>

  <!-- Australia (Coastal Eucalyptus Green) -->
  <path d="${polyToPath(australiaCoast)}" fill="#4D7C0F"/>
  <!-- Australia (Red Centre / Outback - Famous Terracotta Ochre) -->
  <path d="${polyToPath(australiaOutback)}" fill="#C2410C"/>
  <!-- Great Barrier Reef Coral Cyan -->
  <path d="M ${toCoord(144, -13)} Q ${toCoord(148, -20)} ${toCoord(153, -24)}" stroke="#06B6D4" stroke-width="8" fill="none" opacity="0.8"/>
  <path d="${polyToPath(newZealand)}" fill="#16A34A"/>

  <!-- 4. REALISTIC SOFT CLOUD FORMATIONS & WEATHER SWIRLS -->
  <g fill="#FFFFFF" opacity="0.32" filter="url(#cloudSoft)">
    <!-- Intertropical Convergence Zone (Equatorial cloud band) -->
    <path d="M0,512 Q300,500 600,520 T1200,510 T1800,525 T2048,512" stroke="#FFFFFF" stroke-width="26" fill="none"/>
    
    <!-- North Atlantic Weather Spiral -->
    <path d="M ${toCoord(-45, 45)} Q ${toCoord(-30, 55)} ${toCoord(-15, 50)} T ${toCoord(5, 58)}" stroke="#FFFFFF" stroke-width="34" fill="none"/>
    <ellipse cx="${(toCoord(-35, 48)).split(',')[0]}" cy="${(toCoord(-35, 48)).split(',')[1]}" rx="65" ry="35" transform="rotate(-20 800 240)"/>

    <!-- North Pacific Cloud Swirl -->
    <path d="M ${toCoord(-160, 42)} Q ${toCoord(-140, 50)} ${toCoord(-125, 45)}" stroke="#FFFFFF" stroke-width="32" fill="none"/>

    <!-- Southern Ocean Roaring Forties Cloud Bands -->
    <path d="M0,760 Q500,750 1000,770 T2048,760" stroke="#FFFFFF" stroke-width="36" fill="none"/>
    <path d="M0,820 Q400,830 900,815 T2048,825" stroke="#FFFFFF" stroke-width="28" fill="none"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(destDir, 'earth-map.svg'), svgMap);
console.log('Successfully generated high-resolution colorful Earth map SVG!');
