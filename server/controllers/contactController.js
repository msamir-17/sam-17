const nodemailer = require('nodemailer');

const sendContactEmail = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields (name, email, message) are required' });
        }

        // Setup Nodemailer transporter using credentials from .env
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email layout
        const mailOptions = {
            from: `Portfolio Contact Form <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send email to the admin
            replyTo: email, // If the admin replies, it goes to the visitor's email
            subject: `New Message from ${name} via Portfolio`,
            text: `You received a new message from your portfolio contact form.\n\n` +
                  `Name: ${name}\n` +
                  `Email: ${email}\n\n` +
                  `Message:\n${message}`,
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

        // Send the mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully!' });

    } catch (err) {
        console.error('Contact email error:', err);
        res.status(500).json({ message: 'Error sending email. Please try again later.' });
    }
};

module.exports = { sendContactEmail };
