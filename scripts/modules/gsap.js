// Shared GSAP setup: registers ScrollTrigger and exposes a reduced-motion check.
let registered = false;

export function setupGsap() {
    if (registered) return true;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return false;
    gsap.registerPlugin(ScrollTrigger);
    // Flag the inline safety-net timer reads. The .has-scroll-reveal class
    // was already added in <head> before paint.
    window.__scrollRevealReady = true;
    registered = true;
    return true;
}

export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
