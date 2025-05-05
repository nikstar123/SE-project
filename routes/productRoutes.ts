import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  authenticate,
} from "../config/controllers/productController";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authenticate, createProduct);

export default router;
