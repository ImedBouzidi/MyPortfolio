// Particle system for hero background
export function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId = null;
  let mouse = { x: null, y: null };
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;

  // Configuration
  const config = {
    particleCount: 80,
    maxDistance: 150,
    mouseInfluence: 100,
    particleSize: { min: 1, max: 3 },
    speed: { min: 0.2, max: 0.8 },
    color: 'rgba(14, 165, 233, 0.6)',
    lineColor: 'rgba(14, 165, 233, 0.15)'
  };

  // Adjust for dark/light mode
  function updateColors() {
    const isLight = document.documentElement.classList.contains('light');
    if (isLight) {
      config.color = 'rgba(2, 132, 199, 0.5)';
      config.lineColor = 'rgba(2, 132, 199, 0.1)';
    } else {
      config.color = 'rgba(14, 165, 233, 0.6)';
      config.lineColor = 'rgba(14, 165, 233, 0.15)';
    }
  }

  // Particle class
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * (config.particleSize.max - config.particleSize.min) + config.particleSize.min;
      this.speedX = (Math.random() - 0.5) * config.speed.max;
      this.speedY = (Math.random() - 0.5) * config.speed.max;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      // Move
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < config.mouseInfluence) {
          const force = (config.mouseInfluence - dist) / config.mouseInfluence;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }
      }

      // Wrap around edges
      if (this.x < -50) this.x = width + 50;
      if (this.x > width + 50) this.x = -50;
      if (this.y < -50) this.y = height + 50;
      if (this.y > height + 50) this.y = -50;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = config.color.replace('0.6', this.opacity.toString());
      ctx.fill();
    }
  }

  // Initialize particles
  function init() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }

    updateColors();
  }

  // Draw connections between particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.maxDistance) {
          const opacity = (1 - dist / config.maxDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = config.lineColor.replace('0.15', opacity.toString());
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    drawConnections();
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    animationId = requestAnimationFrame(animate);
  }

  // Mouse tracking
  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function onMouseLeave() {
    mouse.x = null;
    mouse.y = null;
  }

  // Resize handler
  let resizeTimeout = null;
  function onResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      cancelAnimationFrame(animationId);
      init();
      animate();
    }, 100);
  }

  // Theme change handler
  function onThemeChange() {
    updateColors();
  }

  // Event listeners
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseleave', onMouseLeave);
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('themechange', onThemeChange);

  // Start
  init();
  animate();

  // Reduced motion check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    cancelAnimationFrame(animationId);
    // Draw static particles
    ctx.clearRect(0, 0, width, height);
    particles.forEach(particle => particle.draw());
    drawConnections();
  }

  // Cleanup
  return () => {
    cancelAnimationFrame(animationId);
    canvas.removeEventListener('mousemove', onMouseMove);
    canvas.removeEventListener('mouseleave', onMouseLeave);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('themechange', onThemeChange);
  };
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initParticles);
} else {
  initParticles();
}