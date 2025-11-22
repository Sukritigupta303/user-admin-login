// src/controllers/userController.js
const User = require("../models/user");

// GET Users → For dropdown etc.
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id name");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// UPDATE User → For Settings Page
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password; // 👈 Agar password hash karna ho to yaha middleware laga sakte hain

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true } // Return updated data
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: { _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new password required" });
    }
    if (newPassword.length < 6) return res.status(400).json({ message: "New password too short (min 6)" });

    const user = await User.findById(userId).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: "Current password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("updatePassword error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
