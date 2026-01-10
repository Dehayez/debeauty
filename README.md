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

The contact form uses **Netlify Forms** which is built-in and requires **NO API keys**!

### Step-by-Step Setup:

1. **Deploy your site to Netlify** (if not already deployed)

2. **Go to Netlify Dashboard**:
   - Open your site in Netlify
   - Click on **Forms** in the left sidebar
   - You should see a form named "contact" (if not, submit the form once to create it)

3. **Configure Email Notifications**:
   - Click on the **"contact"** form
   - Click on the **"Notifications"** tab (or "Settings" → "Notifications")
   - Click **"Add notification"** button
   - Select **"Email notification"**
   - In the **"Send to"** field, enter: `info@debeauty.be`
   - (Optional) Customize the email subject if you want
   - Click **"Save"** or **"Add notification"**

4. **Test it**:
   - Submit the form on your live site
   - Check your email at `info@debeauty.be`
   - You should receive an email with the form submission

### Troubleshooting:

**No emails received?**
- Check your spam/junk folder
- Make sure the form submission appears in Netlify → Forms → contact → Submissions
- Verify the email address is correct in the notification settings
- Check that notifications are enabled (not paused)

**Form not showing in Netlify Forms?**
- Submit the form once on your live site (not localhost)
- Wait a few minutes and refresh the Forms page
- Make sure the form has `netlify` attribute in the HTML

**Note**: Netlify Forms is free and works immediately - no external services or API keys needed!
