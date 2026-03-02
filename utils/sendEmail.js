const { BrevoClient } = require("@getbrevo/brevo");

const sendEmail = async (to, otp) => {
    const brevo = new BrevoClient({
        apiKey: process.env.BREVO_API_KEY,
    });

    await brevo.transactionalEmails.sendTransacEmail({
        sender: { email: "talentsphere26@gmail.com", name: "Talent Sphere" },
        to: [{ email: to }],
        subject: "Verify Your Email",
        htmlContent: `<h2>Your OTP is: ${otp}</h2>`,
    });
};

module.exports = { sendEmail };