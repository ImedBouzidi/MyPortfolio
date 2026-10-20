// Projects component - interactive project cards and modals
export function initProjects() {
  const projectCards = document.querySelectorAll('.project-card');
  const projectModal = document.querySelector('.project-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalContent = document.querySelector('.modal-content');

  // Project data - in a real app this would come from a JSON file or CMS
  const projectsData = {
    gomrah: {
      title: 'Gomrah Platform',
      subtitle: 'Unified Request Management Platform',
      description: 'A comprehensive platform for managing citizen requests and government services with AI-powered routing and automated workflows.',
      longDescription: 'Gomrah is a full-stack platform built to streamline the interaction between citizens and government services. The platform features an intelligent request routing system powered by NLP and machine learning models that automatically categorize and prioritize incoming requests. The admin dashboard provides real-time analytics, SLA tracking, and automated report generation.',
      tech: ['Spring Boot', 'Angular', 'PostgreSQL', 'Docker', 'Kubernetes', 'Python', 'TensorFlow', 'RabbitMQ'],
      images: [
        '/images/projects/gomrah/admin-dashboard.png',
        '/images/projects/gomrah/request-flow.png',
        '/images/projects/gomrah/analytics.png'
      ],
      links: {
        live: 'https://gomrah.example.com',
        github: 'https://github.com/imedbouzidi/gomrah',
        caseStudy: '/project.html#gomrah'
      },
      role: 'Lead Full-Stack Developer',
      duration: '8 months',
      teamSize: 5
    },
    buyme: {
      title: 'BuyMe E-Commerce',
      subtitle: 'Microservices E-Commerce Platform',
      description: 'A scalable microservices-based e-commerce platform with AI-powered customer segmentation and personalized recommendations.',
      longDescription: 'BuyMe is a modern e-commerce platform built on a microservices architecture. It features AI-driven customer segmentation using clustering algorithms, personalized product recommendations using collaborative filtering, real-time inventory management, and a robust order processing pipeline. The platform handles high traffic loads with auto-scaling Kubernetes deployments.',
      tech: ['Spring Boot', 'Angular', 'MongoDB', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'Python', 'scikit-learn'],
      images: [
        '/images/projects/buy-me/homepage.png',
        '/images/projects/buy-me/ai-segmentation.png',
        '/images/projects/buy-me/admin-panel.png'
      ],
      links: {
        live: 'https://buyme.example.com',
        github: 'https://github.com/imedbouzidi/buy-me',
        caseStudy: '/project.html#buy-me'
      },
      role: 'Full-Stack Developer & ML Engineer',
      duration: '6 months',
      teamSize: 4
    },
    'ala-dhemtk': {
      title: 'Ala Dhemtk',
      subtitle: 'Service Management Platform',
      description: 'A comprehensive service management platform connecting clients with service providers, featuring real-time tracking and automated scheduling.',
      longDescription: 'Ala Dhemtk is a marketplace platform that connects clients with service providers for home maintenance, repairs, and professional services. It includes real-time GPS tracking of service providers, automated scheduling with conflict resolution, integrated payment processing, and a rating/review system. The platform uses WebSocket connections for real-time updates.',
      tech: ['Spring Boot', 'Angular', 'MySQL', 'WebSocket', 'Docker', 'Firebase', 'Google Maps API', 'Stripe'],
      images: [
        '/images/projects/ala-dhemtk/home-page.png',
        '/images/projects/ala-dhemtk/client-reservations.png',
        '/images/projects/ala-dhemtk/admin-dashboard.png'
      ],
      links: {
        live: 'https://ala-dhemtk.example.com',
        github: 'https://github.com/imedbouzidi/ala-dhemtk',
        caseStudy: '/project.html#ala-dhemtk'
      },
      role: 'Full-Stack Developer',
      duration: '5 months',
      teamSize: 3
    },
    'ched-med': {
      title: 'Ched Med',
      subtitle: 'Healthcare Job Platform',
      description: 'A specialized job platform for healthcare professionals with AI-powered matching and automated credential verification.',
      longDescription: 'Ched Med connects healthcare facilities with qualified professionals. It features AI-powered job matching using NLP to parse job descriptions and candidate profiles, automated credential verification through document processing (OCR), and a comprehensive application tracking system. The platform reduces hiring time by 60% through intelligent matching.',
      tech: ['Spring Boot', 'Angular', 'PostgreSQL', 'Python', 'Tesseract OCR', 'spaCy', 'Docker', 'AWS'],
      images: [
        '/images/projects/ched-med/available_jobs.png',
        '/images/projects/ched-med/my_applications.png',
        '/images/projects/ched-med/admin-panel.png'
      ],
      links: {
        live: 'https://ched-med.example.com',
        github: 'https://github.com/imedbouzidi/ched-med',
        caseStudy: '/project.html#ched-med'
      },
      role: 'Full-Stack Developer & AI Engineer',
      duration: '4 months',
      teamSize: 3
    },
    calm: {
      title: 'CALM POS',
      subtitle: 'Point of Sale System',
      description: 'A modern POS system for restaurants with table management, inventory tracking, and real-time analytics.',
      longDescription: 'CALM POS is a comprehensive point-of-sale solution designed for restaurants and cafes. It features intuitive table management with visual floor plans, split billing, kitchen display system integration, real-time inventory tracking with low-stock alerts, and detailed sales analytics with exportable reports. The system works offline and syncs when connectivity is restored.',
      tech: ['Java', 'JavaFX', 'MySQL', 'Spring Boot', 'Docker', 'Electron', 'Chart.js'],
      images: [
        '/images/projects/calm/cmd.png',
        '/images/projects/calm/table-management.png',
        '/images/projects/calm/analytics.png'
      ],
      links: {
        live: null,
        github: 'https://github.com/imedbouzidi/calm-pos',
        caseStudy: '/project.html#calm'
      },
      role: 'Desktop Application Developer',
      duration: '4 months',
      teamSize: 2
    },
    'calm-desktop': {
      title: 'CALM Desktop',
      subtitle: 'Cross-Platform Desktop App',
      description: 'Electron-based desktop wrapper for the CALM POS system with auto-updater and native integrations.',
      longDescription: 'CALM Desktop provides a native desktop experience for the POS system. Built with Electron, it features auto-updater for seamless deployments, native OS integrations (printer support, cash drawer, barcode scanner), secure local data storage with encryption, and offline-first architecture with background sync.',
      tech: ['Electron', 'React', 'TypeScript', 'Node.js', 'SQLite', 'electron-builder'],
      images: [
        '/images/projects/calm-screenshots/1.jpg',
        '/images/projects/calm-screenshots/2.jpg',
        '/images/projects/calm-screenshots/3.jpg'
      ],
      links: {
        live: null,
        github: 'https://github.com/imedbouzidi/calm-desktop',
        caseStudy: '/project.html#calm-desktop'
      },
      role: 'Desktop Application Developer',
      duration: '3 months',
      teamSize: 1
    }
  };

  // Card hover effects with 3D tilt
  projectCards.forEach(card => {
    const media = card.querySelector('.project-card-media');
    
    card.addEventListener('mousemove', (e) => {
      if (!media) return;
      
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      const rotateX = -y * 8;
      const rotateY = x * 8;
      
      media.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      if (media) {
        media.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      }
    });

    // Click to open modal
    card.addEventListener('click', (e) => {
      // Don't open modal if clicking on links
      if (e.target.closest('.project-card-link')) return;
      
      const projectId = card.dataset.project;
      if (projectId && projectsData[projectId]) {
        openProjectModal(projectsData[projectId]);
      }
    });
  });

  // Modal functions
  function openProjectModal(project) {
    if (!projectModal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-header">
        <button class="modal-close" aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-gallery">
          ${project.images.map((img, i) => `
            <img src="${img}" alt="${project.title} - Screenshot ${i + 1}" class="${i === 0 ? 'active' : ''}" loading="lazy">
          `).join('')}
        </div>
        <div class="modal-info">
          <span class="modal-tag">${project.subtitle}</span>
          <h2>${project.title}</h2>
          <p class="modal-description">${project.longDescription}</p>
          
          <div class="modal-meta">
            <div class="meta-item">
              <span class="meta-label">Role</span>
              <span class="meta-value">${project.role}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Duration</span>
              <span class="meta-value">${project.duration}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Team Size</span>
              <span class="meta-value">${project.teamSize}</span>
            </div>
          </div>

          <div class="modal-tech">
            <h4>Technologies</h4>
            <div class="tech-tags">
              ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
          </div>

          <div class="modal-links">
            ${project.links.live ? `<a href="${project.links.live}" target="_blank" rel="noopener" class="btn btn-primary"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> Live Demo</a>` : ''}
            ${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener" class="btn btn-secondary"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> GitHub</a>` : ''}
            ${project.links.caseStudy ? `<a href="${project.links.caseStudy}" class="btn btn-outline">Case Study</a>` : ''}
          </div>
        </div>
      </div>
    `;

    // Re-attach close handler
    const newCloseBtn = modalContent.querySelector('.modal-close');
    newCloseBtn?.addEventListener('click', closeProjectModal);

    // Gallery functionality
    const galleryImages = modalContent.querySelectorAll('.modal-gallery img');
    if (galleryImages.length > 1) {
      let currentIndex = 0;
      const mainImage = galleryImages[0];
      
      galleryImages.forEach((img, i) => {
        img.addEventListener('click', () => {
          galleryImages.forEach(g => g.classList.remove('active'));
          img.classList.add('active');
          mainImage.src = img.src;
          mainImage.alt = img.alt;
          currentIndex = i;
        });
      });
    }

    // Show modal
    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Animate in
    requestAnimationFrame(() => {
      modalContent.style.opacity = '1';
      modalContent.style.transform = 'scale(1)';
    });

    // Trap focus
    trapFocus(modalContent);
  }

  function closeProjectModal() {
    if (!projectModal || !modalContent) return;
    
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    }, 300);
  }

  // Close on backdrop click
  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal?.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // Focus trapping
  function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    element.addEventListener('keydown', function handleTab(e) {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    });
  }

  // Intersection Observer for card entrance animations
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  projectCards.forEach(card => {
    card.classList.add('reveal', 'reveal-up');
    cardObserver.observe(card);
  });

  return () => {
    cardObserver.disconnect();
    document.removeEventListener('keydown', closeProjectModal);
  };
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjects);
} else {
  initProjects();
}