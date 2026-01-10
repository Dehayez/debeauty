# EmailJS Setup Instructions

EmailJS is **FREE** (200 emails/month) and works on Netlify's free plan - no Pro subscription needed!

## Quick Setup (5 minutes):

1. **Create a free account** at [https://www.emailjs.com](https://www.emailjs.com)

2. **Create an Email Service**:
   - Go to **Email Services** → **Add New Service**
   - Choose **Gmail** (or any email provider)
   - Connect your email account (info@debeauty.be)
   - Copy the **Service ID**

3. **Create an Email Template**:
   - Go to **Email Templates** → **Create New Template**
   - Use this template:
   
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
   - Set **To Email** to: `info@debeauty.be`
   - Copy the **Template ID**

4. **Get your Public Key**:
   - Go to **Account** → **General**
   - Copy your **Public Key**

5. **Update the code**:
   - Open `scripts/modules/contactForm.js`
   - Replace these lines (around line 50-52):
     ```javascript
     const serviceId = 'YOUR_SERVICE_ID';
     const templateId = 'YOUR_TEMPLATE_ID';
     const publicKey = 'YOUR_PUBLIC_KEY';
     ```
   - With your actual values:
     ```javascript
     const serviceId = 'service_xxxxx';
     const templateId = 'template_xxxxx';
     const publicKey = 'xxxxxxxxxxxxx';
     ```

6. **Deploy and test!**

That's it! The form will now send emails to info@debeauty.be for free, no Netlify Pro plan needed.

## Free Tier Limits:
- 200 emails per month (free)
- No credit card required
- Works on any hosting (Netlify free plan included)



