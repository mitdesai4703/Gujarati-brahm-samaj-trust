import express from "express";
import HallModel from "../models/Hall.js"; 
import userAuth from "../middleware/userAuth.js"; 

const router = express.Router();


router.post("/create", userAuth, async (req, res) => {
  try {
    await PlaceModel.create(req.body);
    return res.status(201).json({ message: "Hall created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


router.put("/update/:id", userAuth, async (req, res) => {
  try {
    await PlaceModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({ message: "Hall updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


router.delete("/delete/:id", userAuth, async (req, res) => {
  try {
    await PlaceModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Hall deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


router.get("/get-all", userAuth, async (req, res) => {
  try {
    const places = await PlaceModel.find().sort({ createdAt: -1 });
    return res.status(200).json(places);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


router.get("/get/:id", userAuth, async (req, res) => {
  try {
    const place = await PlaceModel.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Hall not found" });
    return res.status(200).json(place);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
