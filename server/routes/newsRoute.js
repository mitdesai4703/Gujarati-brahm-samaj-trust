import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";
import News from "../models/News.js";
import connectCloudinary from "../config/cloudinary.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


connectCloudinary();


const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "news" },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};


router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { title, date, summary, content } = req.body;
    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required." });
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    const news = new News({ title, date, summary, content, image: imageUrl });
    await news.save();

    res.status(201).json({ message: "News created successfully", news });
  } catch (err) {
    res.status(500).json({ message: "Failed to create news", error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch news", error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch news", error: err.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, date, summary, content } = req.body;

    let updateData = { title, date, summary, content };

    if (req.file) {
      const imageUrl = await uploadToCloudinary(req.file.buffer);
      updateData.image = imageUrl;
    }

    const updatedNews = await News.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json({ message: "News updated", news: updatedNews });
  } catch (err) {
    res.status(500).json({ message: "Failed to update news", error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) return res.status(404).json({ message: "News not found" });

    res.status(200).json({ message: "News deleted", news: deletedNews });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete news", error: err.message });
  }
});

export default router;
