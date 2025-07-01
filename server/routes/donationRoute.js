import  userAuth from "../middleware/userAuth.js";
import CampaignModel from "../models/Campaign.js";
import DonationModel from "../models/Donation.js";
import express from "express";
const router = express.Router();


router.post("/create", userAuth, async (req, res) => {
  try {
    const { amount, message, campaign, paymentId } = req.body;
    const userId = req.user.id; // ✅ Get the user ID from middleware

    const donation = await DonationModel.create({
      amount,
      message,
      campaign,
      user: userId, // ✅ Use the decoded user ID here
      paymentId,
    });

    await CampaignModel.findByIdAndUpdate(campaign, {
      $inc: { collectedAmount: amount },
    });

    return res.status(201).json({ message: "Donation created successfully", donation });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


router.get("/get-all", userAuth, async (req, res) => {
  try {
    const donations = await DonationModel.find().populate('campaign').populate('user').sort({ createdAt: -1 });
     
    return res.status(200).json(donations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get(
  "/get-donations-by-campaign/:id",
  userAuth,
  async (req, res) => {
    try {
      const donations = await DonationModel.find({ campaign: req.params.id })
        .populate("user")
        .sort({ createdAt: -1 });
      return res.status(200).json(donations);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get("/get-my-donations", userAuth, async (req, res) => {
  try {
    const donations = await DonationModel.find({ user: req.user.id })
      .populate("campaign")
      .sort({ createdAt: -1 });
    return res.status(200).json(donations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


export default router;
