// Animated Shader Background
export function initShaderBackground() {
  const canvas = document.getElementById('shader-canvas');
  if (!canvas) {
    console.warn('Canvas no encontrado');
    return;
  }

  const ctx = canvas.getContext('2d', { alpha: true });

  // Colors
  const colors = {
    primary: '#facc15',
    secondary: '#f59e0b',
    accent: '#eab308',
    dark: '#0f172a',
    darkMid: '#1e293b',
  };

  // Setup
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  const particles = [];
  let animationId = null;
  let time = 0;

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 120 + 80,
        opacity: Math.random() * 0.3 + 0.08,
        colorIndex: Math.floor(Math.random() * 3),
      });
    }
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  }

  function drawBackground() {
    const bgGradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    bgGradient.addColorStop(0, colors.dark);
    bgGradient.addColorStop(0.5, colors.darkMid);
    bgGradient.addColorStop(1, colors.dark);

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle noise overlay
    ctx.globalAlpha = 0.03;
    for (let i = 0; i < canvas.width; i += 5) {
      for (let j = 0; j < canvas.height; j += 5) {
        const noise = Math.random();
        ctx.fillStyle = colors.primary;
        ctx.fillRect(i, j, 5, 5);
      }
    }
    ctx.globalAlpha = 1;
  }

  function updateAndDrawParticles() {
    const colorArray = [colors.primary, colors.secondary, colors.accent];

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.opacity += (Math.random() - 0.5) * 0.02;
      p.opacity = Math.max(0.03, Math.min(0.4, p.opacity));

      // Wrap
      if (p.x < -200) p.x = canvas.width + 200;
      if (p.x > canvas.width + 200) p.x = -200;
      if (p.y < -200) p.y = canvas.height + 200;
      if (p.y > canvas.height + 200) p.y = -200;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      const rgb = hexToRgb(colorArray[p.colorIndex]);

      grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity * 2})`);
      grad.addColorStop(0.4, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity})`);
      grad.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

      ctx.fillStyle = grad;
      ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
    });
  }

  function drawAurora() {
    for (let i = 0; i < canvas.width; i += 20) {
      const y =
        canvas.height * 0.35 +
        Math.sin(i * 0.008 + time * 0.012) * 100 +
        Math.cos(i * 0.004 + time * 0.008) * 50;

      const grad = ctx.createLinearGradient(i, y - 150, i, y + 150);
      grad.addColorStop(0, 'rgba(250, 204, 21, 0)');
      grad.addColorStop(
        0.5,
        `rgba(250, 204, 21, ${0.25 + Math.sin(time * 0.01 + i * 0.01) * 0.12})`
      );
      grad.addColorStop(1, 'rgba(250, 204, 21, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(i - 10, y - 150, 20, 300);
    }
  }

  function animate() {
    time++;
    drawBackground();
    drawAurora();
    updateAndDrawParticles();
    animationId = requestAnimationFrame(animate);
  }

  // Initialize
  initParticles();
  animate();

  // Handle resize
  const handleResize = () => {
    resizeCanvas();
  };
  window.addEventListener('resize', handleResize);

  // Return cleanup function
  return () => {
    if (animationId) cancelAnimationFrame(animationId);
    window.removeEventListener('resize', handleResize);
  };
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initShaderBackground);
} else {
  initShaderBackground();
}
