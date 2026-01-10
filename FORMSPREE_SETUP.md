# Formspree Setup - Super Simple! (2 minutes)

Formspree is the **simplest** solution - just 2 steps and it works!

## Setup:

1. **Go to [formspree.io](https://formspree.io)** and sign up (free)

2. **Create a new form**:
   - Click "New Form"
   - Set **Email to receive submissions** to: `info@debeauty.be`
   - Copy your **Form ID** (looks like: `xrgkqyvw` or `YOUR_FORM_ID`)

3. **Update the form action**:
   - Open `contact.html`
   - Find this line (around line 99):
     ```html
     <form class="contact__form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
     ```
   - Replace `YOUR_FORM_ID` with your actual Form ID:
     ```html
     <form class="contact__form" id="contact-form" action="https://formspree.io/f/xrgkqyvw" method="POST">
     ```

4. **Deploy and test!**

That's it! The form will now send emails to `info@debeauty.be` automatically.

## Free Tier:
- 50 submissions per month (free)
- No credit card needed
- Works immediately
- No API keys or complex setup

## That's literally it! 🎉



