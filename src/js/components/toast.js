// Toast notification system (standalone)
let toastContainer = null;

export function showToast(message, type = 'info', duration = 5000) {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('role', 'region');
    toastContainer.setAttribute('aria-live', 'polite');
    toastContainer.setAttribute('aria-label', 'Notifications');
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');

  const icons = {
    success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
    warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
  };

  const borderColors = {
    success: 'border-l-4 border-accent-green',
    error: 'border-l-4 border-red-500',
    warning: 'border-l-4 border-amber-500',
    info: 'border-l-4 border-primary-500'
  };

  const iconColors = {
    success: 'text-accent-green-400',
    error: 'text-red-400',
    warning: 'text-amber-400',
    info: 'text-primary-400'
  };

  toast.innerHTML = `
    <div class="glass-strong p-4 rounded-xl flex items-start gap-3 ${borderColors[type] || borderColors.info}" style="box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4); min-width: 300px; max-width: 420px;">
      <div class="flex-shrink-0 mt-0.5 ${iconColors[type] || iconColors.info}">
        ${icons[type] || icons.info}
      </div>
      <div class="flex-1 text-dark-100 text-sm leading-relaxed">${message}</div>
      <button class="toast-close flex-shrink-0 text-dark-500 hover:text-dark-200 transition-colors p-1" aria-label="Dismiss notification">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `;

  // Set initial state for animation
  toast.style.opacity = '0';
  toast.style.transform = 'translateX(120%)';
  toast.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

  toastContainer.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(0)';
  });

  // Close button
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn?.addEventListener('click', () => removeToast(toast));

  // Auto remove
  const timeoutId = setTimeout(() => removeToast(toast), duration);

  // Pause on hover
  toast.addEventListener('mouseenter', () => clearTimeout(timeoutId));
  toast.addEventListener('mouseleave', () => {
    setTimeout(() => removeToast(toast), 2000);
  });

  function removeToast(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateX(120%)';
    setTimeout(() => el.remove(), 400);
  }

  // Return dismiss function
  return () => removeToast(toast);
}

export function hideAllToasts() {
  if (toastContainer) {
    const toasts = toastContainer.querySelectorAll('.toast');
    toasts.forEach(toast => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(120%)';
    });
    setTimeout(() => {
      toastContainer.innerHTML = '';
    }, 400);
  }
}

// Export for global access
window.showToast = showToast;
window.hideAllToasts = hideAllToasts;