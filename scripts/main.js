document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is working!');

    // Animate overlay logo to navbar center, then fade in content
    const overlay = document.getElementById('overlay');
    const overlayLogo = document.getElementById('overlay-logo');
    const navbarLogo = document.getElementById('navbar-logo');
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
                // Make sure navbar is visible for accurate measurement
                header.style.opacity = '1';
                header.style.pointerEvents = 'auto';

                // Get bounding rectangles
                const overlayRect = overlayLogo.getBoundingClientRect();
                const navbarRect = navbarLogo.getBoundingClientRect();
                // Calculate translation and scale
                const deltaX = navbarRect.left + navbarRect.width / 2 - (overlayRect.left + overlayRect.width / 2);
                const deltaY = navbarRect.top + navbarRect.height / 2 - (overlayRect.top + overlayRect.height / 2);
                const scale = navbarLogo.offsetWidth / overlayLogo.offsetWidth;

                // Animate overlay logo with fast-then-slow timing
                overlayLogo.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
                overlayLogo.style.transition = 'transform 0.65s cubic-bezier(0.77,0,0.175,1), opacity 0.35s';

                // After animation, fade out overlay and fade in content
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    main.style.opacity = '1';
                    main.style.pointerEvents = 'auto';
                    if (footer) {
                        footer.style.opacity = '1';
                        footer.style.pointerEvents = 'auto';
                    }
                }, 500);

                // Move logo element to navbar and remove overlay
                setTimeout(() => {
                    overlayLogo.style.transform = '';
                    overlayLogo.style.transition = '';
                    navbarLogo.replaceWith(overlayLogo);
                    overlayLogo.id = 'navbar-logo';
                    overlayLogo.className = 'navbar-logo';
                    overlay.remove();
                }, 900);
                sessionStorage.setItem('logoAnimationPlayed', 'true');
            }, 200);
        }
    }
});