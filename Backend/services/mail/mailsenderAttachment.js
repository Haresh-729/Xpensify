const nodemailer = require("nodemailer");
require("dotenv").config();

const mailsenderAttachment = async (emails, subject, body, pdfPath) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Git Win It Team" <${process.env.MAIL_USER}>`,
      to: emails, // Comma-separated emails
      subject: subject,
      html: body,
      attachments: [
        {
          filename: "report.pdf",
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
};

module.exports = mailsenderAttachment;
