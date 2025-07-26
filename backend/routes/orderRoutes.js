// routes/orderRoutes.js
import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { auth, admin } from "../middleware/authMiddleware.js"; // Only need 'auth' for these routes

router.post("/", auth, addOrderItems);
router.get("/myorders", auth, getMyOrders);
router.get("/", auth, admin, getAllOrders); //admin
router.get("/:id", auth, admin, getOrderById); //admin
router.put("/:id/pay", auth, admin, updateOrderToPaid); //Admin mark order as paid //admin
router.put("/:id/deliver", auth, admin, updateOrderToDelivered); //Admin mark order as paid

export default router;
