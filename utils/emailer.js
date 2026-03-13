const SibApiV3Sdk = require('sib-api-v3-sdk');

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;

if (!BREVO_API_KEY) throw new Error("BREVO_API_KEY is missing in .env");

if (!SENDER_EMAIL) throw new Error("SENDER_EMAIL is missing in .env");


// Configure API key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = BREVO_API_KEY;

const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi();

// =======================
// Helper
// =======================
async function sendBrevoMail({ to, subject, html, text, replyTo }) {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.sender = {
    name: "From Your Portfolio Website",
    email: SENDER_EMAIL,
  };

  sendSmtpEmail.to = Array.isArray(to)
    ? to.map(email => ({ email }))
    : [{ email: to }];

  sendSmtpEmail.subject = subject;

  if (html) sendSmtpEmail.htmlContent = html;
  if (text) sendSmtpEmail.textContent = text;

  if (replyTo) {
    sendSmtpEmail.replyTo = { email: replyTo };
  }

  return transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
}

// =======================
// OTP EMAILER
// =======================
async function otpEmailer(ownerEmail, subject, message) {
  await sendBrevoMail({
    to: ownerEmail,
    subject: subject || "Your OTP Code",
    html: `
          <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border:1px solid #d2d2d2; border-radius:8px; overflow:hidden;">
            <!-- Header -->
            <div style="background-color:#2d2d2d; padding:15px; text-align:left;">
              <h2 style="margin:0; color:#eeeeee; font-size:20px;"> 📩 Your OTP Code </h2>
            </div>
            <!-- Body Content -->
            <div style="padding:20px; padding-top:16px;">
              <hr style="margin:17px 0; border:none; border-top:1px solid #dddddd;" />

              <p style="margin-bottom:10px;"> <strong>Message:</strong> </p>

              <div style="background:#eaeaea; padding:15px; border-radius:6px;">
                  ${message.replace(/\b\d{4,8}\b/, '<span style="font-size:16px;font-weight:bold;color:#2d89ef;letter-spacing:2px;">$&</span>')}
              </div>

              <hr style="margin:20px 0; border:none; border-top:1px solid #dddddd;" />

              <p style="font-size:12px; color:#888888; margin-top:20px;">
                This message was sent from your portfolio contact form.
              </p>
            </div>
          </div>
    `,
  });

  console.log("OTP sent to:", ownerEmail);
}


module.exports = { otpEmailer };