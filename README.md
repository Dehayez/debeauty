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

The contact form requires a Resend API key to send emails. To set this up:

1. Create an account at [Resend](https://resend.com)
2. Get your API key from the Resend dashboard
3. In your Netlify site settings, go to **Site settings > Environment variables**
4. Add a new environment variable:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Your Resend API key
5. Redeploy your site

The form will send:
- An email to `info@debeauty.be` with the form submission
- A confirmation email to the user who submitted the form

**Note**: Make sure to verify your domain in Resend or use a verified email address for the "from" field in the function.
