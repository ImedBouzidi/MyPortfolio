// Core initialization
export function initCore() {
  // Set initial theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
  
  document.documentElement.classList.toggle('light', !isDark);
  document.documentElement.classList.toggle('dark', isDark);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.toggle('light', !e.matches);
      document.documentElement.classList.toggle('dark', e.matches);
    }
  });

  // Smooth scroll polyfill for older browsers
  if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
    document.head.appendChild(script);
  }

  // IntersectionObserver polyfill
  if (!window.IntersectionObserver) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/intersection-observer@0.12.2/intersection-observer.js';
    document.head.appendChild(script);
  }
}

// Initialize immediately
initCore();