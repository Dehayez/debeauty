// Diensten page: staggered card entry + slow image zoom on scroll, per-category title slide-in.
import { setupGsap, prefersReducedMotion } from './gsap.js';

export function initServiceCardsReveal() {
    const grid = document.querySelector('.services__grid');
    const categories = document.querySelectorAll('.service-category');
    if (!grid && !categories.length) return;
    if (!setupGsap()) return;
    if (prefersReducedMotion()) return;

    if (grid) {
        const cards = grid.querySelectorAll('.service-card');
        if (cards.length) {
            gsap.set(cards, { opacity: 0, y: 40, scale: 0.96 });
            gsap.to(cards, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                ease: 'power3.out',
                stagger: { each: 0.08, from: 'start' },
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 85%',
                    once: true,
                },
            });

            cards.forEach(card => {
                const img = card.querySelector('.service-card__image img');
                if (!img) return;
                gsap.fromTo(img,
                    { scale: 1 },
                    {
                        scale: 1.12,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    }
                );
            });
        }
    }

    categories.forEach(category => {
        const title = category.querySelector('.service-category__title');
        const items = category.querySelectorAll('.service-item');

        if (title) {
            gsap.set(title, { opacity: 0, x: -24 });
            gsap.to(title, {
                opacity: 1,
                x: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: category,
                    start: 'top 90%',
                    once: true,
                },
            });
        }

        if (items.length) {
            gsap.set(items, { opacity: 0, y: 18 });
            gsap.to(items, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.06,
                scrollTrigger: {
                    trigger: category,
                    start: 'top 88%',
                    once: true,
                },
            });
        }
    });
}
