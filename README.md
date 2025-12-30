# Débeauty

## Local Development

The contact form works differently in local vs production:

- **Localhost**: The form will simulate a successful submission (no actual emails sent)
- **Production (Netlify)**: The form will send actual emails using Netlify Functions

### Running Locally

```bash
yarn dev
```

This starts the development server on `http://localhost:3001`. The contact form will work but only simulate email sending.

### Testing with Real Email Functionality Locally

To test the actual email functionality locally, use Netlify Dev:

```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Run Netlify Dev (this will use your Netlify Functions locally)
netlify dev
```

## Email Setup (Production)

The contact form uses **Netlify Forms** which is built-in and requires no API keys!

### Setup Steps:

1. **Deploy your site to Netlify** (if not already deployed)
2. **Go to Netlify Dashboard** → Your site → **Forms**
3. **Configure email notifications**:
   - Click on the "contact" form
   - Go to **Notifications** tab
   - Click **Add notification**
   - Select **Email notification**
   - Enter: `info@debeauty.be`
   - Save

That's it! The form will now send emails to `info@debeauty.be` whenever someone submits the form.

### Optional: Confirmation Emails

If you want to send confirmation emails to users, you can:
1. Set up a Resend account (free tier available)
2. Add `RESEND_API_KEY` as an environment variable in Netlify
3. The confirmation email function will automatically work

**Note**: The main email to `info@debeauty.be` works immediately with just Netlify Forms - no external services needed!
