import express from "express";
import {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../controllers/productController.js";
import { auth, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();

//public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

//admin only
router.post("/", auth, admin, createProduct);
router.put("/:id", auth, admin, updateProduct);
router.delete("/:id", auth, admin, deleteProduct);

//@route  POST /api/products/upload
// @desc  Upload product image
// @access Private/Admin
router.post(
  "/upload",
  auth,
  admin,
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // req.file.path contains the full path to the uploaded file on the server
    // For the frontend, you typically send back a URL
    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: `/uploads/${req.file.filename}`, // Example URL for local static serving
    });
  },
  (error, req, res, next) => {
    // Multer error handling middleware
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ message: error.message });
    } else if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  }
);

export default router;
