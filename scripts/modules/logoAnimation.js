// Overlay logo animation
export function initLogoAnimation() {
    const overlay = document.getElementById('overlay');
    const overlayLogo = document.getElementById('overlay__logo');
    const navbarLogo = document.getElementById('navbar__logo');
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    const MAX_LOAD_TIME = 4000; // Maximum wait time before forcing close

    if (!overlay || !overlayLogo || !navbarLogo) return;

    // Skip animation if already played this session
    if (sessionStorage.getItem('logoAnimationPlayed')) {
        showContent();
        overlay.remove();
        return;
    }

    // Wait for fonts and logo image, with timeout fallback
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

        // Wait for fonts + logo, but timeout if too slow
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
        // Reveal content underneath so the overlay's blur has something to blur
        main.style.opacity = '1';
        if (footer) footer.style.opacity = '1';
        // Hide the navbar logo until the splash logo lands on its position
        navbarLogo.style.opacity = '0';

        if (isMobile) {
            animateMobile();
        } else {
            animateDesktop();
        }

        sessionStorage.setItem('logoAnimationPlayed', 'true');
    }

    function animateLogo(targetTransform, onComplete) {
        // Ensure logo starts from its natural position
        overlayLogo.style.transform = 'translate(0, 0) scale(1)';
        overlayLogo.style.transition = 'none';

        // Fade the overlay background (not the logo) for the full duration of the logo motion
        const overlayBgEl = overlay.querySelector('.overlay__bg') || (() => {
            const bg = document.createElement('div');
            bg.className = 'overlay__bg';
            overlay.prepend(bg);
            return bg;
        })();
        overlayBgEl.style.transition = 'opacity 1.2s cubic-bezier(0.77,0,0.175,1)';

        // Double rAF to guarantee the start state is painted
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Now set the transition and target
                overlayLogo.style.transition = 'transform 1.2s cubic-bezier(0.77,0,0.175,1), opacity 0.6s';
                overlayLogo.style.transform = targetTransform;

                // Background fades out over the same 1.2s as the logo motion
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
        const overlayRect = overlayLogo.getBoundingClientRect();
        const navbarRect = navbarLogo.getBoundingClientRect();
        const deltaX = navbarRect.left + navbarRect.width / 2 - (overlayRect.left + overlayRect.width / 2);
        const deltaY = navbarRect.top + navbarRect.height / 2 - (overlayRect.top + overlayRect.height / 2);
        const scale = navbarLogo.offsetWidth / overlayLogo.offsetWidth;

        animateLogo(`translate(${deltaX}px, ${deltaY}px) scale(${scale})`, () => {
            overlayLogo.style.transform = '';
            overlayLogo.style.transition = '';
            navbarLogo.replaceWith(overlayLogo);
            overlayLogo.id = 'navbar__logo';
            overlayLogo.className = 'navbar__logo';
            overlayLogo.removeAttribute('style');
        });
    }
}
