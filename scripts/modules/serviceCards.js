// Parse price string and extract numeric values
function parsePrice(priceText) {
    const cleaned = priceText.replace(/[€\s]/g, '');
    const prices = [];
    
    // Handle range prices (e.g., "70-90" or "12-18")
    if (cleaned.includes('-')) {
        const [min, max] = cleaned.split('-').map(p => parseFloat(p));
        if (!isNaN(min)) prices.push(min);
        if (!isNaN(max)) prices.push(max);
    } else {
        const price = parseFloat(cleaned);
        if (!isNaN(price)) prices.push(price);
    }
    
    return prices;
}

// Calculate min and max prices for a service category
function calculatePriceRange(categoryTitle) {
    const allCategories = document.querySelectorAll('.service-category');
    let targetCategory = null;
    
    allCategories.forEach(category => {
        const title = category.querySelector('.service-category__title');
        if (title && title.textContent.trim().toLowerCase() === categoryTitle.toLowerCase()) {
            targetCategory = category;
        }
    });
    
    if (!targetCategory) return null;
    
    const items = targetCategory.querySelectorAll('.service-item');
    const allPrices = [];
    
    items.forEach(item => {
        const priceElement = item.querySelector('.service-item__price');
        if (priceElement) {
            const prices = parsePrice(priceElement.textContent);
            allPrices.push(...prices);
        }
    });
    
    if (allPrices.length === 0) return null;
    
    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    
    return { min, max };
}

// Update service card prices
function updateServiceCardPrices() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    const categoryMap = {
        'gelaatsbehandeling': 'Gelaatsbehandeling',
        'manicure': 'Manicure',
        'pedicure': 'Pedicure',
        'massage': 'Massage',
        'epilatie': 'Epilatie',
        'make-up': 'Make-up'
    };
    
    serviceCards.forEach(card => {
        const titleElement = card.querySelector('.service-card__title');
        if (!titleElement) return;
        
        const cardTitle = titleElement.textContent.trim().toLowerCase();
        const categoryName = categoryMap[cardTitle];
        
        if (categoryName) {
            const priceRange = calculatePriceRange(categoryName);
            const priceElement = card.querySelector('.service-card__price');
            
            if (priceRange && priceElement) {
                if (priceRange.min === priceRange.max) {
                    priceElement.textContent = `${priceRange.min}`;
                } else {
                    priceElement.textContent = `${priceRange.min} - ${priceRange.max}`;
                }
            }
        }
    });
}

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







