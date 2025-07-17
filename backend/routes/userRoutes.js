import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../model/user.js";
const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  try {
    // Fetch the user from the database using the ID from the token
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
