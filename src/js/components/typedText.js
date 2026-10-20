// Typed text animation component
export function initTypedText() {
  const elements = document.querySelectorAll('[data-typed]');
  
  elements.forEach(element => {
    const texts = JSON.parse(element.dataset.typed || '[]');
    const speed = parseInt(element.dataset.speed) || 100;
    const deleteSpeed = parseInt(element.dataset.deleteSpeed) || 50;
    const pauseTime = parseInt(element.dataset.pause) || 2000;
    const loop = element.dataset.loop !== 'false';
    
    if (texts.length === 0) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    let pauseTimeout = null;

    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typed-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    element.appendChild(cursor);

    function type() {
      if (isPaused) return;

      const currentText = texts[textIndex];
      
      if (isDeleting) {
        element.textContent = currentText.substring(0, charIndex - 1);
        element.appendChild(cursor);
        charIndex--;
      } else {
        element.textContent = currentText.substring(0, charIndex + 1);
        element.appendChild(cursor);
        charIndex++;
      }

      let nextDelay = isDeleting ? deleteSpeed : speed;

      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        nextDelay = pauseTime;
        isPaused = true;
        
        pauseTimeout = setTimeout(() => {
          isPaused = false;
          type();
        }, pauseTime);
        return;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        nextDelay = pauseTime / 2;
      }

      setTimeout(type, nextDelay);
    }

    // Start animation
    type();

    // Cleanup function
    return () => {
      if (pauseTimeout) clearTimeout(pauseTimeout);
    };
  });
}

// Enhanced typed text with multiple elements support
export function createTypedText(element, options = {}) {
  const {
    strings = ['Software Engineer', 'AI Enthusiast', 'Full-Stack Developer'],
    typeSpeed = 100,
    deleteSpeed = 50,
    pauseTime = 2000,
    loop = true,
    cursorChar = '|',
    cursorClass = 'typed-cursor',
    onComplete = null,
    onStringTyped = null
  } = options;

  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;
  let timeoutId = null;

  // Create cursor
  const cursor = document.createElement('span');
  cursor.className = cursorClass;
  cursor.textContent = cursorChar;
  cursor.setAttribute('aria-hidden', 'true');

  function type() {
    if (isPaused) return;

    const currentString = strings[stringIndex];
    const displayText = isDeleting 
      ? currentString.substring(0, charIndex - 1)
      : currentString.substring(0, charIndex + 1);

    element.textContent = displayText;
    element.appendChild(cursor);

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentString.length) {
      // String complete
      if (onStringTyped) onStringTyped(currentString, stringIndex);
      
      isDeleting = true;
      isPaused = true;
      delay = pauseTime;

      timeoutId = setTimeout(() => {
        isPaused = false;
        type();
      }, pauseTime);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % strings.length;
      
      if (stringIndex === 0 && !loop) {
        // Animation complete
        if (onComplete) onComplete();
        return;
      }
      
      delay = pauseTime / 2;
    }

    timeoutId = setTimeout(type, delay);
  }

  // Start
  type();

  // Public API
  return {
    destroy() {
      if (timeoutId) clearTimeout(timeoutId);
      cursor.remove();
    },
    pause() {
      isPaused = true;
    },
    resume() {
      isPaused = false;
      type();
    },
    reset() {
      if (timeoutId) clearTimeout(timeoutId);
      stringIndex = 0;
      charIndex = 0;
      isDeleting = false;
      isPaused = false;
      type();
    }
  };
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTypedText);
} else {
  initTypedText();
}