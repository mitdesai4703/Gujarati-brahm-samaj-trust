import express from "express";
import LadiesEvent from "../models/LadiesEvent.js";
import transporter from "../config/nodemailer.js"
import dotenv from "dotenv";
dotenv.config();


const router = express.Router();


router.post("/create", async (req, res) => {
  try {
    const newEvent = new LadiesEvent(req.body);
    await newEvent.save();
    res.status(201).json({ message: "Event created", event: newEvent });
  } catch (err) {
    res.status(500).json({ message: "Failed to create event", error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const events = await LadiesEvent.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events", error: err.message });
  }
});


router.put("/update/:id", async (req, res) => {
  try {
    const updated = await LadiesEvent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated", event: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update event", error: err.message });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await LadiesEvent.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted", event: deleted });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete event", error: err.message });
  }
});

router.post("/join", async (req, res) => {
  const { name, phone, email, area, message } = req.body;

  if (!name || !phone || !email || !area) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  try {
    const mailOptions = {
      from: `"Ladies Group" <${process.env.SMTP_USER}>`,
      to: process.env.SENDER_EMAIL,
      subject: "New Ladies Group Join Request",
      html: `
        <h2>New Member Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Area:</strong> ${area}</p>
        <p><strong>Message:</strong> ${message || "No message"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
     console.log("Ladies Group email sent!");
    res.status(200).json({ message: "Request sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});
export default router;
