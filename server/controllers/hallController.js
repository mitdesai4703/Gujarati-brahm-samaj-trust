import hallModel from "../models/Hall.js";
import userModel from "../models/User.js";

export const registerHall = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    const existingHall = await hallModel.findOne({ owner });

    if (existingHall) {
      return res.json({ success: false, message: "Hall already registered" });
    }

    const newHall = await hallModel.create({
      name,
      address,
      contact,
      city,
      owner,
    });

    await userModel.findByIdAndUpdate(owner, { role: "admin" });

    return res.json({
      success: true,
      message: "Hall registered successfully",
      hall: newHall,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
