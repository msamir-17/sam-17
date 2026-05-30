const sendContactEmail = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields (name, email, message) are required' });
        }

        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            console.error("Resend API key is missing in environment variables!");
            return res.status(500).json({ message: 'Email configuration is missing on the server.' });
        }

        const emailUser = process.env.EMAIL_USER || 'samirkhan003786@gmail.com';

        // Prepare payload for Resend
        // Note: Free tier Resend accounts can only send from onboarding@resend.dev to the owner's email address.
        const payload = {
            from: 'Portfolio Contact Form <onboarding@resend.dev>',
            to: emailUser,
            reply_to: email, // Direct replies go to the visitor's email
            subject: `New Message from ${name} via Portfolio`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
                    <h2 style="color: #3b82f6; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Portfolio Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #3b82f6;">
                        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #9ca3af;">This email was sent automatically from your portfolio contact form.</p>
                </div>
            `
        };

        // Send via Resend HTTP REST API
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resendApiKey}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Resend API failed:', errorText);
            throw new Error(`Resend API returned status ${response.status}`);
        }

        const data = await response.json();
        console.log('Email sent successfully via Resend:', data.id);

        res.status(200).json({ message: 'Email sent successfully!' });

    } catch (err) {
        console.error('Contact email error:', err);
        res.status(500).json({ message: 'Error sending email. Please try again later.' });
    }
};

module.exports = { sendContactEmail };
