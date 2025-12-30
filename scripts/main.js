// Main entry point - initializes all modules
import { initCursor } from './modules/cursor.js';
import { initServiceCards } from './modules/serviceCards.js';
import { initLogoAnimation } from './modules/logoAnimation.js';
import { initWormTrail } from './modules/wormTrail.js';
import { initHamburgerMenu } from './modules/hamburgerMenu.js';
import { initNavbarSwirl } from './modules/navbarSwirl.js';
import { initContactForm } from './modules/contactForm.js';

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initServiceCards();
    initLogoAnimation();
    initWormTrail();
    initHamburgerMenu();
    initNavbarSwirl();
    initContactForm();
});
