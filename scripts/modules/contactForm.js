// Contact form submission handler using Netlify Forms
export function initContactForm() {
    const form = document.querySelector('.contact__form');
    if (!form) return;

    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');

    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname === '';

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Verzenden...';
        }

        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';

        if (isLocalhost) {
            console.log('Localhost detected - simulating form submission');
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = 'block';
                    successMessage.innerHTML = '<p>✓ Formulier succesvol verzonden! (Lokaal - emails worden alleen verzonden op de live versie)</p>';
                    form.reset();
                    setTimeout(() => {
                        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Verstuur bericht';
                }
            }, 1000);
            return;
        }

        const formData = new FormData(form);
        
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(response => {
            if (response.ok) {
                if (successMessage) {
                    successMessage.style.display = 'block';
                    form.reset();
                    setTimeout(() => {
                        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            if (errorMessage) {
                errorMessage.style.display = 'block';
            }
        })
        .finally(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Verstuur bericht';
            }
        });
    });
}

