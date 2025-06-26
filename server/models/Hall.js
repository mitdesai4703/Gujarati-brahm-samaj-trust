import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    perks: {
      type: [String],
      required: false,
    },
    extraInfo: {
      type: String,
      required: false,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    maxGuests: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
      required: true,
    },
  },
  { timestamps: true }
);

const PlaceModel = mongoose.model("Hall", hallSchema);

export default HallModel;
