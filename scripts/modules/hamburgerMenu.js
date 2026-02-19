// Hamburger menu functionality
import { swirlSVGMobile, getPageFromPath, getPageFromHref } from './swirlSVG.js';

export function initHamburgerMenu() {
    const hamburger = document.querySelector('.navbar__hamburger');
    const header = document.querySelector('.header');
    const mobileOverlay = document.querySelector('.navbar__mobile-overlay');
    const mobileLinks = document.querySelectorAll('.navbar__mobile-link');

    function isMenuOpen() {
        return mobileOverlay && mobileOverlay.classList.contains('active');
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';

        // Get the natural height of the navbar
        const navbar = header.querySelector('.navbar');
        const naturalHeight = navbar ? navbar.offsetHeight : 60;

        // Set current height first, then animate down
        header.style.height = `${header.offsetHeight}px`;

        requestAnimationFrame(() => {
            header.classList.remove('menu-open');
            header.style.height = `${naturalHeight}px`;

            // Reset height after animation completes
            setTimeout(() => {
                header.style.height = '';
            }, 700);
        });
    }

    function openMenu() {
        const navbar = header.querySelector('.navbar');
        const currentHeight = navbar ? navbar.offsetHeight : 60;
        header.style.height = `${currentHeight}px`;

        requestAnimationFrame(() => {
            header.classList.add('menu-open');
            header.style.height = '100vh';

            requestAnimationFrame(() => {
                hamburger.classList.add('active');
                hamburger.setAttribute('aria-expanded', 'true');
                mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }

    function toggleMenu() {
        if (isMenuOpen()) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (hamburger && mobileOverlay) {
        // Set initial ARIA attributes
        hamburger.setAttribute('role', 'button');
        hamburger.setAttribute('tabindex', '0');
        hamburger.setAttribute('aria-label', 'Menu');
        hamburger.setAttribute('aria-expanded', 'false');

        hamburger.addEventListener('click', toggleMenu);

        // Keyboard support: Enter and Space to toggle
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        // Escape key closes menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen()) {
                closeMenu();
                hamburger.focus();
            }
        });

        // Close menu when clicking on mobile links
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside
        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay) {
                closeMenu();
            }
        });

        // Close menu on window resize to desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }

    // Add active state and swirl to mobile links
    initMobileLinkActiveState();
}

function initMobileLinkActiveState() {
    const currentPage = getPageFromPath(window.location.pathname);

    document.querySelectorAll('.navbar__mobile-link').forEach(link => {
        link.style.position = 'relative';
        link.style.display = 'inline-block';

        if (!link.querySelector('.navbar__link-text')) {
            const textNodes = Array.from(link.childNodes).filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0);
            textNodes.forEach(node => {
                const span = document.createElement('span');
                span.className = 'navbar__link-text';
                span.textContent = node.textContent;
                link.replaceChild(span, node);
            });
        }

        link.insertAdjacentHTML('beforeend', swirlSVGMobile);
        const swirl = link.querySelector('.navbar__swirl');
        const stroke = swirl.querySelector('.navbar__swirl-stroke');
        const fill = swirl.querySelector('.navbar__swirl-fill');
        const pathLength = stroke.getTotalLength();
        stroke.style.strokeDasharray = pathLength;
        stroke.style.strokeDashoffset = pathLength;
        requestAnimationFrame(() => {
            stroke.style.display = 'block';
        });

        const linkHref = link.getAttribute('href');
        const isActive = getPageFromHref(linkHref) === currentPage;

        if (isActive) {
            fill.style.opacity = '1';
            link.classList.add('navbar__link--active');
        }

        let fillTimeout, strokeTimeout;

        link.addEventListener('mouseenter', () => {
            if (isActive) return;
            fill.style.transition = 'opacity 0.75s';
            fill.style.opacity = '0';
            gsap.set(stroke, { strokeDashoffset: pathLength, opacity: 1 });
            gsap.to(stroke, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' });
            fillTimeout = setTimeout(() => {
                fill.style.opacity = '1';
            }, 140);
            strokeTimeout = setTimeout(() => {
                gsap.to(stroke, { opacity: 0, duration: 0.3, ease: 'power2.out' });
            }, 360);
        });

        link.addEventListener('mouseleave', () => {
            if (isActive) return;
            clearTimeout(fillTimeout);
            clearTimeout(strokeTimeout);
            gsap.killTweensOf(stroke);
            fill.style.transition = 'opacity 0.3s';
            fill.style.opacity = '0';
            gsap.to(stroke, { opacity: 1, duration: 0.15, ease: 'power2.in' });
            gsap.to(stroke, { strokeDashoffset: pathLength, duration: 0.35, ease: 'power2.in' });
        });
    });
}
