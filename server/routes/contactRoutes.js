import express from "express";
import transporter from "../config/nodemailer.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const result = await transporter.sendMail({
      from: `"Contact Form" <${process.env.SENDER_EMAIL}>`,
      to: process.env.SENDER_EMAIL,
      subject: "New Message from Website Contact Form",
      html: `
        <h3>New message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Email failed to send",
        error: error.message,
      });
  }
});

export default router;
