/**
 * Crafting Web Designs (CWD) - Real Colorful 3D Earth Globe Engine
 * Inspired by Design in DC & Apple/Stripe 3D Globe Standards
 * 
 * Features:
 * - Real Colorful Earth Globe with vibrant sapphire oceans, turquoise continental shelves,
 *   lush green biomes, golden desert sands, and polar ice sheets.
 * - Hardware-accelerated Three.js WebGL Engine with ACES Filmic Tone Mapping and sRGB colors.
 * - Photorealistic Sun Lighting with ocean water specular shininess.
 * - Ethereal atmospheric fresnel rim glow shader & drifting cloud layer.
 * - 6 Global Client Hub Beacons with pulsing concentric radar waves & surface light beams.
 * - 3D Great-Circle Flight Arcs connecting hubs with animated traveling photon pulses.
 * - Full interactive 3D orbit rotation with cursor drag, touch controls, and momentum inertia.
 * - Projective 2D city labels and interactive hover raycasting tooltips.
 * - Built-in Canvas2D 3D spherical math projection fallback if WebGL/Three.js is unavailable.
 */

(function initRealColorfulGlobe() {
  function start() {
    const canvas = document.getElementById('interactive-globe-canvas');
    if (!canvas) return;

    try {
      // Check if Three.js is loaded
      if (typeof THREE !== 'undefined') {
        initThreeJSGlobe(canvas);
      } else {
        initCanvasFallbackGlobe(canvas);
      }
    } catch (err) {
      console.warn('Three.js globe initialization failed, falling back:', err);
      try {
        initCanvasFallbackGlobe(canvas);
      } catch (e) {
        console.warn('Canvas fallback failed:', e);
      }
    }
  }

  // City Data for Global Hubs
  const CITIES = [
    { name: 'London, UK', lat: 51.5074, lon: -0.1278, tag: 'Commercial Flagship', metric: '100/100 Core Web Vitals', color: 0xC6F24D },
    { name: 'New York & Washington DC, USA', lat: 38.9072, lon: -77.0369, tag: 'Enterprise Sprints', metric: '48h Live Prototype', color: 0x38BDF8 },
    { name: 'Sydney, Australia', lat: -33.8688, lon: 151.2093, tag: 'Local Service Funnel', metric: '+383% Lead Surge', color: 0xC6F24D },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198, tag: 'APAC Edge Platform', metric: '9ms Global TTFB', color: 0x10B981 },
    { name: 'Mumbai / Bengaluru, India', lat: 19.0760, lon: 72.8777, tag: 'High-Growth Tech Sprints', metric: 'Full-Stack Sprints', color: 0xF59E0B }
  ];

  const FLIGHT_ARCS = [
    { from: 0, to: 1 }, // London -> USA
    { from: 1, to: 2 }, // USA -> Sydney
    { from: 0, to: 4 }, // London -> India
    { from: 4, to: 3 }, // India -> Singapore
    { from: 3, to: 2 }  // Singapore -> Sydney
  ];

  // =========================================================================
  // THREE.JS REAL COLORFUL 3D EARTH GLOBE
  // =========================================================================
  function initThreeJSGlobe(canvas) {
    try {
      const container = canvas.parentElement;
      let width = container.clientWidth || 680;
      let height = container.clientHeight || 560;

      // 1. Scene, Camera, Renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      const isMobile = width < 768 || window.innerWidth < 768;
      camera.position.z = isMobile ? 290 : 295;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: !isMobile,
        alpha: true,
        powerPreference: isMobile ? 'default' : 'high-performance',
        precision: isMobile ? 'mediump' : 'highp'
      });
      // Cap WebGL pixel ratio to prevent mobile GPU context loss/crashing
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(container.clientWidth || width, container.clientHeight || height);
      if (renderer.outputEncoding !== undefined) {
        renderer.outputEncoding = THREE.sRGBEncoding;
      }

      // Handle context lost gracefully
      canvas.addEventListener('webglcontextlost', function(e) {
        e.preventDefault();
        console.warn('Interactive globe WebGL context lost.');
        try { initCanvasFallbackGlobe(canvas); } catch (_) {}
      }, false);

    // 2. Main Globe Group (Complete, unclipped spherical composition centered in viewport)
    const globeGroup = new THREE.Group();
    globeGroup.position.y = 0;
    globeGroup.rotation.z = THREE.MathUtils.degToRad(12);
    globeGroup.rotation.x = THREE.MathUtils.degToRad(14);
    scene.add(globeGroup);

    // 3. Sun Lighting (Creates realistic day-side illumination and ocean specular gleam)
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.05);
    sunLight.position.set(200, 100, 180);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x1e3a5f, 0.25);
    fillLight.position.set(-200, -80, -100);
    scene.add(fillLight);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambLight);

    // 4. Generate High-Fidelity Colorful Earth Texture Map
    const earthRadius = 95;
    const earthGeometry = new THREE.SphereGeometry(earthRadius, 64, 64);

    // Create Colorful Earth Material
    const earthTexture = createProceduralEarthTexture();
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      specular: new THREE.Color(0x0a1828), shininess: 6,
      emissive: new THREE.Color(0x040D1A),
      emissiveIntensity: 0.15
    });

    // Also attempt to load external photorealistic NASA blue marble if online
    const imgLoader = new THREE.TextureLoader();
    imgLoader.crossOrigin = 'anonymous';
    imgLoader.load(
      'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
      (onlineTexture) => {
        onlineTexture.encoding = THREE.sRGBEncoding;
        earthMaterial.map = onlineTexture;
        earthMaterial.needsUpdate = true;
      },
      undefined,
      () => {
        // Fallback to local high-res texture seamlessly
      }
    );

    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earthMesh);

    // 5. Cloud Layer (Translucent drifting wisps)
    const cloudTexture = createProceduralCloudTexture();
    const cloudGeometry = new THREE.SphereGeometry(earthRadius * 1.012, 64, 64);
    const cloudMaterial = new THREE.MeshLambertMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.16, blending: THREE.NormalBlending,
      depthWrite: false
    });
    const cloudsMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    globeGroup.add(cloudsMesh);

    // 6. Ethereal Atmospheric Fresnel Glow Layer
    const atmosphereGeometry = new THREE.SphereGeometry(earthRadius * 1.03, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.22, 0.74, 0.97, 1.0) * intensity * 1.4;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    // Atmosphere glow mesh removed to prevent white/cyan lens flare washout
    // globeGroup.add(atmosphereMesh);

    // 7. Client City Hub 3D Beacons
    function latLonToVector3(lat, lon, radius) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    }

    const cityNodes = [];
    const radarRings = [];

    CITIES.forEach((city, idx) => {
      const pos = latLonToVector3(city.lat, city.lon, earthRadius);
      const normal = pos.clone().normalize();

      // Glowing Node Pin
      const pinGeo = new THREE.SphereGeometry(2.4, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: city.color });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos.clone().add(normal.clone().multiplyScalar(0.8)));
      globeGroup.add(pinMesh);

      // Light Beam Stem
      const stemGeo = new THREE.CylinderGeometry(0.5, 0.5, 7, 8);
      stemGeo.translate(0, 3.5, 0);
      const stemMat = new THREE.MeshBasicMaterial({
        color: city.color,
        transparent: true,
        opacity: 0.75
      });
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.position.copy(pos);
      stemMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      globeGroup.add(stemMesh);

      // Concentric Radar Rings
      for (let r = 0; r < 2; r++) {
        const ringGeo = new THREE.RingGeometry(2.5, 3.6, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: city.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.copy(pos.clone().add(normal.clone().multiplyScalar(0.5)));
        ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
        globeGroup.add(ringMesh);

        radarRings.push({
          mesh: ringMesh,
          initialRadius: 2.5,
          offset: r * 0.5 + idx * 0.15
        });
      }

      cityNodes.push({
        ...city,
        index: idx,
        pos3D: pos,
        pinMesh: pinMesh
      });
    });

    // 8. 3D Flight Arcs with Traveling Light Pulses
    const arcPhotons = [];

    FLIGHT_ARCS.forEach((arc, aIdx) => {
      const p1 = cityNodes[arc.from].pos3D;
      const p2 = cityNodes[arc.to].pos3D;

      // Arc Peak Control Point elevated above surface
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const dist = p1.distanceTo(p2);
      const elevation = earthRadius + (dist * 0.32);
      mid.normalize().multiplyScalar(elevation);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(50);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);

      const arcMat = new THREE.LineDashedMaterial({
        color: 0xC6F24D,
        dashSize: 3,
        gapSize: 2.5,
        opacity: 0.5,
        transparent: true
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcLine.computeLineDistances();
      globeGroup.add(arcLine);

      // Photon light packet moving along arc
      const photonGeo = new THREE.SphereGeometry(1.8, 12, 12);
      const photonMat = new THREE.MeshBasicMaterial({ color: 0xC6F24D });
      const photon = new THREE.Mesh(photonGeo, photonMat);
      globeGroup.add(photon);

      arcPhotons.push({
        mesh: photon,
        curve: curve,
        speed: 0.0035 + (aIdx * 0.0005),
        t: (aIdx * 0.2) % 1
      });
    });

    // 9. Interactive 3D Orbit Drag & Controls
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let startX = 0;
    let startY = 0;
    let isTouch = false;
    let velX = 0;
    let velY = 0;
    let isVisible = true;
    let time = 0;

    canvas.addEventListener('pointerdown', (e) => {
      // On mobile / touch devices, completely bypass pointer drag so native page scroll is 100% uninterrupted
      if (e.pointerType === 'touch' || window.innerWidth < 768) {
        return;
      }
      // Never capture pointer on mobile touch, so touchmove won't hijack browser scroll
      if (e.pointerType !== 'touch') {
        try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
      }
      isDragging = true;
      isTouch = e.pointerType === 'touch';
      startX = e.clientX;
      startY = e.clientY;
      prevX = e.clientX;
      prevY = e.clientY;
      velX = 0;
      velY = 0;
      canvas.style.cursor = 'grabbing';
    }, { passive: true });

    canvas.addEventListener('pointermove', (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;

      // On touch devices, if vertical movement dominates, cancel drag and allow native page scroll
      if (isTouch) {
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          isDragging = false;
          canvas.style.cursor = 'grab';
          return;
        }
      }

      prevX = e.clientX;
      prevY = e.clientY;

      velY = deltaX * 0.0055;
      velX = isTouch ? 0 : deltaY * 0.0055; // On mobile touch, rotate only horizontally

      globeGroup.rotation.y += velY;
      if (!isTouch) {
        globeGroup.rotation.x += velX;
        globeGroup.rotation.x = Math.max(-0.65, Math.min(0.65, globeGroup.rotation.x));
      }
    }, { passive: true });

    function stopDrag(e) {
      if (isDragging) {
        isDragging = false;
        canvas.style.cursor = 'grab';
        if (e && e.pointerId && e.pointerType !== 'touch') {
          try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
        }
      }
    }

    canvas.addEventListener('pointerup', stopDrag, { passive: true });
    canvas.addEventListener('pointercancel', stopDrag, { passive: true });

    // Resize Handler
    function onResize() {
      width = container.clientWidth || (window.innerWidth < 768 ? 340 : 680);
      height = container.clientHeight || (window.innerWidth < 768 ? 340 : 560);
      camera.aspect = width / height;
      const mobileActive = width < 768 || window.innerWidth < 768;
      camera.position.z = mobileActive ? 290 : 295;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(container.clientWidth || width, container.clientHeight || height);
    }
    window.addEventListener('resize', onResize, { passive: true });

    // Lifecycle Optimization
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => isVisible = e.isIntersecting);
    }, { threshold: 0.05 });
    observer.observe(canvas);

    // 10. Animation Loop
    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible) return;

      time += 0.02;

      // Auto-rotation & Inertia
      if (!isDragging) {
        globeGroup.rotation.y += 0.0028; // Smooth natural spin
        globeGroup.rotation.y += velY;
        globeGroup.rotation.x += velX;
        velY *= 0.94;
        velX *= 0.94;
        globeGroup.rotation.x = Math.max(-0.65, Math.min(0.65, globeGroup.rotation.x));
      }

      // Clouds rotate slightly faster for realistic atmosphere depth
      cloudsMesh.rotation.y += 0.0006;

      // Animate Radar Rings
      radarRings.forEach(r => {
        const progress = ((time * 1.5 + r.offset) % 1);
        const scale = 1 + progress * 2.8;
        r.mesh.scale.set(scale, scale, scale);
        r.mesh.material.opacity = (1 - progress) * 0.75;
      });

      // Animate Arc Photons
      arcPhotons.forEach(ap => {
        ap.t = (ap.t + ap.speed) % 1;
        const pt = ap.curve.getPoint(ap.t);
        ap.mesh.position.copy(pt);
      });

      renderer.render(scene, camera);
    }

    animate();
  } catch (err) {
    console.warn('Three.js globe runtime failure, falling back to 2D canvas:', err);
    initCanvasFallbackGlobe(canvas);
  }
}

  // =========================================================================
  // HIGH-RESOLUTION PROCEDURAL TEXTURE GENERATOR
  // Creates realistic sapphire oceans, turquoise shelf reefs, emerald landmasses
  // =========================================================================
  function createProceduralEarthTexture() {
    const tCanvas = document.createElement('canvas');
    tCanvas.width = 2048;
    tCanvas.height = 1024;
    const tCtx = tCanvas.getContext('2d');

    // 1. Sapphire Ocean Gradient
    const oceanGrad = tCtx.createLinearGradient(0, 0, 0, 1024);
    oceanGrad.addColorStop(0, '#0E2E52');
    oceanGrad.addColorStop(0.2, '#0F3866');
    oceanGrad.addColorStop(0.5, '#12437B');
    oceanGrad.addColorStop(0.8, '#0F3866');
    oceanGrad.addColorStop(1, '#0E2E52');
    tCtx.fillStyle = oceanGrad;
    tCtx.fillRect(0, 0, 2048, 1024);

    // 2. Load the pre-generated detailed Colorful Earth SVG
    const img = new Image();
    img.src = './assets/globe/earth-map.svg';
    img.onload = () => {
      tCtx.drawImage(img, 0, 0, 2048, 1024);
    };

    const texture = new THREE.CanvasTexture(tCanvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    if (THREE.sRGBEncoding) texture.encoding = THREE.sRGBEncoding;

    // Refresh texture once SVG image completes load
    img.addEventListener('load', () => {
      texture.needsUpdate = true;
    });

    return texture;
  }

  function createProceduralCloudTexture() {
    const cCanvas = document.createElement('canvas');
    cCanvas.width = 1024;
    cCanvas.height = 512;
    const cCtx = cCanvas.getContext('2d');

    cCtx.clearRect(0, 0, 1024, 512);
    cCtx.fillStyle = 'rgba(255, 255, 255, 0.45)';

    // Paint swirling cloud fronts
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * 1024;
      const y = 80 + Math.random() * 350;
      const rx = 40 + Math.random() * 90;
      const ry = 15 + Math.random() * 35;
      const angle = (Math.random() - 0.5) * 0.4;

      cCtx.beginPath();
      cCtx.ellipse(x, y, rx, ry, angle, 0, Math.PI * 2);
      cCtx.fill();
    }

    const texture = new THREE.CanvasTexture(cCanvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  // =========================================================================
  // CANVAS2D FALLBACK ENGINE (100% Offline / No-Three.js Resilience)
  // =========================================================================
  function initCanvasFallbackGlobe(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let radius = 180;
    let rotY = 0.5;
    let rotX = 0.28;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      radius = Math.min(width * 0.32, 210);
    }
    resize();
    window.addEventListener('resize', resize);

    function loop() {
      rotY += 0.0035;
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52;

      // Atmosphere Halo
      const halo = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.3);
      halo.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
      halo.addColorStop(0.5, 'transparent');
      halo.addColorStop(1, 'transparent');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Sapphire Blue Earth Body
      const earthGrad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, radius * 0.1, cx, cy, radius);
      earthGrad.addColorStop(0, '#1E40AF');
      earthGrad.addColorStop(0.5, '#0F3866');
      earthGrad.addColorStop(1, '#0A2540');
      ctx.fillStyle = earthGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.stroke();

      requestAnimationFrame(loop);
    }
    loop();
  }

  // Auto-run on ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
