// Tasteful fade/slide-in reveals tied to scroll position.
import { setupGsap, prefersReducedMotion } from './gsap.js';

// Selectors that get a simple single-element reveal.
const REVEAL_TARGETS = [
    '.page-header__subtitle',
    '.about__text',
    '.services-cta__text',
    '.services-cta .btn',
    '.contact__subtitle',
    '.contact__form',
    '.contact__info',
];

// Containers whose direct children should reveal in a stagger.
const STAGGER_GROUPS = [
    '.features__grid',
    '.values__grid',
    '.team__grid',
    '.cta-duo',
    '.service-category__items',
];

export function initScrollReveal() {
    if (!setupGsap()) return;
    if (prefersReducedMotion()) return;

    REVEAL_TARGETS.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            gsap.set(el, { opacity: 0, y: 32 });
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 92%',
                    once: true,
                },
            });
        });
    });

    STAGGER_GROUPS.forEach(selector => {
        document.querySelectorAll(selector).forEach(group => {
            const children = Array.from(group.children);
            if (!children.length) return;
            gsap.set(children, { opacity: 0, y: 32 });
            gsap.to(children, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.09,
                scrollTrigger: {
                    trigger: group,
                    start: 'top 90%',
                    once: true,
                },
            });
        });
    });
}
