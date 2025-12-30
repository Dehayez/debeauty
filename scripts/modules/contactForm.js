// Contact form submission handler using Netlify Functions
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

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || '',
            service: formData.get('service') || '',
            message: formData.get('message') || ''
        };

        if (isLocalhost) {
            console.log('Localhost detected - simulating form submission:', data);
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

        fetch('/.netlify/functions/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(result => {
            if (result.success) {
                if (successMessage) {
                    successMessage.style.display = 'block';
                    form.reset();
                    setTimeout(() => {
                        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            } else {
                throw new Error(result.error || 'Unknown error');
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

