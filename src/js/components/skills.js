// Skills component - animated skill bars and interactive cards
export function initSkills() {
  const skillCategories = document.querySelectorAll('.skill-category');
  
  // Animate skill bars on scroll
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars(entry.target);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

  skillCategories.forEach(category => {
    skillObserver.observe(category);
    
    // Add hover effects to skill items
    const skillItems = category.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 50}ms`;
      
      item.addEventListener('mouseenter', () => {
        const fill = item.querySelector('.skill-bar-fill');
        if (fill) {
          const level = fill.dataset.level;
          fill.style.transform = `scaleX(${level / 100})`;
        }
      });
    });
  });

  function animateSkillBars(category) {
    const fills = category.querySelectorAll('.skill-bar-fill');
    
    fills.forEach((fill, index) => {
      const level = fill.dataset.level;
      if (level) {
        setTimeout(() => {
          fill.style.transform = `scaleX(${level / 100})`;
        }, index * 100 + 200);
      }
    });
  }

  // Filter skills by category (if filter buttons exist)
  const filterButtons = document.querySelectorAll('.skill-filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter categories
        skillCategories.forEach(category => {
          if (filter === 'all' || category.dataset.category === filter) {
            category.style.display = 'block';
            requestAnimationFrame(() => {
              category.style.opacity = '1';
              category.style.transform = 'translateY(0)';
            });
          } else {
            category.style.opacity = '0';
            category.style.transform = 'translateY(20px)';
            setTimeout(() => {
              category.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  return () => skillObserver.disconnect();
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSkills);
} else {
  initSkills();
}