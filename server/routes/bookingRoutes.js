import express from "express";
import userAuth from "../middleware/userAuth.js";
import BookingModel from "../models/Booking.js";
import HallModel from "../models/Hall.js";


const router = express.Router();


router.post("/create", userAuth, async (req, res) => {
  try {
    const {
      hall,
      date,
      duration,
      eventType,
      guests,
      requirements,
      message,
      amount,
      paymentIntentId,
    } = req.body;

    const booking = await BookingModel.create({
      user: req.user.id,
      hall,
      date,
      duration,
      eventType,
      guests,
      requirements,
      message,
      amount,
      paymentIntentId,
    });

   
    await HallModel.findByIdAndUpdate(hall, { isAvailable: false });

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-all", userAuth, async (req, res) => {
  try {
    const bookings = await BookingModel.find()
      .populate("user", "-password")
      .populate("hall")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/get-my-bookings", userAuth, async (req, res) => {
  try {
    const bookings = await BookingModel.find({ user: req.user.id })
      .populate("hall")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/cancel/:id", userAuth, async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to cancel this booking" });
    }

    await booking.deleteOne();

    
    await HallModel.findByIdAndUpdate(booking.hall, { isAvailable: true });

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/get/:id", userAuth, async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.id)
      .populate("user", "-password")
      .populate("hall");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put("/update/:id", userAuth, async (req, res) => {
  try {
    const updated = await BookingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("user").populate("hall");

    res.status(200).json({
      message: "Booking updated",
      booking: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
