# EmailJS Setup Instructions

EmailJS is **FREE** (200 emails/month) en werkt met je bestaande Nomeo email account via SMTP!

## Snelle Setup (5 minuten):

1. **Maak een gratis account** op [https://www.emailjs.com](https://www.emailjs.com)

2. **Maak een Email Service aan**:
   - Ga naar **Email Services** → **Add New Service**
   - Kies **Custom SMTP** (of "Other" → "Custom SMTP")
   - Vul je Nomeo SMTP gegevens in:
     - **SMTP Server**: Vraag dit op bij Nomeo (meestal iets zoals `smtp.nomeo.be` of `mail.nomeo.be`)
     - **SMTP Port**: Meestal `587` (TLS) of `465` (SSL)
     - **SMTP Username**: Je volledige email adres (`info@debeauty.be`)
     - **SMTP Password**: Je email wachtwoord
     - **From Name**: Débeauty
     - **From Email**: `info@debeauty.be`
   - Test de verbinding
   - Kopieer de **Service ID** (bijv. `service_xxxxx`)

3. **Maak een Email Template aan**:
   - Ga naar **Email Templates** → **Create New Template**
   - Gebruik dit template:
   
   ```
   Subject: Nieuw contactformulier bericht van {{from_name}}
   
   Nieuw contactformulier bericht
   
   Naam: {{from_name}}
   Email: {{from_email}}
   Telefoon: {{phone}}
   Gewenste behandeling: {{service}}
   
   Bericht:
   {{message}}
   ```
   - Zet **To Email** op: `info@debeauty.be`
   - Kopieer de **Template ID** (bijv. `template_xxxxx`)

4. **Haal je Public Key op**:
   - Ga naar **Account** → **General**
   - Kopieer je **Public Key**

5. **Update de code**:
   - Open `scripts/modules/contactForm.js`
   - Vervang deze regels (rond regel 4-6):
     ```javascript
     const EMAILJS_CONFIG = {
         serviceId: 'YOUR_SERVICE_ID',
         templateId: 'YOUR_TEMPLATE_ID',
         publicKey: 'YOUR_PUBLIC_KEY'
     };
     ```
   - Met je echte waarden:
     ```javascript
     const EMAILJS_CONFIG = {
         serviceId: 'service_xxxxx',
         templateId: 'template_xxxxx',
         publicKey: 'xxxxxxxxxxxxx'
     };
     ```

6. **Deploy en test!**

Klaar! Het formulier stuurt nu emails naar info@debeauty.be via je Nomeo account.

## Gratis Tier:
- 200 emails per maand (gratis)
- Geen creditcard nodig
- Werkt op elke hosting (inclusief Netlify free plan)
- Gebruikt je bestaande Nomeo email account



