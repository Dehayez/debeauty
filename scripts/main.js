document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is working!');

    // Animate overlay logo to navbar center, then fade in content
    const overlay = document.getElementById('overlay');
    const overlayLogo = document.getElementById('overlay__logo');
    const navbarLogo = document.getElementById('navbar__logo');
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    if (overlay && overlayLogo && navbarLogo) {
        if (sessionStorage.getItem('logoAnimationPlayed')) {
            overlay.remove();
            main.style.opacity = '1';
            main.style.pointerEvents = 'auto';
            if (footer) {
                footer.style.opacity = '1';
                footer.style.pointerEvents = 'auto';
            }
        } else {
            setTimeout(() => {
                // Make sure navbar is visible for accurate measurement
                header.style.opacity = '1';
                header.style.pointerEvents = 'auto';

                // Get bounding rectangles
                const overlayRect = overlayLogo.getBoundingClientRect();
                const navbarRect = navbarLogo.getBoundingClientRect();
                // Calculate translation and scale
                const deltaX = navbarRect.left + navbarRect.width / 2 - (overlayRect.left + overlayRect.width / 2);
                const deltaY = navbarRect.top + navbarRect.height / 2 - (overlayRect.top + overlayRect.height / 2);
                const scale = navbarLogo.offsetWidth / overlayLogo.offsetWidth;

                // Animate overlay logo with fast-then-slow timing
                overlayLogo.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
                overlayLogo.style.transition = 'transform 0.65s cubic-bezier(0.77,0,0.175,1), opacity 0.35s';

                // After animation, fade out overlay and fade in content
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    main.style.opacity = '1';
                    main.style.pointerEvents = 'auto';
                    if (footer) {
                        footer.style.opacity = '1';
                        footer.style.pointerEvents = 'auto';
                    }
                }, 500);

                // Move logo element to navbar and remove overlay
                setTimeout(() => {
                    overlayLogo.style.transform = '';
                    overlayLogo.style.transition = '';
                    navbarLogo.replaceWith(overlayLogo);
                    overlayLogo.id = 'navbar__logo';
                    overlayLogo.className = 'navbar__logo';
                    overlayLogo.removeAttribute('style');
                    overlay.remove();
                }, 900);
                sessionStorage.setItem('logoAnimationPlayed', 'true');
            }, 200);
        }
    }

    // Three-dot worm trail with solid connectors
    const dot1 = document.createElement('div');
    dot1.className = 'cursor-worm__dot';
    document.body.appendChild(dot1);

    const dot2 = document.createElement('div');
    dot2.className = 'cursor-worm__dot';
    document.body.appendChild(dot2);

    const dot3 = document.createElement('div');
    dot3.className = 'cursor-worm__dot';
    document.body.appendChild(dot3);

    const connector1 = document.createElement('div');
    connector1.className = 'cursor-worm__connector';
    document.body.appendChild(connector1);

    const connector2 = document.createElement('div');
    connector2.className = 'cursor-worm__connector';
    document.body.appendChild(connector2);

    const RADIUS = 15; // 30px diameter
    let pos1 = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos2 = { ...pos1 };
    let pos3 = { ...pos1 };

    document.addEventListener('mousemove', (e) => {
        pos1.x = e.clientX;
        pos1.y = e.clientY;
    });

    function animate() {
        // Each dot follows the previous with lag
        pos2.x += (pos1.x - pos2.x) * 0.18;
        pos2.y += (pos1.y - pos2.y) * 0.18;
        pos3.x += (pos2.x - pos3.x) * 0.18;
        pos3.y += (pos2.y - pos3.y) * 0.18;

        // Position dots
        gsap.set(dot1, { x: pos1.x - RADIUS, y: pos1.y - RADIUS });
        gsap.set(dot2, { x: pos2.x - RADIUS, y: pos2.y - RADIUS });
        gsap.set(dot3, { x: pos3.x - RADIUS, y: pos3.y - RADIUS });

        // Connector 1: between dot1 and dot2
        connectDots(dot1, dot2, connector1);
        // Connector 2: between dot2 and dot3
        connectDots(dot2, dot3, connector2);

        requestAnimationFrame(animate);
    }

    function connectDots(dotA, dotB, connector) {
        // Get center positions
        const a = dotA.getBoundingClientRect();
        const b = dotB.getBoundingClientRect();
        const ax = a.left + RADIUS;
        const ay = a.top + RADIUS;
        const bx = b.left + RADIUS;
        const by = b.top + RADIUS;
        const dx = bx - ax;
        const dy = by - ay;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        const connectorWidth = distance + RADIUS * 2;
        const midX = (ax + bx) / 2 - connectorWidth / 2;
        const midY = (ay + by) / 2 - RADIUS;
        gsap.set(connector, {
            x: midX,
            y: midY,
            width: connectorWidth,
            height: RADIUS * 2,
            borderRadius: RADIUS,
            rotate: angle,
        });
    }

    animate();
});