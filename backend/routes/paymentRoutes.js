import express from "express";
const router = express.Router();
import { createPaymentIntent } from "../controllers/paymentController.js";
import { auth } from "../middleware/authMiddleware.js";

router.post("/create-payment-intent", auth, createPaymentIntent);

export default router;
