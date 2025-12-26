// Custom cursor functionality
export function initCursor() {
    const customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    document.body.appendChild(customCursor);

    const cursorCircle = document.createElement('div');
    cursorCircle.className = 'cursor-circle';
    document.body.appendChild(cursorCircle);

    // Restore last cursor position
    const lastX = sessionStorage.getItem('lastCursorX') || window.innerWidth / 2;
    const lastY = sessionStorage.getItem('lastCursorY') || window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        sessionStorage.setItem('lastCursorX', e.clientX);
        sessionStorage.setItem('lastCursorY', e.clientY);
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
        cursorCircle.style.left = e.clientX + 'px';
        cursorCircle.style.top = e.clientY + 'px';
    });

    // Cursor appearance on interactive elements
    const interactiveElements = document.querySelectorAll('a, .service-card, .btn, button, input, textarea, select');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
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
        });
        element.addEventListener('mouseleave', () => {
            customCursor.style.width = '10px';
            customCursor.style.height = '10px';
            cursorCircle.style.width = '10px';
            cursorCircle.style.height = '10px';
            cursorCircle.style.opacity = '0';
        });
    });
}


