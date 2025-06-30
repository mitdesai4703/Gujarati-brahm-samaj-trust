import mongoose from "mongoose";

const hallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  owner: { type: String, required: true, ref: "User" },
  city: { type: String, required: true },
}, { timestamps: true });

const hallModel = mongoose.model("Hall", hallSchema);

export default hallModel;
