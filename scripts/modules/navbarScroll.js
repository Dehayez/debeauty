// Toggles .is-scrolled on the header once the user scrolls past the hero
// so the home navbar swaps from transparent/white-text to glass/dark-text.
export function initNavbarScroll() {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    if (!header || !hero) return;

    let ticking = false;

    const update = () => {
        const threshold = hero.offsetHeight - header.offsetHeight;
        header.classList.toggle('is-scrolled', window.scrollY > threshold);
        ticking = false;
    };

    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
}
