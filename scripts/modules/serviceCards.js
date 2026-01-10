// Service card click functionality with smooth scroll
export function initServiceCards() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.service-card__title').textContent.toLowerCase();
            let targetId = '';
            
            // Map service card titles to corresponding price list sections
            switch(title) {
                case 'gelaatsbehandeling':
                    targetId = 'gelaatsbehandeling';
                    break;
                case 'manicure':
                    targetId = 'manicure';
                    break;
                case 'pedicure':
                    targetId = 'pedicure';
                    break;
                case 'massage':
                    targetId = 'massage';
                    break;
                case 'epilatie':
                    targetId = 'epilatie';
                    break;
                case 'make-up':
                    targetId = 'make-up';
                    break;
            }
            
            if (targetId) {
                // Find the service category section by looking for the title text
                const allTitles = document.querySelectorAll('.service-category__title');
                let targetTitle = null;
                
                allTitles.forEach(title => {
                    if (title.textContent.toLowerCase().includes(targetId)) {
                        targetTitle = title;
                    }
                });
                
                if (targetTitle) {
                    // Get the entire service-category container (parent element)
                    const targetCategory = targetTitle.closest('.service-category');
                    
                    if (targetCategory) {
                        // Get navbar height dynamically
                        const navbar = document.querySelector('.header');
                        const navbarHeight = navbar ? navbar.offsetHeight : 70;
                        
                        // Get element position and dimensions
                        const elementRect = targetCategory.getBoundingClientRect();
                        const elementTop = elementRect.top + window.scrollY;
                        const elementHeight = elementRect.height;
                        
                        // Calculate scroll position to center the element in viewport
                        // Center the entire service category section in the middle of the visible area
                        const viewportHeight = window.innerHeight;
                        const elementCenter = elementTop + (elementHeight / 2);
                        // Center in visible area below navbar
                        const visibleCenter = (viewportHeight / 2) + (navbarHeight / 2);
                        const scrollPosition = elementCenter - visibleCenter;
                        
                        window.scrollTo({
                            top: Math.max(0, scrollPosition),
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
}







