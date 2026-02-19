// Worm trail animation
export function initWormTrail() {
    // Skip worm trail on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

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
    
    const RADIUS = 19.5;
    const lastX = sessionStorage.getItem('lastCursorX') || window.innerWidth / 2;
    const lastY = sessionStorage.getItem('lastCursorY') || window.innerHeight / 2;
    
    let pos1 = { x: parseInt(lastX), y: parseInt(lastY) };
    let pos2 = { x: parseInt(lastX), y: parseInt(lastY) };
    let pos3 = { x: parseInt(lastX), y: parseInt(lastY) };
    let actualMousePos = { x: parseInt(lastX), y: parseInt(lastY) };
    const mousePositions = [];
    const positionHistoryLength = 5;
    
    for (let i = 0; i < positionHistoryLength; i++) {
        mousePositions.push({ x: parseInt(lastX), y: parseInt(lastY) });
    }
    
    document.addEventListener('mousemove', (e) => {
        actualMousePos.x = e.clientX;
        actualMousePos.y = e.clientY;
        mousePositions.unshift({ x: e.clientX, y: e.clientY });
        if (mousePositions.length > positionHistoryLength) {
            mousePositions.pop();
        }
    });
    
    function animate() {
        // Ease-in-out: move faster when far away, slower as it approaches
        const dist1 = Math.sqrt((actualMousePos.x - pos1.x) ** 2 + (actualMousePos.y - pos1.y) ** 2);
        const ease1 = 0.06 + 0.1 * Math.min(1, dist1 / 200);
        pos1.x += (actualMousePos.x - pos1.x) * ease1;
        pos1.y += (actualMousePos.y - pos1.y) * ease1;

        const dist2 = Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
        const ease2 = 0.05 + 0.11 * Math.min(1, dist2 / 200);
        pos2.x += (pos1.x - pos2.x) * ease2;
        pos2.y += (pos1.y - pos2.y) * ease2;

        const distanceX = pos2.x - pos3.x;
        const distanceY = pos2.y - pos3.y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const accelerationFactor = 0.04 + 0.12 * Math.min(1, distance / 200);
        pos3.x += distanceX * accelerationFactor;
        pos3.y += distanceY * accelerationFactor;
        gsap.set(dot1, { x: pos1.x - RADIUS, y: pos1.y - RADIUS });
        gsap.set(dot2, { x: pos2.x - RADIUS, y: pos2.y - RADIUS });
        gsap.set(dot3, { x: pos3.x - RADIUS, y: pos3.y - RADIUS });
        connectDots(dot1, dot2, connector1);
        connectDots(dot2, dot3, connector2);
        requestAnimationFrame(animate);
    }
    
    function connectDots(dotA, dotB, connector) {
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
}
