// Hero component - handles hero animations and interactions
export function initHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Initialize typed text
  initTypedText();
  
  // Initialize parallax effect
  initParallax();
  
  // Initialize scroll indicator
  initScrollIndicator();
  
  // Initialize floating orbs
  initFloatingOrbs();
}

function initTypedText() {
  const typedElement = document.querySelector('.typed-text');
  if (!typedElement) return;

  const texts = [
    'Imed Bouzidi',
    'Software Engineer',
    'AI Enthusiast',
    'Full-Stack Developer',
    'Problem Solver'
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typedElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pause before next
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing animation
  type();
}

function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  const heroVisual = document.querySelector('.hero-visual');
  const heroBg = document.querySelector('.hero-bg');
  
  if (!heroContent) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const heroHeight = hero?.offsetHeight || window.innerHeight;
    const progress = Math.min(scrollY / heroHeight, 1);
    
    // Parallax for content
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
      heroContent.style.opacity = 1 - progress * 1.5;
    }

    // Parallax for visual
    if (heroVisual) {
      heroVisual.style.transform = `translateY(${scrollY * 0.15}px) scale(${1 - progress * 0.1})`;
    }

    // Parallax for background
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Mouse move parallax for hero visual
  if (heroVisual) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      heroVisual.style.transform += ` translate(${x * 30}px, ${y * 30}px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });

    hero.addEventListener('mouseleave', () => {
      heroVisual.style.transform = heroVisual.style.transform.replace(/ translate\([^)]+\)/, '');
    });
  }

  return () => window.removeEventListener('scroll', onScroll);
}

function initScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (!scrollIndicator) return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  let ticking = false;

  function updateVisibility() {
    const heroBottom = hero.getBoundingClientRect().bottom;
    const viewportHeight = window.innerHeight;
    
    if (heroBottom < viewportHeight * 0.5) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.pointerEvents = 'none';
    } else {
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.pointerEvents = 'auto';
    }
    
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateVisibility);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateVisibility();

  // Click to scroll to next section
  scrollIndicator.addEventListener('click', () => {
    const nextSection = document.querySelector('#about, #services, section:not(.hero)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return () => window.removeEventListener('scroll', onScroll);
}

function initFloatingOrbs() {
  const orbs = document.querySelectorAll('.hero-orb');
  
  orbs.forEach((orb, index) => {
    // Randomize animation duration slightly
    const duration = 6 + index * 1.5 + Math.random() * 2;
    orb.style.animationDuration = `${duration}s`;
    orb.style.animationDelay = `${index * 1.5}s`;
  });
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHero);
} else {
  initHero();
}