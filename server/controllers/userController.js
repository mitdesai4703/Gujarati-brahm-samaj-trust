import bcrypt from "bcryptjs";
import userModel from "../models/User.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
        role: user.role,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // <- fixed
    const { name, email, password } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id; // <- fixed
    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User account deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getUserByEmailOrId = async (req, res) => {
  try {
    const { email, userId } = req.query;

    if (!email && !userId) {
      return res.status(400).json({ message: "Email or User ID is required" });
    }

    const user = await userModel.findOne(email ? { email } : { _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ userId: user._id, email: user.email, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
