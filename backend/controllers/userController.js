import User from "../model/user.js";
import bcrypt from "bcryptjs";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findbyId(req.user.id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;

      //only update password if provided
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        const updatedUser = await user.save();
        res.json({
          _id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin, //token wont be reissued
        });
      } else {
        res.status(400).json({ message: "user not found" });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password"); // Exclude passwords
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid User ID" });
    }
    res.status(500).send("Server Error");
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.isAdmin =
        req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin; // Allow setting isAdmin

      // Do NOT allow updating password directly via this admin route (use specific profile route or reset if needed)
      // If you want to allow admin to change password, you'd add similar bcrypt logic as in updateUserProfile

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid User ID" });
    }
    res.status(500).send("Server Error");
  }
};

// @route   DELETE /api/users/:id
// @desc    Delete user by ID (Admin Only)
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // Prevent admin from deleting themselves
      if (user._id.toString() === req.user.id.toString()) {
        return res.status(400).json({ message: "Cannot delete yourself" });
      }
      await user.deleteOne(); // Use deleteOne() for Mongoose 6+
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid User ID" });
    }
    res.status(500).send("Server Error");
  }
};
