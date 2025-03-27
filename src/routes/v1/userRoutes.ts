// src/routes/auth.ts
import express from "express";
import { authController } from "../../controllers/auth.controller";

const router = express.Router();

router.post("/register", authController.createUser.bind(authController));
router.post("/login", authController.loginUser.bind(authController));

export default router;
