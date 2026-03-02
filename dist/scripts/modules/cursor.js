// Custom cursor functionality
export function initCursor() {
    // Use matchMedia for reliable detection — works correctly on hybrid devices
    const hasMousePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasMousePointer) return;

    // Remove existing cursor elements if they exist (for page navigation)
    const existingCursor = document.querySelector('.custom-cursor');
    const existingCircle = document.querySelector('.cursor-circle');
    if (existingCursor) existingCursor.remove();
    if (existingCircle) existingCircle.remove();

    const customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    document.body.appendChild(customCursor);

    const cursorCircle = document.createElement('div');
    cursorCircle.className = 'cursor-circle';
    document.body.appendChild(cursorCircle);

    // Verify the custom cursor is actually rendering before hiding the default one
    const cursorStyles = window.getComputedStyle(customCursor);
    if (cursorStyles.display === 'none' || cursorStyles.visibility === 'hidden' || !document.body.contains(customCursor)) {
        customCursor.remove();
        cursorCircle.remove();
        return;
    }

    // Custom cursor is confirmed working — hide default cursor via CSS
    document.body.classList.add('has-custom-cursor');

    // Restore last cursor position
    const lastX = sessionStorage.getItem('lastCursorX') || window.innerWidth / 2;
    const lastY = sessionStorage.getItem('lastCursorY') || window.innerHeight / 2;

    // Set initial position
    customCursor.style.left = lastX + 'px';
    customCursor.style.top = lastY + 'px';
    cursorCircle.style.left = lastX + 'px';
    cursorCircle.style.top = lastY + 'px';

    document.addEventListener('mousemove', (e) => {
        sessionStorage.setItem('lastCursorX', e.clientX);
        sessionStorage.setItem('lastCursorY', e.clientY);
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
        cursorCircle.style.left = e.clientX + 'px';
        cursorCircle.style.top = e.clientY + 'px';
    });

    // Use event delegation so dynamically added elements also get the hover effect
    const interactiveSelector = 'a, .service-card, .btn, button, input, textarea, select';

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) {
            customCursor.style.width = '6px';
            customCursor.style.height = '6px';
            cursorCircle.style.transition = 'none';
            cursorCircle.style.width = '10px';
            cursorCircle.style.height = '10px';
            void cursorCircle.offsetWidth;
            cursorCircle.style.transition = 'width 0.3s ease-out, height 0.3s ease-out, opacity 0.3s';
            cursorCircle.style.width = '30px';
            cursorCircle.style.height = '30px';
            cursorCircle.style.opacity = '1';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelector)) {
            customCursor.style.width = '10px';
            customCursor.style.height = '10px';
            cursorCircle.style.width = '10px';
            cursorCircle.style.height = '10px';
            cursorCircle.style.opacity = '0';
        }
    });
}
