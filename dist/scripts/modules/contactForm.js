// Contact form submission handler using Formspree (simplest solution)
export function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    const replyToInput = document.getElementById('reply-to');

    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname === '';

    form.addEventListener('submit', (e) => {
        if (isLocalhost) {
            e.preventDefault();
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

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Verzenden...';
        }

        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';

        const emailInput = form.querySelector('[name="email"]');
        if (emailInput && replyToInput) {
            replyToInput.value = emailInput.value;
        }

        const formAction = form.getAttribute('action');
        if (!formAction || formAction.includes('YOUR_FORM_ID')) {
            e.preventDefault();
            console.error('Formspree not configured');
            if (errorMessage) {
                errorMessage.innerHTML = '<p>Form service is nog niet geconfigureerd. Neem contact op met de beheerder.</p>';
                errorMessage.style.display = 'block';
            }
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Verstuur bericht';
            }
            return;
        }

        fetch(formAction, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
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
                return response.json().then(data => {
                    throw new Error(data.error || 'Form submission failed');
                });
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

