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
                let targetSection = null;
                
                allTitles.forEach(title => {
                    if (title.textContent.toLowerCase().includes(targetId)) {
                        targetSection = title;
                    }
                });
                
                if (targetSection) {
                    // Calculate offset to add margin at the top
                    const offset = 100; // 100px margin from top
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}


