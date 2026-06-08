// Main entry point - initializes all modules
import { initCursor } from './modules/cursor.js';
import { initServiceCards } from './modules/serviceCards.js';
import { initLogoAnimation } from './modules/logoAnimation.js';
import { initWormTrail } from './modules/wormTrail.js';
import { initHamburgerMenu } from './modules/hamburgerMenu.js';
import { initNavbarSwirl } from './modules/navbarSwirl.js';
import { initNavbarScroll } from './modules/navbarScroll.js';
import { initContactForm } from './modules/contactForm.js';
import { initHeroParallax } from './modules/heroParallax.js';
import { initTitleReveal } from './modules/titleReveal.js';
import { initScrollReveal } from './modules/scrollReveal.js';
import { initServiceCardsReveal } from './modules/serviceCardsReveal.js';

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initServiceCards();
    initLogoAnimation();
    initWormTrail();
    initHamburgerMenu();
    initNavbarSwirl();
    initNavbarScroll();
    initContactForm();

    initTitleReveal();
    initHeroParallax();
    initServiceCardsReveal();
    initScrollReveal();
});
