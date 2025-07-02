import mongoose from "mongoose";

const ladiesEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    time: String,
    location: String,
  },
  { timestamps: true }
);

export default mongoose.model("LadiesEvent", ladiesEventSchema);
