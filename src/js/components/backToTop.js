// Back to top button
export function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  let ticking = false;
  let lastScrollY = 0;

  function updateVisibility() {
    const scrollY = window.scrollY;
    const showThreshold = 300;
    
    if (scrollY > showThreshold) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }

    // Hide when near footer
    const footer = document.querySelector('footer, .footer, .copyright');
    if (footer) {
      const footerTop = footer.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      
      if (footerTop < viewportHeight) {
        btn.style.transform = `translateY(${viewportHeight - footerTop + 24}px)`;
      } else {
        btn.style.transform = 'translateY(0)';
      }
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateVisibility);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Smooth scroll to top
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Initial check
  updateVisibility();

  return () => window.removeEventListener('scroll', onScroll);
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBackToTop);
} else {
  initBackToTop();
}