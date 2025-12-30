// Netlify function triggered by form submission
// Sends confirmation email to the user
const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const formData = JSON.parse(event.body);
        const { name, email, phone, service, message } = formData;

        if (!name || !email) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Name and email are required' })
            };
        }

        const serviceText = service || 'Niet opgegeven';
        const phoneText = phone || 'Niet opgegeven';
        const messageText = message || 'Geen bericht';

        const emailToUser = {
            from: 'Débeauty <noreply@debeauty.be>',
            to: email,
            subject: 'Bedankt voor je bericht - Débeauty',
            html: `
                <h2>Beste ${name},</h2>
                <p>Bedankt voor je bericht! We hebben je aanvraag ontvangen en nemen zo snel mogelijk contact met je op.</p>
                <p>Hieronder een overzicht van je aanvraag:</p>
                <ul>
                    <li><strong>Gewenste behandeling:</strong> ${serviceText}</li>
                    <li><strong>Telefoon:</strong> ${phoneText}</li>
                </ul>
                ${messageText !== 'Geen bericht' ? `<p><strong>Je bericht:</strong><br>${messageText.replace(/\n/g, '<br>')}</p>` : ''}
                <p>Met vriendelijke groet,<br>Het team van Débeauty</p>
                <hr>
                <p style="font-size: 0.9em; color: #666;">
                    Débeauty<br>
                    Bookmolenstraat 124<br>
                    9200 Baasrode<br>
                    Tel: 0479 69 87 09<br>
                    Email: info@debeauty.be
                </p>
            `
        };

        if (process.env.RESEND_API_KEY) {
            const resendResponse = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
                },
                body: JSON.stringify(emailToUser)
            });

            if (!resendResponse.ok) {
                console.error('Failed to send confirmation email');
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };

    } catch (error) {
        console.error('Error in form submission handler:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};

module.exports = { handler };

