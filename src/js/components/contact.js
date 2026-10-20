// Contact component - form validation and submission
export function initContact() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const inputs = form.querySelectorAll('.form-input');
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn?.querySelector('.btn-text');
  const btnLoader = submitBtn?.querySelector('.btn-loader');

  // Floating label animation
  inputs.forEach(input => {
    // Check if input has value on load
    if (input.value.trim()) {
      input.classList.add('has-value');
    }

    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
      if (input.value.trim()) {
        input.classList.add('has-value');
      } else {
        input.classList.remove('has-value');
      }
    });

    input.addEventListener('input', () => {
      if (input.value.trim()) {
        input.classList.add('has-value');
      } else {
        input.classList.remove('has-value');
      }
      validateField(input);
    });
  });

  // Form validation
  function validateField(field) {
    const errorEl = field.parentElement.querySelector('.field-error');
    let isValid = true;
    let errorMessage = '';

    // Required validation
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMessage = `${getFieldLabel(field)} is required`;
    }

    // Email validation
    if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (field.type === 'tel' && field.value.trim()) {
      const phoneRegex = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(field.value.trim())) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    // Min length validation
    if (field.hasAttribute('minlength') && field.value.trim().length < parseInt(field.getAttribute('minlength'))) {
      isValid = false;
      errorMessage = `${getFieldLabel(field)} must be at least ${field.getAttribute('minlength')} characters`;
    }

    // Update UI
    field.classList.toggle('invalid', !isValid);
    field.classList.toggle('valid', isValid && field.value.trim());
    
    if (errorEl) {
      errorEl.textContent = errorMessage;
      errorEl.style.display = isValid ? 'none' : 'block';
    }

    return isValid;
  }

  function getFieldLabel(field) {
    const label = field.parentElement.querySelector('.form-label');
    return label ? label.textContent.replace('*', '').trim() : 'This field';
  }

  // Validate all fields
  function validateForm() {
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    return isValid;
  }

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Focus first invalid field
      const firstInvalid = form.querySelector('.invalid');
      firstInvalid?.focus();
      return;
    }

    // Show loading state
    setLoadingState(true);

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Simulate API call - replace with actual endpoint
      await submitForm(data);
      
      // Success
      showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
      inputs.forEach(input => {
        input.classList.remove('has-value', 'valid');
        input.parentElement.classList.remove('focused');
      });
    } catch (error) {
      showToast('Failed to send message. Please try again or email me directly.', 'error');
      console.error('Form submission error:', error);
    } finally {
      setLoadingState(false);
    }
  });

  function setLoadingState(loading) {
    if (!submitBtn) return;
    
    submitBtn.disabled = loading;
    if (btnText) btnText.style.display = loading ? 'none' : 'inline';
    if (btnLoader) btnLoader.style.display = loading ? 'inline' : 'none';
  }

  function submitForm(data) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) {
          resolve({ success: true });
        } else {
          reject(new Error('Network error'));
        }
      }, 1500);
    });
  }
}

// Toast notification system
let toastContainer = null;

export function showToast(message, type = 'info', duration = 5000) {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.style.cssText = `
    pointer-events: auto;
    min-width: 300px;
    max-width: 420px;
    transform: translateX(120%);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  `;

  const icons = {
    success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
    info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
  };

  const colors = {
    success: 'border-l-4 border-accent-green',
    error: 'border-l-4 border-red-500',
    info: 'border-l-4 border-primary-500'
  };

  toast.innerHTML = `
    <div class="glass-strong p-4 rounded-xl flex items-start gap-3 ${colors[type]}" style="box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);">
      <div class="flex-shrink-0 mt-0.5 text-${type === 'success' ? 'accent-green' : type === 'error' ? 'red' : 'primary'}-400">
        ${icons[type]}
      </div>
      <div class="flex-1 text-dark-100 text-sm leading-relaxed">${message}</div>
      <button class="toast-close flex-shrink-0 text-dark-500 hover:text-dark-200 transition-colors" aria-label="Dismiss">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `;

  toastContainer.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
    toast.style.opacity = '1';
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
    el.style.transform = 'translateX(120%)';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 400);
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContact);
} else {
  initContact();
}