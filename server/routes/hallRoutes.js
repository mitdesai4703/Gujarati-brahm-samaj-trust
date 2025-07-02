import express from "express";
import userAuth from "../middleware/userAuth.js";
import HallModel from "../models/Hall.js";

const router = express.Router();


router.post("/create", userAuth, async (req, res) => {
  try {
    const hallData = {
      ...req.body,
      owner: req.user.id,
    };
    await HallModel.create(hallData);
    return res.status(201).json({ message: "Hall created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/update/:id", userAuth, async (req, res) => {
  try {
    await HallModel.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({ message: "Hall updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


router.delete("/delete/:id", userAuth, async (req, res) => {
  try {
    await HallModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Hall deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


router.get("/get-all", async (req, res) => {
  try {
    const halls = await HallModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ halls });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


router.get("/get/:id", async (req, res) => {
  try {
    const hall = await HallModel.findById(req.params.id);
    if (!hall) return res.status(404).json({ message: "Hall not found" });
    return res.status(200).json(hall);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
