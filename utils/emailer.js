const nodemailer = require("nodemailer");


// =======================
// TRANSPORTER
// =======================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: process.env.NODE_ENV !== "development"
  }
});


// =======================
// SEND EMAIL
// =======================
async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: `"Editable Portfolio" <${process.env.SENDER_EMAIL}>`,
      to,
      subject,
      text
    });

    console.log("Email sent to:", to);

  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Email sending failed");
  }
}

module.exports = sendEmail;
