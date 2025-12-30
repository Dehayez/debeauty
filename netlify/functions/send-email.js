// Netlify serverless function to send emails
// Requires RESEND_API_KEY environment variable in Netlify

const handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const formData = JSON.parse(event.body);
        const { name, email, phone, service, message } = formData;

        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not set');
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Email service not configured' })
            };
        }

        const serviceText = service || 'Niet opgegeven';
        const phoneText = phone || 'Niet opgegeven';
        const messageText = message || 'Geen bericht';

        const emailToOwner = {
            from: 'Débeauty Contactformulier <noreply@debeauty.be>',
            to: 'info@debeauty.be',
            subject: `Nieuw contactformulier bericht van ${name}`,
            html: `
                <h2>Nieuw contactformulier bericht</h2>
                <p><strong>Naam:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Telefoon:</strong> ${phoneText}</p>
                <p><strong>Gewenste behandeling:</strong> ${serviceText}</p>
                <p><strong>Bericht:</strong></p>
                <p>${messageText.replace(/\n/g, '<br>')}</p>
            `
        };

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
                ${messageText ? `<p><strong>Je bericht:</strong><br>${messageText.replace(/\n/g, '<br>')}</p>` : ''}
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

        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify(emailToOwner)
        });

        if (!resendResponse.ok) {
            const errorData = await resendResponse.json();
            console.error('Resend API error:', errorData);
            throw new Error('Failed to send email to owner');
        }

        const confirmationResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify(emailToUser)
        });

        if (!confirmationResponse.ok) {
            console.error('Failed to send confirmation email, but owner email was sent');
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true,
                message: 'Email sent successfully' 
            })
        };

    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Failed to send email',
                details: error.message 
            })
        };
    }
};

module.exports = { handler };

