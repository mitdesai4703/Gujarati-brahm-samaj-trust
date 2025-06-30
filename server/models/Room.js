import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: String, 
      ref:"Hotel",
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    amenities: {
      type: Array,
      required:true,
    },
    images: {
      type: [String], 
      
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const roomModel = mongoose.model("Room", roomSchema);

export default roomModel;
