import express from "express";
import { checkLogin, login, signUp } from "../controllers/authController.js";
import { jwtAuthGuard } from "../middlewares/jwtAuthGuard.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/checkLogin", jwtAuthGuard, checkLogin);

export default router;
