const root = document.documentElement;
const header = document.querySelector('.site-header');
const menu = document.querySelector('.nav-menu');
const menuButton = document.querySelector('.menu-toggle');
const themeButton = document.querySelector('.theme-toggle');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) root.dataset.theme = savedTheme;

function updateThemeIcon() {
    const isLight = root.dataset.theme === 'light';
    themeButton?.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    document.querySelector('.theme-sun')?.style.setProperty('display', isLight ? 'inline' : 'none');
    document.querySelector('.theme-moon')?.style.setProperty('display', isLight ? 'none' : 'inline');
}

themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme', root.dataset.theme);
    updateThemeIcon();
});

menuButton?.addEventListener('click', () => {
    const isOpen = menu?.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
}));

const progress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 24);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${maxScroll ? window.scrollY / maxScroll : 0})`;
}, { passive: true });

const sections = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('.nav-menu a');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
    });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => observer.observe(section));

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
updateThemeIcon();

const galleryObserver = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observerInstance.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.gallery').forEach((gallery) => galleryObserver.observe(gallery));

const lightbox = document.querySelector('.lightbox');
const galleryItems = [...document.querySelectorAll('.gallery figure')];
if (lightbox && galleryItems.length) {
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.lightbox-caption');
    const counter = lightbox.querySelector('.lightbox-counter');
    const playButton = lightbox.querySelector('.lightbox-play');
    const content = lightbox.querySelector('.lightbox-content');
    let currentIndex = 0;
    let slideshowTimer;

    const showImage = (index) => {
        currentIndex = (index + galleryItems.length) % galleryItems.length;
        const image = galleryItems[currentIndex].querySelector('img');
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        caption.textContent = image.alt;
        counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`;
        lightboxImage.classList.remove('lightbox-image');
        void lightboxImage.offsetWidth;
        lightboxImage.classList.add('lightbox-image');
    };

    const stopSlideshow = () => {
        window.clearInterval(slideshowTimer);
        playButton.classList.remove('is-playing');
        playButton.textContent = 'Play slideshow';
        playButton.setAttribute('aria-label', 'Start slideshow');
    };

    const closeLightbox = () => {
        stopSlideshow();
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    const openLightbox = (index) => {
        showImage(index);
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        lightbox.querySelector('.lightbox-close').focus();
    };

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openLightbox(index);
            }
        });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('[data-lightbox-close]').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showImage(currentIndex - 1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => showImage(currentIndex + 1));
    playButton.addEventListener('click', () => {
        if (playButton.classList.contains('is-playing')) {
            stopSlideshow();
            return;
        }
        playButton.classList.add('is-playing');
        playButton.textContent = 'Pause slideshow';
        playButton.setAttribute('aria-label', 'Pause slideshow');
        slideshowTimer = window.setInterval(() => showImage(currentIndex + 1), 3500);
    });
    lightbox.querySelector('.lightbox-fullscreen').addEventListener('click', async () => {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
        } else {
            await content.requestFullscreen();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('is-open')) return;
        if (event.key === 'Escape') closeLightbox();
        if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (event.key === 'ArrowRight') showImage(currentIndex + 1);
    });
}
