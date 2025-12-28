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

    // Add active state and swirl to mobile links
    initMobileLinkActiveState();
}

function initMobileLinkActiveState() {
    const swirlSVG = `\
    <svg class="navbar__swirl navbar__swirl--mobile" viewBox="0 0 505.62 148.57" xmlns="http://www.w3.org/2000/svg">
      <style>.navbar__swirl-stroke { display: none; }</style>
      <path class="navbar__swirl-fill" d="M399.5,67.19c.04-.18-.81-.51-2.59-1.01-.89-.16-2.03-.35-3.39-.43-.68,0-1.42,0-2.22,0-.79.02-1.63.17-2.53.26-3.55.55-7.97,1.92-12.36,4.98-4.38,2.99-8.89,7.54-11.78,14.01-2.92,6.47-3.72,14.65-1.73,22.97,1.99,8.28,6.57,16.72,13.84,23.58,7.29,6.81,16.99,11.79,27.76,14.44,2.69.67,5.45,1.22,8.27,1.62,2.81.42,5.68.69,8.59.84,2.91.17,5.85.15,8.84.08,2.98-.14,6.01-.33,9.05-.75,12.14-1.57,24.83-5.52,36.21-13.09,2.83-1.92,5.57-4.02,8.17-6.35,2.57-2.35,5.03-4.89,7.3-7.63,2.25-2.77,4.32-5.72,6.19-8.85,1.83-3.15,3.42-6.49,4.75-9.98,1.34-3.49,2.29-7.16,2.94-10.93.66-3.77.84-7.64.78-11.52-.24-7.77-2.1-15.51-5.09-22.81-2.98-7.33-7.31-14.13-12.47-20.31-5.14-6.2-11.39-11.66-18.28-16.18-6.85-4.57-14.39-8.13-22.2-11.01-7.84-2.83-15.99-4.88-24.29-6.3-8.3-1.4-16.75-2.26-25.26-2.57-8.5-.37-17.11-.31-25.77.25-17.3,1.12-34.82,3.93-52.07,8.81-17.24,4.83-34.26,11.65-50.45,20.28-16.19,8.62-31.28,18.47-45.83,28.37-14.55,9.91-28.62,19.89-42.79,28.97-7.08,4.54-14.18,8.84-21.35,12.85-7.18,3.97-14.43,7.62-21.73,10.9-7.29,3.31-14.7,6.07-22.11,8.42l-2.78.86c-.92.3-1.85.57-2.79.8-1.87.49-3.73.98-5.58,1.47-3.74.8-7.45,1.69-11.19,2.22-1.86.31-3.72.64-5.58.8-1.86.19-3.71.45-5.57.59-1.86.11-3.7.21-5.55.31-.92.07-1.84.08-2.76.07h-2.75c-3.68.07-7.27-.19-10.83-.55-3.56-.37-7.06-.94-10.47-1.74-3.4-.8-6.73-1.76-9.91-2.99-3.18-1.24-6.22-2.69-9.08-4.36-2.86-1.68-5.49-3.64-7.91-5.77-.59-.55-1.2-1.08-1.77-1.64l-1.59-1.76c-.51-.6-1.11-1.13-1.56-1.78l-1.39-1.91c-3.65-5.12-6.12-11.01-7.44-17.04-1.32-6.04-1.52-12.23-.69-18.14.83-5.91,2.68-11.54,5.44-16.5,2.75-4.97,6.42-9.21,10.68-12.57,4.26-3.37,9.07-5.86,14.03-7.56,4.97-1.69,10.11-2.46,15.1-2.61,2.5-.15,4.96.1,7.38.28,1.2.19,2.39.37,3.57.55.6.07,1.17.22,1.75.37.58.14,1.15.29,1.72.43,4.53,1.22,8.82,2.91,12.51,5.3.47.28.94.56,1.41.84.43.33.87.65,1.3.97.85.65,1.73,1.28,2.55,1.93.76.71,1.56,1.35,2.24,2.12.35.37.7.74,1.05,1.11.32.39.65.78.97,1.17,2.56,3.13,4.44,6.62,5.62,10.11,1.16,3.49,1.67,7.04,1.15,10.24-.47,3.21-1.84,6.03-3.79,8.23-1.93,2.23-4.34,3.76-6.84,4.74-2.5,1.01-5.09,1.4-7.51,1.6-4.86.37-9.1-.17-12.49-.67-6.78-1.11-10.34-2.07-10.46-1.67-.09.29,3.22,1.93,10.03,3.75,3.41.85,7.74,1.78,13.05,1.72,2.64-.05,5.56-.3,8.57-1.32,3-.98,6.1-2.72,8.63-5.37,2.55-2.61,4.53-6.22,5.28-10.25.8-4.03.34-8.34-.87-12.5-1.24-4.16-3.26-8.24-6.1-11.96-.36-.46-.72-.93-1.08-1.4-.39-.44-.79-.89-1.18-1.34-.77-.92-1.69-1.72-2.56-2.58-.92-.79-1.88-1.52-2.83-2.3-.48-.38-.96-.76-1.45-1.15-.52-.33-1.04-.67-1.57-1-4.12-2.82-8.91-4.89-13.99-6.4-.64-.18-1.28-.36-1.93-.53-.64-.18-1.29-.37-1.96-.47-1.33-.24-2.66-.48-4.01-.73-2.72-.28-5.48-.61-8.3-.52-5.62.04-11.45.77-17.16,2.57-5.7,1.8-11.33,4.55-16.41,8.4-5.08,3.83-9.56,8.83-12.9,14.61-3.35,5.78-5.62,12.31-6.69,19.14-1.07,6.83-.96,13.99.47,21.06,1.44,7.06,4.22,14.06,8.54,20.31l1.66,2.32c.54.79,1.24,1.46,1.86,2.19l1.92,2.16c.68.68,1.38,1.32,2.08,1.98,2.84,2.57,5.92,4.91,9.22,6.91,3.31,1.99,6.79,3.7,10.39,5.14,3.6,1.44,7.33,2.56,11.11,3.49,3.79.93,7.64,1.59,11.54,2.04,3.89.44,7.84.75,11.78.72l2.96.03c.99.02,1.98.02,2.97-.04,1.98-.09,3.97-.19,5.96-.28,1.99-.14,3.97-.39,5.97-.58,2-.17,3.98-.49,5.97-.81,4-.54,7.94-1.44,11.93-2.27,1.97-.5,3.94-1.01,5.92-1.51.99-.24,1.98-.52,2.95-.83l2.94-.89c7.84-2.42,15.63-5.28,23.24-8.67,7.63-3.36,15.16-7.11,22.6-11.17,7.41-4.09,14.73-8.48,21.97-13.08,28.94-18.37,56.72-40.05,88-56.73,15.61-8.31,31.82-14.82,48.35-19.5,16.52-4.72,33.31-7.46,49.9-8.6,8.3-.58,16.55-.67,24.7-.36,8.16.26,16.18,1.03,24,2.3,7.81,1.29,15.41,3.16,22.63,5.7,7.19,2.6,14.06,5.78,20.25,9.83,6.19,3.99,11.71,8.73,16.34,14.2,4.62,5.43,8.52,11.41,11.17,17.76,2.68,6.34,4.34,12.97,4.63,19.56.08,3.29-.02,6.56-.54,9.75-.52,3.19-1.27,6.34-2.38,9.35-4.34,12.12-12.85,22.24-22.77,29.1-10.02,6.92-21.5,10.77-32.68,12.44-2.8.45-5.6.67-8.36.87-2.77.12-5.52.2-8.22.1-2.7-.08-5.36-.27-7.97-.6-2.61-.3-5.16-.75-7.64-1.31-9.93-2.17-18.73-6.46-25.35-12.27-6.58-5.83-10.93-13.23-12.95-20.47-2.04-7.25-1.61-14.48.65-20.15,1.13-2.85,2.61-5.42,4.34-7.59.4-.57.89-1.04,1.32-1.56.44-.51.88-1,1.36-1.44.47-.45.93-.89,1.38-1.33.49-.39.97-.78,1.44-1.16,3.8-3.04,7.71-4.59,10.93-5.43.82-.17,1.58-.39,2.31-.49.73-.09,1.42-.17,2.05-.25,1.27-.08,2.36-.08,3.23-.1,1.73.13,2.68.12,2.72-.06Z"/>
      <path class="navbar__swirl-stroke" d="M56.14,76.98c13.46,4.24,30.64,7.48,39.57-3.45,8.57-10.49,2.41-26.95-7.82-35.83-19.74-17.13-53.02-15.35-70.82,3.78C-.74,60.63-.11,93.95,18.39,112.41c12.85,12.81,31.68,17.89,49.81,18.54,40.69,1.44,79.54-16.74,113.92-38.54,34.38-21.8,66.41-47.73,103.38-64.78,35.75-16.5,75.53-24.19,114.86-22.21,24.38,1.23,49.32,6.45,69.32,20.46,20,14.01,34.11,38.16,31.09,62.38-2.17,17.4-12.97,33.15-27.47,43.01-14.5,9.86-32.38,14.1-49.91,13.72-15.32-.33-31.04-4.33-42.88-14.06-11.84-9.73-19.03-25.89-15.44-40.79,3.59-14.9,19.54-26.56,34.44-22.95" fill="none" stroke-miterlimit="10" stroke-width="3.4"/>
    </svg>`;

    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

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
        
        link.insertAdjacentHTML('beforeend', swirlSVG);
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
        const linkPage = linkHref.split('/').pop();
        const isActive = linkPage === currentPage || (currentPage === '' && linkPage === 'index.html') || (linkHref === '/' && currentPage === 'index.html');
        
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




