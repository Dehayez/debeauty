// Overlay logo animation
import { getTransformToTarget, moveLogoToBody, pinLogoAtRect } from './logoFly.js';

export function initLogoAnimation() {
    const overlay = document.getElementById('overlay');
    const overlayLogo = document.getElementById('overlay__logo');
    const navbarLogo = document.getElementById('navbar__logo');
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const hero = document.querySelector('.hero');
    const heroLogoSlot = document.querySelector('.hero__logo-placeholder');
    const heroLogo = document.getElementById('hero__logo');
    const isHome = !!(hero && heroLogo && heroLogoSlot);

    const MAX_LOAD_TIME = 4000;

    if (!overlay || !overlayLogo || !navbarLogo) return;

    function notifyHeroLogoReady() {
        document.body.classList.add('hero-logo-ready');
        window.dispatchEvent(new CustomEvent('heroLogoReady'));
    }

    function hideNavbarLogo() {
        navbarLogo.style.visibility = 'hidden';
        navbarLogo.setAttribute('aria-hidden', 'true');
    }

    if (sessionStorage.getItem('logoAnimationPlayed')) {
        showContent();
        overlay.remove();
        if (isHome) {
            hideNavbarLogo();
            notifyHeroLogoReady();
        }
        return;
    }

    waitForAssets().then(startAnimation);

    function waitForAssets() {
        const fontsReady = document.fonts.ready;
        const logoReady = overlayLogo.complete
            ? Promise.resolve()
            : new Promise(resolve => {
                overlayLogo.onload = resolve;
                overlayLogo.onerror = resolve;
            });
        const timeout = new Promise(resolve => setTimeout(resolve, MAX_LOAD_TIME));

        return Promise.race([
            Promise.all([fontsReady, logoReady]),
            timeout
        ]);
    }

    function showContent() {
        header.style.opacity = '1';
        header.style.pointerEvents = 'auto';
        main.style.opacity = '1';
        main.style.pointerEvents = 'auto';
        if (footer) {
            footer.style.opacity = '1';
            footer.style.pointerEvents = 'auto';
        }
    }

    function startAnimation() {
        const isMobile = window.innerWidth <= 768;

        header.style.opacity = '1';
        header.style.pointerEvents = 'auto';
        main.style.opacity = '1';
        if (footer) footer.style.opacity = '1';
        navbarLogo.style.opacity = '0';

        if (isHome) {
            hideNavbarLogo();
            animateToHero();
        } else if (isMobile) {
            animateMobile();
        } else {
            animateDesktop();
        }

        sessionStorage.setItem('logoAnimationPlayed', 'true');
    }

    function animateLogo(targetTransform, onComplete) {
        overlayLogo.style.transform = 'translate(0, 0) scale(1)';
        overlayLogo.style.transition = 'none';

        const overlayBgEl = overlay.querySelector('.overlay__bg') || (() => {
            const bg = document.createElement('div');
            bg.className = 'overlay__bg';
            overlay.prepend(bg);
            return bg;
        })();
        overlayBgEl.style.transition = 'opacity 1.2s cubic-bezier(0.77,0,0.175,1)';

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlayLogo.style.transition = 'transform 1.2s cubic-bezier(0.77,0,0.175,1), opacity 0.6s';
                overlayLogo.style.transform = targetTransform;
                overlayBgEl.style.opacity = '0';

                setTimeout(() => {
                    overlay.style.opacity = '0';
                    showContent();
                }, 1000);

                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 1200);

                setTimeout(() => {
                    overlay.remove();
                }, 1600);
            });
        });
    }

    function animateToHero() {
        animateLogo(getTransformToTarget(overlayLogo, heroLogoSlot), () => {
            const landingRect = overlayLogo.getBoundingClientRect();

            heroLogo.remove();
            overlayLogo.id = 'hero__logo';
            overlayLogo.className = 'hero__logo';
            moveLogoToBody(overlayLogo);
            pinLogoAtRect(overlayLogo, landingRect);
            notifyHeroLogoReady();
        });
    }

    function animateMobile() {
        const overlayRect = overlayLogo.getBoundingClientRect();
        const targetY = 35;
        const targetSize = 50;
        const scale = targetSize / overlayLogo.offsetWidth;
        const deltaX = (window.innerWidth / 2) - (overlayRect.left + overlayRect.width / 2);
        const deltaY = targetY - (overlayRect.top + overlayRect.height / 2);

        animateLogo(`translate(${deltaX}px, ${deltaY}px) scale(${scale})`, () => {
            navbarLogo.style.opacity = '';
        });
    }

    function animateDesktop() {
        animateLogo(getTransformToTarget(overlayLogo, navbarLogo), () => {
            overlayLogo.style.transform = '';
            overlayLogo.style.transition = '';
            navbarLogo.replaceWith(overlayLogo);
            overlayLogo.id = 'navbar__logo';
            overlayLogo.className = 'navbar__logo';
            overlayLogo.removeAttribute('style');
        });
    }
}
