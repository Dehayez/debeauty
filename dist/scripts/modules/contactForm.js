// Contact form submission handler using EmailJS
// Configureer deze waarden na het aanmaken van je EmailJS account
const EMAILJS_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY'
};

export function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');

    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname === '';

    // Check if EmailJS is configured
    const isConfigured = EMAILJS_CONFIG.serviceId !== 'YOUR_SERVICE_ID' && 
                         EMAILJS_CONFIG.templateId !== 'YOUR_TEMPLATE_ID' && 
                         EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY';

    // Initialize EmailJS if configured
    if (isConfigured && typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Verzenden...';
        }

        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';

        const phoneInput = form.querySelector('[name="phone"]');
        const phoneValue = phoneInput?.value || '';
        const formData = {
            from_name: form.querySelector('[name="name"]').value,
            from_email: form.querySelector('[name="email"]').value,
            phone: phoneValue ? String(phoneValue) : '',
            service: form.querySelector('[name="service"]')?.value || 'Niet opgegeven',
            message: form.querySelector('[name="message"]')?.value || ''
        };

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

        if (!isConfigured || typeof emailjs === 'undefined') {
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

        emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            formData
        )
        .then(() => {
            if (successMessage) {
                successMessage.style.display = 'block';
                form.reset();
                setTimeout(() => {
                    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            if (errorMessage) {
                errorMessage.style.display = 'block';
                errorMessage.innerHTML = '<p>Er is een fout opgetreden. Probeer het later opnieuw of neem direct contact op via info@debeauty.be</p>';
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

