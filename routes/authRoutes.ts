import express from "express";
import { register, login } from "../config/controllers/authController";

const router = express.Router();

// Define routes for authentication
router.post("/register", register);
router.post("/login", login);

export default router;
