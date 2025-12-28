// Hamburger menu functionality
export function initHamburgerMenu() {
    const hamburger = document.querySelector('.navbar__hamburger');
    const mobileOverlay = document.querySelector('.navbar__mobile-overlay');
    const mobileLinks = document.querySelectorAll('.navbar__mobile-link');

    function closeMenu() {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMenu() {
        hamburger.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (hamburger && mobileOverlay) {
        hamburger.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
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
}




