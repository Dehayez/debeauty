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

        if (isMobile) {
            animateMobile();
        } else {
            animateDesktop();
        }

        sessionStorage.setItem('logoAnimationPlayed', 'true');
    }

    function animateMobile() {
        // Mobile: simple fade out without navbar animation
        overlayLogo.style.transition = 'opacity 0.5s ease';
        overlayLogo.style.opacity = '0';

        setTimeout(() => {
            overlay.style.opacity = '0';
            showContent();
        }, 300);

        setTimeout(() => {
            overlay.remove();
        }, 700);
    }

    function animateDesktop() {
        // Desktop: animate logo to navbar position
        const overlayRect = overlayLogo.getBoundingClientRect();
        const navbarRect = navbarLogo.getBoundingClientRect();
        const deltaX = navbarRect.left + navbarRect.width / 2 - (overlayRect.left + overlayRect.width / 2);
        const deltaY = navbarRect.top + navbarRect.height / 2 - (overlayRect.top + overlayRect.height / 2);
        const scale = navbarLogo.offsetWidth / overlayLogo.offsetWidth;

        overlayLogo.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
        overlayLogo.style.transition = 'transform 0.65s cubic-bezier(0.77,0,0.175,1), opacity 0.35s';

        setTimeout(() => {
            overlay.style.opacity = '0';
            showContent();
        }, 500);

        setTimeout(() => {
            overlayLogo.style.transform = '';
            overlayLogo.style.transition = '';
            navbarLogo.replaceWith(overlayLogo);
            overlayLogo.id = 'navbar__logo';
            overlayLogo.className = 'navbar__logo';
            overlayLogo.removeAttribute('style');
            overlay.remove();
        }, 900);
    }
}
