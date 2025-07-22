// routes/orderRoutes.js
import express from "express";
const router = express.Router();
import { addOrderItems, getMyOrders } from "../controllers/orderController.js";
import { auth } from "../middleware/authMiddleware.js"; // Only need 'auth' for these routes

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post("/", auth, addOrderItems);

// @route   GET /api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.get("/myorders", auth, getMyOrders);

export default router;
