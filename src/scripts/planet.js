// Monochrome interactive planet — lazy-loaded Three.js scene.
// Drag to rotate, auto-rotates when idle. Zero color: strict black & white.

export async function initPlanet(canvas) {
  const THREE = await import('three');
  const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 1.4, 12);

  // --- Lights ---
  const key = new THREE.DirectionalLight(0xffffff, 2.6);
  key.position.set(5, 3, 6);
  scene.add(key);
  scene.add(new THREE.AmbientLight(0xffffff, 0.28));
  const rim = new THREE.DirectionalLight(0xffffff, 0.9);
  rim.position.set(-6, -2, -4);
  scene.add(rim);

  // --- Procedural grayscale planet texture ---
  function makePlanetTexture() {
    const w = 1024, h = 512;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');

    // base vertical gradient: light top -> dark bottom
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#b5b5b5');
    g.addColorStop(0.45, '#8a8a8a');
    g.addColorStop(1, '#3d3d3d');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // soft latitude bands
    for (let i = 0; i < 14; i++) {
      const y = Math.random() * h;
      const bh = 8 + Math.random() * 42;
      const shade = 60 + Math.floor(Math.random() * 90);
      ctx.fillStyle = `rgba(${shade},${shade},${shade},0.28)`;
      ctx.fillRect(0, y, w, bh);
    }

    // craters / blotches
    for (let i = 0; i < 260; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 2 + Math.random() * 26;
      const shade = 40 + Math.floor(Math.random() * 120);
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(${shade},${shade},${shade},0.55)`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // fine grain
    const img = ctx.getImageData(0, 0, w, h);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * 22;
      d[i] += n; d[i + 1] += n; d[i + 2] += n;
    }
    ctx.putImageData(img, 0, 0);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  const planetGroup = new THREE.Group();
  planetGroup.position.set(0, -1.1, 0);
  scene.add(planetGroup);

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(2.1, 72, 72),
    new THREE.MeshStandardMaterial({
      map: makePlanetTexture(),
      roughness: 0.95,
      metalness: 0.05,
    })
  );
  planetGroup.add(planet);

  // --- Tilted ring (grayscale) ---
  function makeRingTexture() {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 16;
    const ctx = c.getContext('2d');
    for (let x = 0; x < 512; x++) {
      const t = x / 512;
      // banded alpha: gaps + varying density, all white
      const band = Math.sin(t * 40) * 0.5 + Math.sin(t * 13 + 1.7) * 0.5;
      const alpha = Math.max(0, 0.25 + band * 0.35) * (t > 0.08 && t < 0.94 ? 1 : 0);
      const shade = 150 + Math.floor(band * 60);
      ctx.fillStyle = `rgba(${shade},${shade},${shade},${alpha.toFixed(3)})`;
      ctx.fillRect(x, 0, 1, 16);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(2.85, 4.35, 128, 1),
    new THREE.MeshBasicMaterial({
      map: makeRingTexture(),
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
  // fix ring UVs to radial mapping
  const pos = ring.geometry.attributes.position;
  const uv = ring.geometry.attributes.uv;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const t = (v.length() - 2.85) / (4.35 - 2.85);
    uv.setXY(i, t, 0.5);
  }
  ring.rotation.x = Math.PI / 2 - 0.42;
  ring.rotation.y = 0.18;
  planetGroup.add(ring);

  // --- Orbiting moon ---
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x9a9a9a, roughness: 1 })
  );
  scene.add(moon);
  let moonAngle = 0.6;
  const moonOrbitR = 5.4;

  // --- Starfield ---
  function makeStars(count, spread, size, opacity) {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = spread * (0.55 + Math.random() * 0.45);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size,
      transparent: true,
      opacity,
      sizeAttenuation: true,
      depthWrite: false,
    });
    return new THREE.Points(geo, mat);
  }
  const stars = makeStars(1400, 46, 0.14, 0.85);
  const starsFar = makeStars(700, 70, 0.2, 0.4);
  scene.add(stars, starsFar);

  // --- Controls: drag to rotate only ---
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, -1.1, 0);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.rotateSpeed = 0.55;
  controls.autoRotate = !reduceMotion;
  controls.autoRotateSpeed = 0.7;
  controls.minPolarAngle = Math.PI * 0.28;
  controls.maxPolarAngle = Math.PI * 0.72;

  // pause auto-rotate briefly after user drags
  let resumeTimer;
  controls.addEventListener('start', () => {
    controls.autoRotate = false;
    clearTimeout(resumeTimer);
  });
  controls.addEventListener('end', () => {
    clearTimeout(resumeTimer);
    if (!reduceMotion) resumeTimer = setTimeout(() => { controls.autoRotate = true; }, 2600);
  });

  // --- Sizing ---
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (canvas.width !== Math.floor(w * renderer.getPixelRatio()) ||
        canvas.height !== Math.floor(h * renderer.getPixelRatio())) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
  }

  // --- Loop (pauses offscreen) ---
  let running = true;
  let raf = 0;
  const clock = new THREE.Clock();

  function tick() {
    if (!running) return;
    raf = requestAnimationFrame(tick);
    resize();
    const dt = Math.min(clock.getDelta(), 0.05);

    if (!reduceMotion) {
      planet.rotation.y += dt * 0.05;
      moonAngle += dt * 0.22;
      moon.position.set(
        Math.cos(moonAngle) * moonOrbitR,
        Math.sin(moonAngle * 0.9) * 0.9,
        Math.sin(moonAngle) * moonOrbitR
      );
      stars.rotation.y += dt * 0.004;
    } else {
      // static single pose for reduced motion
      moon.position.set(
        Math.cos(moonAngle) * moonOrbitR, 0.4, Math.sin(moonAngle) * moonOrbitR
      );
    }

    controls.update();
    renderer.render(scene, camera);
  }

  const vis = new IntersectionObserver((entries) => {
    const visNow = entries[0].isIntersecting;
    if (visNow && !running) { running = true; clock.getDelta(); tick(); }
    else if (!visNow && running) { running = false; cancelAnimationFrame(raf); }
  }, { threshold: 0 });
  vis.observe(canvas);

  window.addEventListener('resize', resize);
  resize();
  tick();

  return () => {
    vis.disconnect();
    running = false;
    cancelAnimationFrame(raf);
    controls.dispose();
    renderer.dispose();
  };
}
