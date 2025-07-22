import express from "express";
import {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../controllers/productController.js";
import { auth, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

//public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

//admin only
router.post("/", auth, admin, createProduct);
router.put("/:id", auth, admin, updateProduct);
router.delete("/:id", auth, admin, deleteProduct);

export default router;
