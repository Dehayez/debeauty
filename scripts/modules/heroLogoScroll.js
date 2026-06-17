// Scroll-driven logo flight from the home hero into the navbar.
import { setupGsap, prefersReducedMotion } from './gsap.js';
import { moveLogoToBody, pinLogoAtRect } from './logoFly.js';

function getNavbarTargetRect() {
    const navbarLogo = document.getElementById('navbar__logo');
    if (!navbarLogo) return null;

    if (window.innerWidth <= 768) {
        const size = 50;
        return {
            top: 35 - size / 2,
            left: window.innerWidth / 2 - size / 2,
            width: size,
            height: size,
        };
    }

    return navbarLogo.getBoundingClientRect();
}

function createNavbarAnchor(src, alt) {
    const anchor = document.createElement('img');
    anchor.id = 'navbar__logo';
    anchor.className = 'navbar__logo';
    anchor.src = src;
    anchor.alt = alt || 'débeauty';
    anchor.style.visibility = 'hidden';
    anchor.setAttribute('aria-hidden', 'true');
    return anchor;
}

export function initHeroLogoScroll() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    function setup() {
        const placeholder = hero.querySelector('.hero__logo-placeholder');
        const navbarLink = document.querySelector('.navbar__logo-link');
        let logo = document.getElementById('hero__logo');
        let navbarAnchor = document.getElementById('navbar__logo');

        if (!logo || !navbarAnchor || !placeholder || !navbarLink) return;
        if (logo.dataset.scrollBound === 'true') return;
        logo.dataset.scrollBound = 'true';

        if (!setupGsap()) return;

        if (prefersReducedMotion()) {
            return;
        }

        navbarAnchor.style.visibility = 'hidden';
        navbarAnchor.setAttribute('aria-hidden', 'true');

        if (logo.parentElement !== document.body) {
            const startRect = logo.getBoundingClientRect();
            moveLogoToBody(logo);
            pinLogoAtRect(logo, startRect);
        }

        let heroStartRect = null;
        let docked = false;
        let scrollTrigger = null;

        function captureHeroStartRect() {
            heroStartRect = placeholder.getBoundingClientRect();
        }

        function setFlyingPosition(progress) {
            const to = getNavbarTargetRect();
            if (!heroStartRect || !to) return;

            const top = heroStartRect.top + (to.top - heroStartRect.top) * progress;
            const left = heroStartRect.left + (to.left - heroStartRect.left) * progress;
            const width = heroStartRect.width + (to.width - heroStartRect.width) * progress;
            const height = heroStartRect.height + (to.height - heroStartRect.height) * progress;

            pinLogoAtRect(logo, { top, left, width, height });
        }

        function dockLogo() {
            if (docked) return;
            docked = true;

            if (window.innerWidth <= 768) {
                setFlyingPosition(1);
                document.body.classList.add('logo-is-docked');
                return;
            }

            logo.classList.remove('hero__logo--flying');
            logo.removeAttribute('style');
            logo.id = 'navbar__logo';
            logo.className = 'navbar__logo';
            logo.removeAttribute('aria-hidden');

            navbarAnchor.replaceWith(logo);
            navbarAnchor = logo;
            document.body.classList.add('logo-is-docked');
        }

        function undockLogo() {
            if (!docked) return;
            docked = false;
            document.body.classList.remove('logo-is-docked');

            if (window.innerWidth <= 768) {
                logo.id = 'hero__logo';
                logo.className = 'hero__logo';
                moveLogoToBody(logo);
                setFlyingPosition(scrollTrigger.progress);
                return;
            }

            const anchor = createNavbarAnchor(logo.src, logo.alt);
            logo.replaceWith(anchor);
            navbarAnchor = anchor;

            logo.id = 'hero__logo';
            logo.className = 'hero__logo';
            moveLogoToBody(logo);
            setFlyingPosition(scrollTrigger.progress);
        }

        function onScrollUpdate(self) {
            const progress = self.progress;

            if (progress >= 1) {
                if (!docked) dockLogo();
                return;
            }

            if (docked) undockLogo();
            setFlyingPosition(progress);
        }

        captureHeroStartRect();

        scrollTrigger = ScrollTrigger.create({
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.4,
            onUpdate: onScrollUpdate,
        });

        onScrollUpdate({ progress: scrollTrigger.progress });

        window.addEventListener('resize', () => {
            if (window.scrollY === 0) {
                captureHeroStartRect();
            }
            ScrollTrigger.refresh();
            if (!docked) {
                setFlyingPosition(scrollTrigger.progress);
            }
        });
    }

    window.addEventListener('heroLogoReady', setup);

    if (sessionStorage.getItem('logoAnimationPlayed') && document.getElementById('hero__logo')) {
        setup();
    }
}
