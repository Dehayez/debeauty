// Subtle scroll-driven parallax + fade on the home hero.
import { setupGsap, prefersReducedMotion } from './gsap.js';

export function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    if (!setupGsap()) return;
    if (prefersReducedMotion()) return;

    const bg = hero.querySelector('.hero__bg');
    const content = hero.querySelector('.hero__content');

    if (bg) {
        gsap.to(bg, {
            yPercent: 18,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
    }

    if (content) {
        gsap.to(content, {
            yPercent: -25,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom 30%',
                scrub: true,
            },
        });
    }
}
