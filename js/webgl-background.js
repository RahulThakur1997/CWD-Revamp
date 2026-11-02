/**
 * Crafting Web Designs (CWD) - High-Performance WebGL Refractive Grid Engine
 * Inspired by Jaleed Studio / Refractive Distortion standard.
 * Features:
 * - Liquid-like lens displacement with smooth spring lerp physics
 * - Chromatic aberration (RGB splitting at refraction boundaries)
 * - Dot-matrix and architectural micro-grid with coordinate warping
 * - Click shockwave ripples
 * - Obsidian charcoal base palette with electric lime (#C6F24D) aura
 * - Automatic fallback to high-fidelity 2D Canvas if WebGL is unavailable
 */

class WebGLRefractiveBackground {
  constructor(canvasId = 'webgl-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.warn(`Canvas with id "${canvasId}" not found.`);
      return;
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    this.dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5);
    this.time = 0;
    this.isRunning = false;

    // Physics state
    this.mouse = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.35,
      targetX: window.innerWidth * 0.5,
      targetY: window.innerHeight * 0.35,
      prevX: window.innerWidth * 0.5,
      prevY: window.innerHeight * 0.35,
      vx: 0,
      vy: 0,
      velocity: 0,
      targetVelocity: 0,
      hoverStrength: 0.0,
      targetHoverStrength: 0.85
    };

    // Click ripple state [x, y, timestamp, strength]
    this.ripple = { x: -1000, y: -1000, time: -10, strength: 0 };

    this.init();
  }

  init() {
    try {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      this.gl = this.canvas.getContext('webgl', {
        powerPreference: isMobile ? 'default' : 'high-performance',
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false
      }) || this.canvas.getContext('experimental-webgl');

      if (!this.gl) {
        console.warn('WebGL not supported. Initializing Canvas2D fallback.');
        this.initCanvasFallback();
        return;
      }

      // Handle context lost gracefully without black screen freeze
      this.canvas.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        console.warn('Hero WebGL background context lost. Recovering with fallback.');
        this.isRunning = false;
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        try { this.initCanvasFallback(); } catch (_) {}
      }, false);

      this.initShaders();
      this.initBuffers();
      this.bindEvents();
      this.resize();
      this.start();
    } catch (err) {
      console.warn('Hero WebGL background init error, falling back:', err);
      try { this.initCanvasFallback(); } catch (_) {}
    }
  }

  initShaders() {
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 v_uv;

      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_velocity;
      uniform vec4 u_ripple;
      uniform float u_hover_strength;
      uniform float u_dpr;

      // Pseudo-random noise for velvet film grain
      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      // Compute sample grid dot brightness
      float sampleDot(vec2 p, float spacing) {
        vec2 cell = mod(p, spacing) - (spacing * 0.5);
        float d = length(cell);
        return 1.0 - smoothstep(1.0 * u_dpr, 2.4 * u_dpr, d);
      }

      // Compute fine micro-grid lines
      float sampleLines(vec2 p, float spacing) {
        vec2 cell = abs(mod(p, spacing) - (spacing * 0.5));
        float lineDist = min(cell.x, cell.y);
        return 1.0 - smoothstep(0.0, 1.0 * u_dpr, lineDist);
      }

      // Compute crosshair glyphs at major grid points
      float sampleCrosshair(vec2 p, float spacing) {
        vec2 cell = mod(p, spacing) - (spacing * 0.5);
        vec2 d = abs(cell);
        float crossArm = 6.0 * u_dpr;
        float thickness = 1.0 * u_dpr;
        float hLine = step(d.y, thickness) * step(d.x, crossArm);
        float vLine = step(d.x, thickness) * step(d.y, crossArm);
        return max(hLine, vLine);
      }

      void main() {
        vec2 coord = gl_FragCoord.xy;
        vec2 toMouse = coord - u_mouse;
        float distToMouse = length(toMouse);

        // --- Selective Zone Masking ---
        // 1. Reading Center Dampening: Softly damps cursor displacement directly over the center headline text
        vec2 readingCenter = vec2(0.5, 0.68);
        vec2 toReading = (v_uv - readingCenter) * vec2(1.0, 1.4);
        float readingDist = length(toReading);
        // textDamp is 0.15 in the center text zone and smoothly reaches 1.0 on outer flanks and perimeter
        float textDamp = smoothstep(0.18, 0.45, readingDist);

        // 2. Vertical Marquee Cutoff: Cleanly fades out the canvas above the marquee cards
        float marqueeCutoff = smoothstep(0.35, 0.52, v_uv.y);

        float activeDistortion = textDamp * marqueeCutoff;

        // --- Liquid Refractive Lens Physics ---
        float radius = 230.0 * u_dpr;
        float normalizedDist = distToMouse / radius;
        vec2 refractOffset = vec2(0.0);

        if (distToMouse < radius && activeDistortion > 0.01) {
          float q = 1.0 - normalizedDist;
          float lens = sin(q * 3.14159265 * 0.5);
          float rippleWave = sin(normalizedDist * 16.0 - u_time * 4.5) * exp(-normalizedDist * 2.2);
          
          float amp = (32.0 * u_dpr) * (0.7 + u_velocity * 0.8) * u_hover_strength;
          vec2 dir = normalize(toMouse + vec2(0.0001));
          refractOffset = -dir * (lens * amp + rippleWave * 8.0 * u_dpr * u_hover_strength) * activeDistortion;
        }

        // --- Dynamic Click Ripple Shockwave ---
        float clickAge = u_time - u_ripple.z;
        if (clickAge > 0.0 && clickAge < 2.5 && activeDistortion > 0.01) {
          vec2 toClick = coord - u_ripple.xy;
          float distClick = length(toClick);
          float shockRadius = clickAge * 520.0 * u_dpr;
          float ringDist = abs(distClick - shockRadius);
          float ringWidth = 70.0 * u_dpr;
          
          if (ringDist < ringWidth) {
            float decay = exp(-clickAge * 1.8) * u_ripple.w;
            float wave = sin((ringDist / ringWidth) * 3.14159265) * cos(ringDist * 0.15);
            vec2 clickDir = normalize(toClick + vec2(0.0001));
            refractOffset += clickDir * wave * 25.0 * u_dpr * decay * activeDistortion;
          }
        }

        // --- Chromatic Aberration Offsets (Refraction Dispersion) ---
        vec2 coordR = coord + refractOffset * 1.08;
        vec2 coordG = coord + refractOffset * 1.00;
        vec2 coordB = coord + refractOffset * 0.92;

        float spacing = 44.0 * u_dpr;
        float majorSpacing = spacing * 4.0;

        // Sample dots with chromatic separation
        float dotR = sampleDot(coordR, spacing);
        float dotG = sampleDot(coordG, spacing);
        float dotB = sampleDot(coordB, spacing);

        // Sample lines & crosshairs
        float lineG = sampleLines(coordG, spacing);
        float crossG = sampleCrosshair(coordG, majorSpacing);

        // --- Color Grading & Palette Construction ---
        // Obsidian Charcoal #09090B
        vec3 colBase = vec3(0.0353, 0.0353, 0.0431);

        // Deep radial background gradient (subtle top illumination)
        vec2 glowCenter = vec2(u_resolution.x * 0.5, u_resolution.y * 0.85);
        float dGlow = length(coord - glowCenter) / max(u_resolution.x, u_resolution.y);
        vec3 ambientGlow = vec3(0.055, 0.065, 0.050) * exp(-dGlow * 1.8);
        colBase += ambientGlow;

        // Electric lime (#C6F24D) aura under the interactive cursor
        vec3 limeColor = vec3(0.776, 0.949, 0.302);
        float cursorAura = exp(-(distToMouse * distToMouse) / (2.0 * 250.0 * 250.0 * u_dpr * u_dpr)) * u_hover_strength * activeDistortion;
        colBase += limeColor * cursorAura * 0.09;

        // Base grid dot tint (crisp platinum zinc)
        vec3 dotBaseColor = vec3(0.38, 0.40, 0.44);
        
        // At the lens distortion rim, illuminate dots with electric lime highlight
        float lensDistortMag = length(refractOffset) / (30.0 * u_dpr + 0.001);
        vec3 activeDotColor = mix(dotBaseColor, limeColor * 1.35, clamp(lensDistortMag * 1.5, 0.0, 1.0));

        // Composite chromatic dots with vertical fade towards marquee
        vec3 dotColor = vec3(
          dotR * activeDotColor.r,
          dotG * activeDotColor.g,
          dotB * activeDotColor.b
        ) * marqueeCutoff;

        // Composite micro-grid lines & crosshairs
        vec3 lineCol = vec3(0.12, 0.14, 0.16) * lineG * marqueeCutoff;
        vec3 crossCol = mix(vec3(0.24, 0.26, 0.28), limeColor * 0.65, clamp(lensDistortMag, 0.0, 1.0)) * crossG * marqueeCutoff;

        vec3 finalColor = colBase + (dotColor * 0.95) + lineCol + crossCol;

        // Subtle film grain for organic, tactile analog depth
        float grain = (hash(coord + vec2(u_time * 12.0)) - 0.5) * 0.016;
        finalColor += grain;

        // Vignette at edges
        vec2 uvCenter = abs(v_uv - 0.5) * 2.0;
        float vignette = 1.0 - dot(uvCenter, uvCenter) * 0.22;
        finalColor *= clamp(vignette, 0.0, 1.0);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const gl = this.gl;
    const vs = this.compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = this.compileShader(gl.FRAGMENT_SHADER, fsSource);

    this.program = gl.createProgram();
    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error('Shader Link Error:', gl.getProgramInfoLog(this.program));
      return;
    }

    gl.useProgram(this.program);

    // Cache uniform locations
    this.uniforms = {
      resolution: gl.getUniformLocation(this.program, 'u_resolution'),
      time: gl.getUniformLocation(this.program, 'u_time'),
      mouse: gl.getUniformLocation(this.program, 'u_mouse'),
      velocity: gl.getUniformLocation(this.program, 'u_velocity'),
      ripple: gl.getUniformLocation(this.program, 'u_ripple'),
      hoverStrength: gl.getUniformLocation(this.program, 'u_hover_strength'),
      dpr: gl.getUniformLocation(this.program, 'u_dpr')
    };
  }

  compileShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader Compile Error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  initBuffers() {
    const gl = this.gl;
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0
    ]);

    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(this.program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  }

  bindEvents() {
    const onPointerMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      // If hero canvas is scrolled out of viewport, skip coordinate updates to avoid velocity spikes
      if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;

      const rawX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth * 0.5);
      const rawY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight * 0.35);

      this.mouse.targetX = rawX - rect.left;
      this.mouse.targetY = rawY - rect.top;
      this.mouse.targetHoverStrength = 1.0;
    };

    const onPointerLeave = () => {
      this.mouse.targetHoverStrength = 0.45;
    };

    const onPointerDown = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;

      const rawX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth * 0.5);
      const rawY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight * 0.35);

      this.triggerRipple(rawX, rawY, 1.0);
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchstart', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('mousedown', onPointerDown, { passive: true });

    // Exclude headline & reading text from hover displacement
    const readingZone = document.querySelector('.hero-inner');
    if (readingZone) {
      readingZone.addEventListener('mouseenter', () => {
        this.mouse.targetHoverStrength = 0.0;
      });
      readingZone.addEventListener('mouseleave', () => {
        this.mouse.targetHoverStrength = 0.85;
      });
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.resize(), 100);
    });
  }

  triggerRipple(clientX, clientY, strength = 1.0) {
    const rect = this.canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * this.dpr;
    const y = (this.height - (clientY - rect.top)) * this.dpr;
    this.ripple = {
      x,
      y,
      time: this.time,
      strength
    };
  }

  resize() {
    const parent = this.canvas.parentElement;
    const rect = parent ? parent.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
    const newWidth = Math.max(rect.width, window.innerWidth);
    const newHeight = Math.max(rect.height, window.innerHeight * 0.85);

    // On mobile devices, ignore vertical-only resize events caused by dynamic address bar expansion/retraction
    const isMobile = window.innerWidth < 768;
    if (isMobile && this.width && Math.abs(newWidth - this.width) < 8 && this.height && Math.abs(newHeight - this.height) < 140) {
      return;
    }

    this.width = newWidth;
    this.height = newHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5);

    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);

    if (this.gl) {
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  updatePhysics(dt) {
    // Smooth spring lerp for cursor
    const lerpFactor = 0.085;
    this.mouse.prevX = this.mouse.x;
    this.mouse.prevY = this.mouse.y;

    // Idle drifting when user is not moving
    const idleNoiseX = Math.sin(this.time * 0.6) * 15;
    const idleNoiseY = Math.cos(this.time * 0.8) * 15;

    this.mouse.x += (this.mouse.targetX + idleNoiseX - this.mouse.x) * lerpFactor;
    this.mouse.y += (this.mouse.targetY + idleNoiseY - this.mouse.y) * lerpFactor;

    // Velocity computation
    const dx = this.mouse.x - this.mouse.prevX;
    const dy = this.mouse.y - this.mouse.prevY;
    const speed = Math.hypot(dx, dy);
    this.mouse.targetVelocity = Math.min(speed / 12.0, 2.5);
    this.mouse.velocity += (this.mouse.targetVelocity - this.mouse.velocity) * 0.12;

    // Hover strength interpolation
    this.mouse.hoverStrength += (this.mouse.targetHoverStrength - this.mouse.hoverStrength) * 0.05;
  }

  render(timestamp) {
    if (!this.isRunning) return;

    const t = timestamp * 0.001;
    const dt = Math.min(t - (this.lastTime || t), 0.1);
    this.lastTime = t;
    this.time = t;

    this.updatePhysics(dt);

    const gl = this.gl;
    if (gl && this.program) {
      gl.useProgram(this.program);

      // WebGL coordinates have origin at bottom-left
      const mouseX = this.mouse.x * this.dpr;
      const mouseY = (this.height - this.mouse.y) * this.dpr;

      gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
      gl.uniform1f(this.uniforms.time, this.time);
      gl.uniform2f(this.uniforms.mouse, mouseX, mouseY);
      gl.uniform1f(this.uniforms.velocity, this.mouse.velocity);
      gl.uniform4f(
        this.uniforms.ripple,
        this.ripple.x,
        this.ripple.y,
        this.ripple.time,
        this.ripple.strength
      );
      gl.uniform1f(this.uniforms.hoverStrength, this.mouse.hoverStrength);
      gl.uniform1f(this.uniforms.dpr, this.dpr);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    requestAnimationFrame((t) => this.render(t));
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    requestAnimationFrame((t) => this.render(t));
  }

  stop() {
    this.isRunning = false;
  }

  // Graceful Canvas2D Fallback if WebGL is disabled or blocked
  initCanvasFallback() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    this.bindEvents();
    this.resize();

    const drawFallback = (t) => {
      this.time = t * 0.001;
      this.updatePhysics(0.016);

      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, this.width, this.height);

      // Radial mouse glow
      const grad = ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 10,
        this.mouse.x, this.mouse.y, 220
      );
      grad.addColorStop(0, 'rgba(198, 242, 77, 0.09)');
      grad.addColorStop(1, 'rgba(9, 9, 11, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, this.width, this.height);

      // Grid of dots with distortion (strictly peripheral, clean reading center & marquee)
      const spacing = 44;
      const maxY = this.height * 0.55;
      const centerX = this.width * 0.5;
      const centerY = this.height * 0.30;
      for (let x = 0; x < this.width; x += spacing) {
        for (let y = 0; y < maxY; y += spacing) {
          const dCenter = Math.hypot((x - centerX), (y - centerY) * 1.4);
          if (dCenter < 240) continue; // Clean reading zone mask
          const fade = Math.min(1.0, (dCenter - 240) / 180.0) * (1.0 - (y / maxY));
          const dx = x - this.mouse.x;
          const dy = y - this.mouse.y;
          const dist = Math.hypot(dx, dy);
          let px = x;
          let py = y;
          if (dist < 180 && this.mouse.hoverStrength > 0.05) {
            const factor = (1.0 - dist / 180.0) * 16.0 * this.mouse.hoverStrength;
            px -= (dx / dist) * factor;
            py -= (dy / dist) * factor;
          }
          ctx.fillStyle = `rgba(255, 255, 255, ${0.30 * fade})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(drawFallback);
    };

    requestAnimationFrame(drawFallback);
  }
}

// Export for module or global use
if (typeof window !== 'undefined') {
  window.WebGLRefractiveBackground = WebGLRefractiveBackground;
}
