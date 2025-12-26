// Overlay logo animation
export function initLogoAnimation() {
    const overlay = document.getElementById('overlay');
    const overlayLogo = document.getElementById('overlay__logo');
    const navbarLogo = document.getElementById('navbar__logo');
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    if (overlay && overlayLogo && navbarLogo) {
        if (sessionStorage.getItem('logoAnimationPlayed')) {
            overlay.remove();
            main.style.opacity = '1';
            main.style.pointerEvents = 'auto';
            if (footer) {
                footer.style.opacity = '1';
                footer.style.pointerEvents = 'auto';
            }
        } else {
            setTimeout(() => {
                header.style.opacity = '1';
                header.style.pointerEvents = 'auto';
                const overlayRect = overlayLogo.getBoundingClientRect();
                const navbarRect = navbarLogo.getBoundingClientRect();
                const deltaX = navbarRect.left + navbarRect.width / 2 - (overlayRect.left + overlayRect.width / 2);
                const deltaY = navbarRect.top + navbarRect.height / 2 - (overlayRect.top + overlayRect.height / 2);
                const scale = navbarLogo.offsetWidth / overlayLogo.offsetWidth;
                overlayLogo.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
                overlayLogo.style.transition = 'transform 0.65s cubic-bezier(0.77,0,0.175,1), opacity 0.35s';
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    main.style.opacity = '1';
                    main.style.pointerEvents = 'auto';
                    if (footer) {
                        footer.style.opacity = '1';
                        footer.style.pointerEvents = 'auto';
                    }
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
                sessionStorage.setItem('logoAnimationPlayed', 'true');
            }, 200);
        }
    }
}


