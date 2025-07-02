import express from "express";
import transporter from "../config/nodemailer.js"
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/request", async (req, res) => {
  const {
    name,
    email,
    phone,
    date,
    time,
    eventType,
    location,
    budget,
    priestName,
    message,
  } = req.body;

  try {
    await transporter.sendMail({
      from: `"Gujarati Samaj Trust" <${process.env.SENDER_EMAIL}>`,
      to: process.env.SENDER_EMAIL, 
      subject: ` New Priest Service Request from ${name}`,
      html: `
        <h2> Priest Service Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Date:</strong> ${date} at ${time}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Preferred Priest:</strong> ${priestName || "Any"}</p>
        <p><strong>Budget:</strong> ₹${budget}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
      `,
    });

    res.status(200).json({ success: true, message: "Request sent successfully" });
  } catch (error) {
    console.error("Email Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to send request" });
  }
});

export default router;
