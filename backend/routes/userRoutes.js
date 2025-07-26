import express from "express";
import { auth, admin } from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile);
router.route("/").get(auth, admin, getAllUsers); //admin getallusers
router
  .route("/:id") // This route will handle GET, PUT, DELETE for a specific user by ID (admin)
  .get(auth, admin, getUserById)
  .put(auth, admin, updateUser)
  .delete(auth, admin, deleteUser);

export default router;
