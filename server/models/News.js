import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String },
  summary: { type: String },
  content: { type: String },
}, { timestamps: true });

export default mongoose.model("News", newsSchema);