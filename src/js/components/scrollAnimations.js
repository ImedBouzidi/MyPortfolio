// Scroll animations using IntersectionObserver
export function initScrollAnimations() {
  // Default reveal elements
  const revealElements = document.querySelectorAll('.reveal:not(.reveal-initialized)');
  
  revealElements.forEach(el => {
    el.classList.add('reveal-initialized');
    
    // Add default animation class if not present
    if (!el.classList.contains('reveal-up') && 
        !el.classList.contains('reveal-down') && 
        !el.classList.contains('reveal-left') && 
        !el.classList.contains('reveal-right') && 
        !el.classList.contains('reveal-scale')) {
      el.classList.add('reveal-up');
    }
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger children if container has stagger class
        if (entry.target.classList.contains('stagger-children')) {
          const children = entry.target.querySelectorAll('.reveal');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('visible');
            }, index * 100);
          });
        } else {
          entry.target.classList.add('visible');
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // Parallax elements
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length > 0) {
    let ticking = false;

    function updateParallax() {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const offset = scrollY * speed;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }

  // Counter animation
  const counters = document.querySelectorAll('[data-counter]');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(element) {
    const target = parseInt(element.dataset.counter) || 0;
    const duration = parseInt(element.dataset.duration) || 2000;
    const suffix = element.dataset.suffix || '';
    const prefix = element.dataset.prefix || '';
    const decimals = parseInt(element.dataset.decimals) || 0;
    
    let start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      
      element.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
      }
    }
    
    requestAnimationFrame(update);
  }

  // Cleanup
  return () => {
    observer.disconnect();
    counterObserver.disconnect();
  };
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}