// Logo animation module - handles overlay and page reveal
export function initLogoAnimation() {
    const overlay = document.getElementById('overlay');
    const overlayLogo = document.getElementById('overlay__logo');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    if (!overlay || !overlayLogo) return;

    const tl = gsap.timeline();

    tl.to(overlayLogo, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
    })
    .to(overlayLogo, {
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        delay: 0.3,
        ease: 'power2.in'
    })
    .to(overlay, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
            overlay.style.display = 'none';
        }
    })
    .to([main, footer], {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: 'power2.out'
    }, '-=0.2');
}
