// routes/orderRoutes.js
import express from "express";
const router = express.Router();
import { addOrderItems, getMyOrders } from "../controllers/orderController.js";
import { auth, admin } from "../middleware/authMiddleware.js"; // Only need 'auth' for these routes

router.post("/", auth, addOrderItems);
router.get("/myorders", auth, getMyOrders);
router.get("/", auth, admin, getAllOrders); //admin
router.get("/:id", auth, admin, getOrderById); //admin
export default router;
