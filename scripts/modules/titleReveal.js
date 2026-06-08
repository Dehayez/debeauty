// Splits big serif titles into words and fades+rises each on scroll.
import { setupGsap, prefersReducedMotion } from './gsap.js';

const TITLE_SELECTORS = [
    '.hero__title',
    '.page-header__title',
    '.about__subtitle',
    '.values__title',
    '.detailed-services__title',
    '.services-cta__title',
    '.cta-duo__title',
];

function splitIntoWords(el) {
    if (el.dataset.split === 'true') return Array.from(el.querySelectorAll('.reveal-word > span'));

    const text = el.textContent.trim();
    if (!text) return [];
    el.textContent = '';

    const inners = [];
    text.split(/(\s+)/).forEach(chunk => {
        if (!chunk) return;
        if (/^\s+$/.test(chunk)) {
            el.appendChild(document.createTextNode(' '));
            return;
        }
        const wrap = document.createElement('span');
        wrap.className = 'reveal-word';
        const inner = document.createElement('span');
        inner.textContent = chunk;
        wrap.appendChild(inner);
        el.appendChild(wrap);
        inners.push(inner);
    });
    el.dataset.split = 'true';
    return inners;
}

export function initTitleReveal() {
    if (!setupGsap()) return;
    if (prefersReducedMotion()) return;

    const titles = document.querySelectorAll(TITLE_SELECTORS.join(','));
    if (!titles.length) return;

    titles.forEach(title => {
        const inners = splitIntoWords(title);
        if (!inners.length) return;

        gsap.set(inners, { opacity: 0, y: '0.4em' });
        gsap.to(inners, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
                trigger: title,
                start: 'top 95%',
                once: true,
            },
        });
    });
}
