// Swirl underline for navbar links
import { swirlSVG, getPageFromPath, getPageFromHref } from './swirlSVG.js';

export function initNavbarSwirl() {
    const currentPage = getPageFromPath(window.location.pathname);

    document.querySelectorAll('.navbar__links > li > a:not(.navbar__logo-link)').forEach(link => {
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
