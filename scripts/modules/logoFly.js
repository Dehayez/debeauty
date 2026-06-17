// Shared helpers for the home hero logo flight (splash + scroll).
export function pinLogoAtRect(logo, rect) {
    logo.style.position = 'fixed';
    logo.style.top = `${rect.top}px`;
    logo.style.left = `${rect.left}px`;
    logo.style.width = `${rect.width}px`;
    logo.style.height = `${rect.height}px`;
    logo.style.margin = '0';
    logo.style.transform = 'none';
    logo.style.zIndex = '1001';
    logo.classList.add('hero__logo--flying');
}

export function moveLogoToBody(logo) {
    if (logo.parentElement !== document.body) {
        document.body.appendChild(logo);
    }
}

export function getRectCenter(el) {
    const rect = el.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
    };
}

export function getTransformToTarget(sourceEl, targetEl) {
    const sourceRect = sourceEl.getBoundingClientRect();
    const target = getRectCenter(targetEl);
    const scale = target.width / sourceEl.offsetWidth;
    const sourceX = sourceRect.left + sourceRect.width / 2;
    const sourceY = sourceRect.top + sourceRect.height / 2;
    const deltaX = target.x - sourceX;
    const deltaY = target.y - sourceY;
    return `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
}
