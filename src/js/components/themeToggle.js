// Theme toggle component
export function initThemeToggle() {
  const toggleBtn = document.querySelector('.theme-toggle');
  if (!toggleBtn) return;

  const html = document.documentElement;
  const sunIcon = toggleBtn.querySelector('.icon-sun');
  const moonIcon = toggleBtn.querySelector('.icon-moon');

  // Update icon visibility
  function updateIcons() {
    const isLight = html.classList.contains('light');
    if (sunIcon) sunIcon.style.display = isLight ? 'none' : 'block';
    if (moonIcon) moonIcon.style.display = isLight ? 'block' : 'none';
    toggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  }

  // Toggle theme
  function toggleTheme() {
    const isLight = html.classList.toggle('light');
    html.classList.toggle('dark', !isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateIcons();
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themechange', { detail: { isLight } }));
  }

  // Initialize icons
  updateIcons();

  // Click handler
  toggleBtn.addEventListener('click', toggleTheme);

  // Keyboard support
  toggleBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Listen for system theme changes (only if user hasn't set preference)
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const isLight = !e.matches;
      html.classList.toggle('light', isLight);
      html.classList.toggle('dark', !isLight);
      updateIcons();
    }
  });

  return () => {
    toggleBtn.removeEventListener('click', toggleTheme);
    mediaQuery.removeEventListener('change', null);
  };
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
  initThemeToggle();
}